import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const {
      fullname,
      phone,
      email,
      company,
      industry,
      service,
      message,
    } = req.body;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,

      subject: `Yêu cầu tư vấn mới - ${fullname}`,

      html: `
        <h2>📩 YÊU CẦU TƯ VẤN MỚI</h2>

        <p><strong>Họ và tên:</strong> ${fullname}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Công ty:</strong> ${company || "Không cung cấp"}</p>
        <p><strong>Ngành hàng:</strong> ${industry}</p>
        <p><strong>Nhu cầu dịch vụ:</strong> ${service}</p>

        <hr>

        <p><strong>Nội dung cần tư vấn:</strong></p>
        <p>${message || "Không có nội dung"}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Gửi yêu cầu thành công!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Không thể gửi yêu cầu. Vui lòng thử lại.",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});