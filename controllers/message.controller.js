const db = require("../models");
const emailController = require("./email.controller");
const emailTemplate = require("./EmailTemplates/");
const User = db.User;
const Driver = db.Driver;
const Conversation = db.Conversation;
const Message = db.Message;
const MessageStatus = db.MessageStatus;
const Op = db.Sequelize.Op;
const { convert } = require("html-to-text");
require("dotenv").config;

const { v4: uuidv4 } = require("uuid");

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getAllUserMessages(req, res) {
    return Conversation.findAll({
      where: {
        [Op.or]: [
          // Look for one of the combinaison for driver/user
          { DriverId: req.query.userId },
          { UserId: req.query.userId },
        ],
      },
      order: [[Message, "createdAt", "ASC"]],
      include: [
        {
          model: Message,
          include: [
            {
              model: MessageStatus,
            },
          ],
        },
        {
          model: Driver,
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  "email",
                  "biography",
                  "password",
                  "phoneNumber",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: [
              "email",
              "biography",
              "password",
              "phoneNumber",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    })
      .then((conversations) => {
        // console.log(conversations);
        res.status(200).json(conversations);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json({
          errorMessage,
          errorCode: 1,
        });
      });
  },

  startConversation(req, res) {
    const { driverId, userId, rideId } = req.body;

    return Conversation.findOne({
      where: {
        [Op.or]: [
          // Look for one of the combinaison for driver/user
          { [Op.and]: [{ DriverId: driverId }, { UserId: userId }] },
          { [Op.and]: [{ DriverId: userId }, { UserId: driverId }] },
        ],
      },
    })
      .then((conversation) => {
        // Conversation found
        if (conversation) {
          res
            .status(200)
            .json({ conversationId: conversation.id, uuid: conversation.UUID });
        } else {
          // Conversation not found
          const uuid = uuidv4();

          Conversation.create({
            DriverId: driverId,
            UserId: userId,
            RideId: rideId,
            UUID: uuid,
          })
            .then((conversation) => {
              res.status(201).json({ conversationId: conversation.id, uuid });
            })
            .catch((error) => {
              // console.log(error);
              res.status(400).json({
                errorMessage,
                errorCode: 3,
              });
            });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json({
          errorMessage,
          errorCode: 1,
        });
      });
  },

  sendMessage(req, res) {
    const { senderId, receiverId, message, conversationId } = req.body;

    if (message.length === 0) {
      res.status(400).json({
        message: "Your message cannot be empty",
      });
    } else {
      messageConverted = convert(message);

      return Message.create({
        SenderId: senderId,
        ReceiverId: receiverId,
        body: messageConverted,
        ConversationId: conversationId,
        MessageStatusId: 1,
      })
        .then((response) => {
          // console.log(response);
          res.status(201).json({ message: "Message sent" });

          // Find the receiver of the message
          return User.findOne({
            where: {
              id: receiverId,
            },
          })
            .then((user) => {
              emailController.sendEmail(user, emailTemplate.newMessage());
            })
            .catch((error) => {
              // Couldn't find user
              // console.log(error);
              res.status(400).json(errorMessage);
            });
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json(errorMessage);
        });
    }
  },

  getUserNewMessages(req, res) {
    return Message.findAndCountAll({
      where: {
        ReceiverId: req.query.userId,
        MessageStatusId: 1,
      },
    })
      .then((response) => {
        // console.log(response);
        res.status(201).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json(errorMessage);
      });
  },

  setMessagesSeen(req, res) {
    return Message.update(
      {
        MessageStatusId: 3,
      },
      {
        where: {
          ReceiverId: req.body.viewerId,
          ConversationId: req.body.conversationId,
        },
      }
    )
      .then((response) => {
        // console.log(response);
        return res.status(200).send({ message: "Success" });
      })
      .catch((error) => {
        // console.log(error);
        return res.status(400).send({ message: "Fail", errorCode: 1 });
      });
  },
};
