import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log("Sending email");
    const { to, subject, text } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "isa.atucd@gmail.com",
        pass: process.env.EMAIL_PASS || "gipe mfcs buhs vjmg"
      },
    });

    // Verify connection configuration
    await transporter.verify();

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "isa.atucd@gmail.com",
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email error:", err);
    
    // Check for specific authentication errors
    if (err.code === 'EAUTH') {
      return NextResponse.json({ 
        success: false, 
        error: "Authentication failed. Please check email credentials or use App Password." 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Failed to send email" 
    }, { status: 500 });
  }
}