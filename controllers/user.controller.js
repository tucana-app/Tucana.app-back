const db = require("../models");
const config = require("../config/user.config");
const emailController = require("./email.controller");
const emailTemplates = require("./EmailTemplates");
const validator = require("validator");
const User = db.User;
const Driver = db.Driver;
const Rating = db.Rating;
const Car = db.Car;
const DriverApplication = db.DriverApplication;
const Op = db.Sequelize.Op;
const ConfirmEmail = db.ConfirmEmail;
const ForgotPassword = db.ForgotPassword;
const admin_VerifDriverApplication = db.admin_VerifDriverApplication;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");

module.exports = {
  signup(req, res) {
    const { firstName, lastName, email, phoneNumber, username, password } =
      req.body.values;

    return User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      username: username.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
    })
      .then((user) => {
        return ConfirmEmail.create({
          UserId: user.id,
          UUID: uuidv4(),
        })
          .then((confirmEmailLine) => {
            res.status(201).send({ message: "Sign up successful" });

            emailController.sendEmail(
              user,
              emailTemplates.confirmSignup(confirmEmailLine.UUID)
            );

            return Rating.create({
              UserId: user.id,
            })
              .then((response) => {
                // console.log(response)
              })
              .catch((error) => {
                // console.log(error);
              });
          })
          .catch((error) => {
            // console.log(error);
            res.status(400).send({ message: "An error occured" });
          });
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send({ message: error.message });
      });
  },

  confirmEmail(req, res) {
    const { uuid } = req.body;

    // Check if the UUID provided over the put call is valid
    if (validator.isUUID(uuid)) {
      // Check first if the email has already been confirmed
      return ConfirmEmail.findOne({
        where: {
          UUID: uuid,
        },
      })
        .then((confirmation) => {
          if (confirmation) {
            return User.findOne({
              where: {
                id: confirmation.UserId,
              },
            })
              .then((user) => {
                if (!user.emailConfirmed) {
                  // Email not confirmed yet
                  return User.update(
                    {
                      emailConfirmed: true,
                    },
                    {
                      where: {
                        id: confirmation.UserId,
                      },
                    }
                  )
                    .then((response) => {
                      res.status(200).json({
                        flag: "CONFIRMED_SUCCESS",
                        message: "You're email address has been confirmed",
                      });

                      emailController.sendEmail(
                        user,
                        emailTemplates.signupConfirmed(user)
                      );

                      return ConfirmEmail.destroy({
                        where: {
                          UserId: confirmation.UserId,
                        },
                      })
                        .then((response) => {
                          // console.log(response)
                        })
                        .catch((error) => {
                          res.status(400).json({
                            flag: "FAIL_FIND_UUID",
                            message: "We couldn't confirm your email address",
                          });
                        });
                    })
                    .catch((error) => {
                      // console.log(error);
                      res.status(400).json({
                        flag: "FAIL_UPDATE_CONFIRM",
                        message: "We couldn't confirm your email address",
                      });
                    });
                } else {
                  // Email has already been confirmed
                  res.status(200).json({
                    flag: "ALREADY_CONFIRMED",
                    message: "Your email address has already been confirmed",
                  });
                }
              })
              .catch((error) => {
                // console.log(error);
                res.status(400).json({
                  flag: "FAIL_FIND_UUID",
                  message: "We couldn't confirm your email address",
                });
              });
          } else {
            res
              .status(400)
              .json({ message: "This confirmation link is deprecated" });
          }
        })
        .catch((error) => {
          // console.log(error);
          res.status(400).json({
            flag: "ERROR_DB",
            message: "There is a problem with the database",
          });
        });
    } else {
      res.status(401).json({
        flag: "UNAUTHORIZED",
        message: "How did you do this API call?",
      });
    }
  },

  signin(req, res) {
    const { credential, password } = req.body.formLogin;

    return User.findOne({
      where: {
        [Op.or]: {
          username: credential,
          username: credential.toLowerCase(),
          email: credential,
          email: credential.toLowerCase(),
        },
      },
      include: [
        {
          model: Driver,
          attributes: {
            exclude: ["UserId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Car,
            },
          ],
        },
        {
          model: Rating,
        },
      ],
    })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .send({ message: "User not found", flag: "USER_NOT_FOUND" });
        } else {
          var passwordIsValid = bcrypt.compareSync(password, user.password);

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password",
              flag: "INVALID_PASSWORD",
            });
          }

          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 604800, // 7 days
          });

          if (user.emailConfirmed) {
            res.status(200).send({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              email: user.email,
              biography: user.biography,
              phoneNumber: user.phoneNumber,
              createdAt: user.createdAt,
              emailConfirmed: user.emailConfirmed,
              phoneConfirmed: user.phoneConfirmed,
              Driver: user.Driver,
              Rating: user.Rating,
              accessToken: token,
            });
          } else {
            // User hasn't confirmed the email yet
            res.status(403).json({
              message: "Email not confirmed yet",
              flag: "NOT_CONFIRMED",
              userId: user.id,
            });
          }
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          message: "It looks like we can't log you in right now",
          flag: "GENERAL_ERROR",
        });
      });
  },

  sendForgotPasswordEmail(req, res) {
    return User.findOne({
      where: {
        [Op.or]: {
          email: req.query.email,
          email: req.query.email.toLowerCase(),
        },
      },
    })
      .then((user) => {
        if (!user) {
          // Email not found
          return res.status(200).json({
            message:
              "If your email address exists, please verify your inbox for a password reset link email",
          });
        } else {
          // Email found
          return ForgotPassword.findOne({
            where: {
              UserId: user.id,
            },
          })
            .then((line) => {
              // If a past attempt has been found
              if (line) {
                // If user tried 4 times to send the password reset link
                if (line.attempts >= 4) {
                  res.status(400).send({
                    message: `You attempted ${line.attempts} times to send the password reset link. Please contact us to reset your password`,
                  });
                } else {
                  return ForgotPassword.update(
                    {
                      attempts: line.attempts + 1,
                    },
                    {
                      where: {
                        UserId: user.id,
                      },
                    }
                  )
                    .then((response) => {
                      res.status(200).send({
                        message:
                          "If your email address exists, please verify your inbox for a password reset link email",
                      });

                      emailController.sendEmail(
                        user,
                        emailTemplates.forgotPassword(line.UUID)
                      );
                    })
                    .catch((error) => {
                      // console.log(error);
                      res.status(400).json({
                        message: "There is an error with this request",
                        flag: "DB_ERROR",
                      });
                    });
                }
                // If no past attempts has been found
              } else {
                return ForgotPassword.create({
                  UserId: user.id,
                  UUID: uuidv4(),
                })
                  .then((newLine) => {
                    res.status(201).send({
                      message:
                        "If your email address exists, please verify your inbox for a password reset link email",
                    });

                    emailController.sendEmail(
                      user,
                      emailTemplates.forgotPassword(newLine.UUID)
                    );
                  })
                  .catch((error) => {
                    // console.log(error);
                    res.status(400).json({
                      message: "There is an error with this request",
                      flag: "DB_ERROR",
                    });
                  });
              }
            })
            .catch((error) => {
              res.status(400).send({ message: "There is an error" });
            });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          message: "There is an error with your request",
          flag: "GENERAL_ERROR",
        });
      });
  },

  checkDeprecatedLinkResetPassword(req, res) {
    const { uuid } = req.query;

    return ForgotPassword.findOne({
      where: {
        UUID: uuid,
      },
    })
      .then((line) => {
        if (line) {
          res.status(200).json({ message: "UUID found", flag: "SUCCESS" });
        } else {
          res.status(404).json({ message: "UUID not found", flag: "FAIL" });
        }
      })
      .catch((error) => {
        res.status(400).json({ message: "UUID not found", flag: "FAIL" });
      });
  },

  resetPassword(req, res) {
    const { password, uuid } = req.body;

    // Check if the UUID provided is valid
    if (validator.isUUID(uuid)) {
      // Find if the UUID exists in the ForgotPassword model
      return ForgotPassword.findOne({
        where: {
          UUID: uuid,
        },
      })
        .then((line) => {
          if (line) {
            return User.update(
              {
                password: bcrypt.hashSync(password, 10),
              },
              {
                where: {
                  id: line.UserId,
                },
              }
            )
              .then((response) => {
                return ForgotPassword.destroy({
                  where: {
                    UUID: uuid,
                  },
                })
                  .then((response) => {
                    return User.findOne({
                      where: {
                        id: line.UserId,
                      },
                    })
                      .then((user) => {
                        res.status(200).send({
                          message: "Your password has been successfully reset",
                          flag: "RESET_PASSWORD_SUCCESS",
                        });

                        emailController.sendEmail(
                          user,
                          emailTemplates.resetPasswordSuccess(user)
                        );
                      })
                      .catch((error) => {
                        // console.log(error);
                        res.status(400).json({
                          message: "There is an error with this request",
                          flag: "DB_ERROR",
                        });
                      });
                  })
                  .catch((error) => {
                    // console.log(error);
                    res.status(400).json({
                      message: "There is an error with this request",
                      flag: "DB_ERROR",
                    });
                  });
              })
              .catch((error) => {
                // console.log(error);
                res.status(400).json({
                  message: "There is an error with this request",
                  flag: "DB_ERROR",
                });
              });
          } else {
            res.status(400).json({ message: "This link is deprecated" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "There is an error with your request" });
        });
    } else {
      res.status(401).json({
        flag: "UNAUTHORIZED",
        message: "How did you do this API call?",
      });
    }
  },

  resendConfirmationLink(req, res) {
    const { userId } = req.body;

    return User.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        if (user) {
          return ConfirmEmail.findOne({
            where: {
              UserId: user.id,
            },
          })
            .then((confirmation) => {
              if (!confirmation) {
                res.status(404).send({
                  message: "We couldn't send the confirmation link",
                  flag: "NO_CONFIRMATION",
                });
              } else {
                res.status(200).send({
                  message:
                    "We have resent you the confirmation link over email",
                  flag: "SUCCESS",
                });

                emailController.sendEmail(
                  user,
                  emailTemplates.confirmSignup(confirmation.UUID)
                );
              }
            })
            .catch((error) => {
              res.status(404).send({
                message: "We couldn't send the confirmation link",
                flag: "ERROR_DB",
              });
            });
        } else {
          res.status(404).send({
            message: "We couldn't send the confirmation link",
            flag: "USER_NOT_FOUND",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          message: "We couldn't send the confirmation link",
          flag: "GENERAL_ERROR",
        });
      });
  },

  getApplicationsBecomeDriver(req, res) {
    const { userId } = req.query;

    return DriverApplication.findAll({
      where: {
        UserId: userId,
      },
      order: [["id", "ASC"]],
      include: [
        {
          model: admin_VerifDriverApplication,
        },
      ],
    })
      .then((applications) => {
        // console.log(applications);
        res.status(200).json(applications);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ flag: "GENERAL_ERROR" });
      });
  },

  submitBecomeDriver(req, res) {
    const { user, form } = req.body;

    return DriverApplication.create({
      UserId: user.id,
      idType: form.id.type,
      idNumber: form.id.number,
      idCountry: form.id.country.value.name.common,
      licenseNumber: form.license.number,
      licenseCountry: form.license.country.value.name.common,
      carMaker: form.car.maker.value,
      carModel: form.car.model,
      numberPlate: form.car.numberPlate,
    })
      .then((application) => {
        // console.log(application);
        res.status(200).send({});

        emailController.sendEmailToAdmin(
          emailTemplates.admin_newFormBecomeDriver()
        );
      })
      .catch((error) => {
        // console.log(error);

        res.status(400).json({
          flag: "GENERAL_ERROR",
        });
      });
  },

  updateDriverState(req, res) {
    const { userId } = req.query;

    return Driver.findOne({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Car,
        },
      ],
    })
      .then((driver) => {
        if (driver) {
          res.status(200).send(driver);
        } else {
          res.status(200).send(null);
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json({
          message: "A problem occured",
          flag: "GENERAL_ERROR",
        });
      });
  },

  submitContactForm(req, res) {
    const { user, values } = req.body;
    var userInfo = {};
    var companyInfo = {};

    if (!user) {
      userInfo = {
        id: 0,
        firstName: values.fullname,
        lastName: "",
        email: values.email,
      };
    } else {
      userInfo = user;
    }

    companyInfo = {
      firstName: "Tucána",
      lastName: "App",
      email: process.env.SUPPORT_EMAIL,
    };

    emailController.sendEmail(
      companyInfo,
      emailTemplates.contactToCompany(userInfo, values)
    );

    emailController.sendEmail(userInfo, emailTemplates.contactToUser(values));

    return res.status(200).json({});
  },
};
