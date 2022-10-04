const { authJwt } = require("../middleware");
const controller = require("../controllers").message;

module.exports = (app) => {
  app.get(
    "/api/message/all-user-messages",
    [authJwt.verifyToken],
    controller.getAllUserMessages
  );

  app.post(
    "/api/message/start-conversation",
    [authJwt.verifyToken],
    controller.startConversation
  );

  app.post(
    "/api/message/send-message",
    [authJwt.verifyToken],
    controller.sendMessage
  );

  app.get(
    "/api/message/user-new-messages",
    [authJwt.verifyToken],
    controller.getUserNewMessages
  );

  app.put(
    "/api/message/set-messages-seen",
    [authJwt.verifyToken],
    controller.setMessagesSeen
  );
};
