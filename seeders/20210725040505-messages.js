"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", [
      {
        id: 1,
        SenderId: 4,
        ReceiverId: 2,
        body: "Test",
        ConversationId: 1,
        MessageStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        SenderId: 2,
        ReceiverId: 3,
        body: "How are you?",
        ConversationId: 2,
        MessageStatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Messages", {
      id: {
        [Sequelize.Op.in]: [1, 2],
      },
    });
  },
};
