import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  email,
  url,
}: {
  email: string;
  url: string;
}) {
  await resend.emails.send({
    from: "noreply@danibura.me",
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Welcome to Expenses Tracker!</h1>
      <p>Click here to verify your account:</p>
      <a href="${url}">
        Verify email
      </a>
    `,
  });
}
