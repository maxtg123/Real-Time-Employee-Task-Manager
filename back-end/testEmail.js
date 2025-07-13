const { sendEmail } = require("./services/mailService");
require("dotenv").config();

(async () => {
  await sendEmail(
    "caophong1234aa@gmail.com",             
    "Welcome to Task Manager",
    "This is a test email from your backend!"
  );
})();
