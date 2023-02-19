require("dotenv").config;
const emailHtmlTemplate = require("./emailHtmlTemplate");

module.exports = function resetPasswordSuccess(user) {
  const subject = "Contraseña restablecida - Password reset";

  const text = `Tucána | 
  Has restablecido correctamente tu contraseña. Ya puedes iniciar sesión. 
  You have successfully reset your password. You can now login.`;

  const html = emailHtmlTemplate({
    titleEN: `Password reset successfully`,
    textEN: `<p>You have successfully reset your password. You can now login.</p>`,
    titleES: `Contraseña restablecida correctamente`,
    textES: `<p>Has restablecido correctamente tu contraseña. Ya puedes iniciar sesión.</p>.`,
  });

  return { subject, text, html };
};
