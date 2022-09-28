const db = require("../../models");

const ExperienceUser = db.ExperienceUser;
const ExperienceUserLevel = db.ExperienceUserLevel;

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
      const newPoints =
        experienceUser.points +
        points * experienceUser.ExperienceUserLevel.rate;

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
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
