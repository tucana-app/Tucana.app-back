const controller = require("../controllers").message;

module.exports = (app) => {
  app.get("/api/message/all-user-messages", controller.getAllUserMessages);

  app.post("/api/message/start-conversation", controller.startConversation);

  app.post("/api/message/send-message", controller.sendMessage);

  app.get("/api/message/user-new-messages", controller.getUserNewMessages);

  app.put("/api/message/set-messages-seen", controller.setMessagesSeen);
};
