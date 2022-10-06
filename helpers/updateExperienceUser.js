const path = require("path");
const fileName = path.basename(__filename);

const db = require("../models");

const ExperienceUser = db.ExperienceUser;
const ExperienceUserLevel = db.ExperienceUserLevel;

const consoleError = (file, fn, stack, error) => {
  return console.log(
    `\n\n #########\n\nERROR\n\n${file} - ${fn}()\n\nStack:\n${stack}\n\n${error}\n\n#########`
  );
};

module.exports = function updateExperienceUser(userId, points) {
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
    .then((experienceUser) => {
      const newPoints = Math.round(
        experienceUser.points +
          points * experienceUser.ExperienceUserLevel.multiplier
      );

      return ExperienceUser.update(
        {
          points: newPoints,
        },
        {
          where: {
            UserId: userId,
          },
        }
      )
        .then((response) => {
          // console.log(response);

          if (newPoints > experienceUser.ExperienceUserLevel.max) {
            return ExperienceUser.update(
              {
                ExperienceUserLevelId: experienceUser.ExperienceUserLevelId + 1,
              },
              {
                where: {
                  UserId: userId,
                },
              }
            )
              .then((response) => {
                // console.log(response);
              })
              .catch((error) => {
                consoleError(
                  fileName,
                  arguments.callee.name,
                  Error().stack,
                  error
                );
              });
          }
        })
        .catch((error) => {
          consoleError(fileName, arguments.callee.name, Error().stack, error);
        });
    })
    .catch((error) => {
      consoleError(fileName, arguments.callee.name, Error().stack, error);
    });
};
