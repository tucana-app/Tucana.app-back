const path = require("path");
const fileName = path.basename(__filename);

const db = require("../models");
const config = require("../config/user.config");
const emailController = require("./email.controller");
const emailTemplates = require("./EmailTemplates");
const validator = require("validator");
const {
  updateExperienceUser,
  pointsGrid,
  consoleError,
} = require("../helpers");

const User = db.User;
const Driver = db.Driver;
const Rating = db.Rating;
const Ride = db.Ride;
const Booking = db.Booking;
const Car = db.Car;
const DriverApplication = db.DriverApplication;
const ExperienceUser = db.ExperienceUser;
const ExperienceUserLevel = db.ExperienceUserLevel;
const Op = db.Sequelize.Op;
const ConfirmEmail = db.ConfirmEmail;
const ForgotPassword = db.ForgotPassword;
const admin_VerifDriverApplication = db.admin_VerifDriverApplication;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");
const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  signup(req, res) {
    const { firstName, lastName, email, phoneNumber, username, password } =
      req.body.values;

    return User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      username: username.toLowerCase().replace(" ", ""),
      password: bcrypt.hashSync(password, 10),
    })
      .then((user) => {
        return ConfirmEmail.create({
          id: user.id,
          UserId: user.id,
          UUID: uuidv4(),
        })
          .then((confirmEmailLine) => {
            return Rating.create({
              id: user.id,
              UserId: user.id,
            })
              .then((response) => {
                // console.log(response)
                return ExperienceUser.create({
                  id: user.id,
                  UserId: user.id,
                })
                  .then((response) => {
                    // console.log(response)
                    res.status(201).send({ message: "Sign up successful" });

                    emailController.sendEmail(
                      user,
                      emailTemplates.confirmSignup(confirmEmailLine.UUID)
                    );

                    emailController.sendEmailToAdmin(
                      emailTemplates.admin_newUser()
                    );
                  })
                  .catch((error) => {
                    consoleError(
                      fileName,
                      arguments.callee.name,
                      Error().stack,
                      error
                    );
                    res
                      .status(400)
                      .send({ message: "An error occured (Experience)" });
                  });
              })
              .catch((error) => {
                consoleError(
                  fileName,
                  arguments.callee.name,
                  Error().stack,
                  error
                );
                res.status(400).send({ message: "An error occured (Ratings)" });
              });
          })
          .catch((error) => {
            consoleError(fileName, arguments.callee.name, Error().stack, error);
            res.status(400).send({ message: "An error occured" });
          });
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
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
                      consoleError(
                        fileName,
                        arguments.callee.name,
                        Error().stack,
                        error
                      );
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
                consoleError(
                  fileName,
                  arguments.callee.name,
                  Error().stack,
                  error
                );
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
          consoleError(fileName, arguments.callee.name, Error().stack, error);
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
    let { credential, password } = req.body.formLogin;

    credential = credential.replace(" ", "");

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
        {
          model: ExperienceUser,
          include: [
            {
              model: ExperienceUserLevel,
            },
          ],
        },
      ],
    })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .send({ message: "User not found", flag: "USER_NOT_FOUND" });
        } else if (user.isClosed) {
          res.status(401).send({
            accessToken: null,
            message: "This account has been closed",
            flag: "ACCOUNT_CLOSED",
          });
        } else {
          var passwordIsValid = bcrypt.compareSync(password, user.password);

          if (!passwordIsValid) {
            res.status(401).send({
              accessToken: null,
              message: "Invalid Password",
              flag: "INVALID_PASSWORD",
            });
          } else {
            var token = jwt.sign({ userId: user.id }, config.secret, {
              expiresIn: 172800, // 2 days
            });

            if (user.emailConfirmed) {
              res.status(200).send({
                ...user.dataValues,
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
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(500).send({
          message: "We can't log you in right now",
          flag: "GENERAL_ERROR",
        });
      });
  },

  setUserAvatar(req, res) {
    const { user, avatar } = req.body;

    return User.update(
      {
        avatar,
      },
      {
        where: {
          id: user.id,
        },
      }
    )
      .then((response) => {
        res.status(200).send({ message: "OK", flag: "SUCCESS" });
      })
      .catch((error) => {
        res.status(400).json({ message: "NOK", flag: "FAIL" });
      });
  },

  setUserFirstSetup(req, res) {
    const { user } = req.body;

    return User.update(
      {
        firstSetUp: false,
      },
      {
        where: {
          id: user.id,
        },
      }
    )
      .then((response) => {
        res.status(200).send({ message: "OK", flag: "SUCCESS" });
      })
      .catch((error) => {
        res.status(400).json({ message: "NOK", flag: "FAIL" });
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
          res.status(200).json({
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
                      consoleError(
                        fileName,
                        arguments.callee.name,
                        Error().stack,
                        error
                      );
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
                    consoleError(
                      fileName,
                      arguments.callee.name,
                      Error().stack,
                      error
                    );
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
        consoleError(fileName, arguments.callee.name, Error().stack, error);
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
                        consoleError(
                          fileName,
                          arguments.callee.name,
                          Error().stack,
                          error
                        );
                        res.status(400).json({
                          message: "There is an error with this request",
                          flag: "DB_ERROR",
                        });
                      });
                  })
                  .catch((error) => {
                    consoleError(
                      fileName,
                      arguments.callee.name,
                      Error().stack,
                      error
                    );
                    res.status(400).json({
                      message: "There is an error with this request",
                      flag: "DB_ERROR",
                    });
                  });
              })
              .catch((error) => {
                consoleError(
                  fileName,
                  arguments.callee.name,
                  Error().stack,
                  error
                );
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

                consoleError(
                  fileName,
                  arguments.callee.name,
                  Error().stack,
                  error
                );

                emailController.sendEmailToAdmin(
                  emailTemplates.admin_errorFrontEnd(
                    arguments.callee.name +
                      " - We couldn't send the confirmation link",
                    Error().stack
                  )
                );
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

              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );

              emailController.sendEmailToAdmin(
                emailTemplates.admin_errorFrontEnd(
                  arguments.callee.name +
                    " - We couldn't send the confirmation link",
                  Error().stack
                )
              );
            });
        } else {
          res.status(404).send({
            message: "We couldn't send the confirmation link",
            flag: "USER_NOT_FOUND",
          });

          consoleError(fileName, arguments.callee.name, Error().stack, error);

          emailController.sendEmailToAdmin(
            emailTemplates.admin_errorFrontEnd(
              arguments.callee.name +
                " - We couldn't send the confirmation link",
              Error().stack
            )
          );
        }
      })
      .catch((error) => {
        res.status(400).json({
          message: "We couldn't send the confirmation link",
          flag: "GENERAL_ERROR",
        });

        consoleError(fileName, arguments.callee.name, Error().stack, error);

        emailController.sendEmailToAdmin(
          emailTemplates.admin_errorFrontEnd(
            arguments.callee.name + " - We couldn't send the confirmation link",
            Error().stack
          )
        );
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
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({ flag: "GENERAL_ERROR" });
      });
  },

  getApplicationBecomeDriver(req, res) {
    const { userId, applicationId } = req.query;

    return DriverApplication.findOne({
      where: {
        id: applicationId,
        UserId: userId,
      },
      order: [["id", "ASC"]],
      include: [
        {
          model: admin_VerifDriverApplication,
        },
      ],
    })
      .then((application) => {
        // console.log(application);
        if (application) {
          res.status(200).json(application);
        } else {
          res
            .status(400)
            .json({ message: "No application found", flag: "NOT_FOUND" });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({ flag: "GENERAL_ERROR" });
      });
  },

  submitBecomeDriver(req, res) {
    const { user, form } = req.body;

    const riteve = {
      month: form.car.riteve.month,
      year: form.car.riteve.year,
    };

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
      carYear: form.car.year,
      carColor: form.car.color,
      carMarchamo: form.car.marchamo,
      carRiteve: riteve,
    })
      .then((application) => {
        // console.log(application);
        res.status(200).send({});

        emailController.sendEmailToAdmin(
          emailTemplates.admin_newFormBecomeDriver()
        );
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);

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
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({
          message: "A problem occured",
          flag: "GENERAL_ERROR",
        });
      });
  },

  updateUserRatings(req, res) {
    const { userId } = req.query;

    return Rating.findOne({
      where: {
        UserId: userId,
      },
    })
      .then((rating) => {
        if (rating) {
          res.status(200).send(rating);
        } else {
          res.status(200).send(null);
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({
          message: "A problem occured",
          flag: "GENERAL_ERROR",
        });
      });
  },

  updateUserExperience(req, res) {
    const { userId } = req.query;

    return ExperienceUser.findOne({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: ExperienceUserLevel,
        },
      ],
    })
      .then((experience) => {
        if (experience) {
          res.status(200).send(experience);
        } else {
          res.status(200).send(null);
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({
          message: "A problem occured",
          flag: "GENERAL_ERROR",
        });
      });
  },

  updateUser(req, res) {
    const { userId } = req.query;

    return User.findOne({
      where: {
        id: userId,
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
        {
          model: ExperienceUser,
          include: [
            {
              model: ExperienceUserLevel,
            },
          ],
        },
      ],
    })
      .then((user) => {
        res.status(200).send({
          ...user.dataValues,
        });
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
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

  submitEditBio(req, res) {
    const { userId, values } = req.body;

    return User.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        if (user.biography === "" || user.biography === null) {
          updateExperienceUser(userId, pointsGrid.ADD_BIO);
        }

        return User.update(
          {
            biography: values.bio,
          },
          {
            where: {
              id: userId,
            },
          }
        )
          .then((response) => {
            if (user.biography || user.biography !== "") {
              updateExperienceUser(userId, pointsGrid.UPDATE_BIO);
            }

            res
              .status(200)
              .send({ message: "OK", flag: "SUCCESS", bio: values.bio });
          })
          .catch((error) => {
            consoleError(fileName, arguments.callee.name, Error().stack, error);
            res.status(400).json({ message: "NOK", flag: "FAIL" });
          });
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({ message: "NOK", flag: "FAIL" });
      });
  },

  submitEditPassword(req, res) {
    const { user, values } = req.body;

    return User.findOne({
      where: {
        id: user.id,
      },
    })
      .then((user) => {
        let passwordIsValid = bcrypt.compareSync(
          values.currentPassword,
          user.password
        );

        let isPasswordsSame = bcrypt.compareSync(
          values.password1,
          user.password
        );

        if (!passwordIsValid) {
          res.status(401).send({
            message: "Your current password is incorrect",
            flag: "INVALID_PASSWORD",
          });
        } else if (isPasswordsSame) {
          res.status(401).send({
            accessToken: null,
            message:
              "Your new password needs to be different than your current password",
            flag: "SAME_PASSWORD",
          });
        } else if (values.password1 !== values.password2) {
          res.status(401).send({
            accessToken: null,
            message: "The passwords must match",
            flag: "PASSWORD_MUST_MATCH",
          });
        } else {
          return User.update(
            {
              password: bcrypt.hashSync(values.password1, 10),
            },
            {
              where: {
                id: user.id,
              },
            }
          )
            .then((response) => {
              res.status(200).send({ message: "OK", flag: "SUCCESS" });

              emailController.sendEmail(user, emailTemplates.passwordUpdated());
            })
            .catch((error) => {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json({
                message: "Failed to update the password",
                flag: "FAIL_UPDATE",
              });
            });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({
          message: "There is an error with this request",
          flag: "DB_ERROR",
        });
      });
  },

  submitEditDateOfBirth(req, res) {
    const { userId, date } = req.body;

    return User.update(
      {
        dateOfBirth: date,
      },
      {
        where: {
          id: userId,
        },
      }
    )
      .then((response) => {
        updateExperienceUser(userId, pointsGrid.ADD_DATE_OF_BIRTH);
        res
          .status(200)
          .send({ message: "OK", flag: "SUCCESS", dateOfBirth: date });
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json({ message: "NOK", flag: "FAIL" });
      });
  },

  submitCloseAccount(req, res) {
    const { user, values } = req.body;

    return User.findOne({
      where: {
        id: user.id,
      },
    })
      .then((user) => {
        let passwordIsValid = bcrypt.compareSync(
          values.password,
          user.password
        );

        if (!passwordIsValid) {
          res.status(401).send({
            accessToken: null,
            message: "The password is incorrect",
            flag: "INVALID_PASSWORD",
          });
        } else {
          return User.update(
            {
              password: "-",
              isClosed: true,
              isClosedDate: new Date(),
            },
            {
              where: {
                id: user.id,
              },
            }
          )
            .then((response) => {
              res.status(200).send({ message: "OK", flag: "SUCCESS" });

              emailController.sendEmail(user, emailTemplates.accountClosed());
            })
            .catch((error) => {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json({
                message: "Failed to update the password",
                flag: "FAIL_UPDATE",
              });
            });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(500).json({
          message: "There is an error with this request",
          flag: "DB_ERROR",
        });
      });
  },

  isAccountClosed(req, res) {
    const { userId } = req.query;

    return User.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        res.status(200).send({ isClosed: user.isClosed });
      })
      .catch((error) => {
        res.status(400).json({ message: "NOK", flag: "FAIL" });
      });
  },

  getPublicProfile(req, res) {
    return User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: {
        exclude: [
          "password",
          "phoneNumber",
          "phoneConfirmed",
          "firstSetUp",
          "email",
          "emailConfirmed",
          "isClosed",
          "isClosedDate",
        ],
      },
      include: [
        {
          model: Rating,
        },
        {
          model: ExperienceUser,
          include: [
            {
              model: ExperienceUserLevel,
            },
          ],
        },
      ],
    })
      .then((user) => {
        // console.log(user);
        if (user) {
          res.status(200).json({ user });
        } else {
          res.status(404).json({
            message: "User not found",
            flag: "USER_NOT_FOUND",
          });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  getDriverProfile(req, res) {
    return User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: {
        exclude: [
          "password",
          "phoneNumber",
          "phoneConfirmed",
          "firstSetUp",
          "email",
          "emailConfirmed",
          "isClosed",
          "isClosedDate",
        ],
      },
      include: [
        {
          model: Driver,
        },
        {
          model: Rating,
        },
        {
          model: ExperienceUser,
          include: [
            {
              model: ExperienceUserLevel,
            },
          ],
        },
      ],
    })
      .then((user) => {
        // console.log(user);
        if (user && user.Driver) {
          return Ride.findAndCountAll({
            where: {
              DriverId: user.Driver.id,
            },
          })
            .then((rides) => {
              res.status(200).json({ user, ridesCount: rides.count });
            })
            .catch((error) => {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json(errorMessage);
            });
        } else {
          res.status(404).json({
            message: "User is not a driver",
            flag: "USER_NOT_DRIVER",
          });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },

  driverEarnings(req, res) {
    return User.findOne({
      where: {
        id: req.query.userId,
      },
      attributes: {
        exclude: [
          "password",
          "phoneNumber",
          "phoneConfirmed",
          "firstSetUp",
          "email",
          "emailConfirmed",
          "isClosed",
          "isClosedDate",
        ],
      },
      include: [
        {
          model: Driver,
        },
      ],
    })
      .then((user) => {
        // console.log(user);
        if (user) {
          return Booking.findAll({
            where: {
              DriverId: user.Driver.id,
              BookingStatusId: 3,
            },
          })
            .then((bookings) => {
              if (bookings.length) {
                let bookingsEarned = [];
                bookings.map((booking) => {
                  return Ride.findOne({
                    where: {
                      id: booking.RideId,
                      RideStatusId: 3,
                    },
                  })
                    .then((ride) => {
                      if (ride) {
                        bookingsEarned.push(booking);
                      }
                    })
                    .catch((error) => {
                      consoleError(
                        fileName,
                        arguments.callee.name,
                        Error().stack,
                        error
                      );
                      res.status(400).json(errorMessage);
                    });
                });
                res.status(200).json(bookingsEarned);
              } else {
                res.status(400).json({
                  message: "No bookings found for this driver",
                  flag: "DRIVER_NO_BOOKINGS",
                });
              }
            })
            .catch((error) => {
              consoleError(
                fileName,
                arguments.callee.name,
                Error().stack,
                error
              );
              res.status(400).json(errorMessage);
            });
        } else {
          res.status(404).json({
            message: "User not found",
            flag: "USER_NOT_FOUND",
          });
        }
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).json(errorMessage);
      });
  },
};
