import fetch from "node-fetch";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const API_URL = process.env.API_URL;

async function run() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const body = `
Daily Exchange Rates:

${JSON.stringify(data, null, 2)}
    `;

    const result = await resend.emails.send({
      from: "Exchange Bot <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      subject: "Daily Exchange Rates",
      text: body,
    });

    console.log("Resend response:", result);
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

run();
