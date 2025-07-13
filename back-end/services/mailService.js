const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**

 * @param {string} to - email người nhận
 * @param {string} subject - tiêu đề
 * @param {string} text - nội dung
 */
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(" Email sent to", to);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};

module.exports = { sendEmail };
