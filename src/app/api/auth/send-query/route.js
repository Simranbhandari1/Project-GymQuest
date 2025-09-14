import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, userEmail, message } = await req.json();

    if (!name || !userEmail || !message) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    // Setup transporter with Gmail SMTP and app password
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // your gmail address
        pass: process.env.SMTP_PASS, // your gmail app password
      },
    });

    // Send mail to yourself with user name in sender display and replyTo user email
    await transporter.sendMail({
      from: `"GymQuest - ${name}" <${process.env.SMTP_USER}>`, // Your gmail with user name in display
      to: process.env.SMTP_USER,    // your gmail to receive emails
      replyTo: userEmail,           // replies go to user email
      subject: `New query from ${name}`,
      text: message,               // only user's message
      html: `<p>${message}</p>`,   // only user's message in html
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    );
  }
} 