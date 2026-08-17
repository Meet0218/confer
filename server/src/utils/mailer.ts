import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT
  ? parseInt(process.env.SMTP_PORT, 10)
  : undefined;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const fromAddress = process.env.SMTP_FROM;

let transporter: nodemailer.Transporter | null = null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildInviteHtml(params: {
  hostName: string;
  callTitle?: string;
  inviteUrl: string;
}) {
  const hostName = escapeHtml(params.hostName);
  const callTitle = params.callTitle ? escapeHtml(params.callTitle) : "";
  const inviteUrl = escapeHtml(params.inviteUrl);
  const titleBlock = callTitle
    ? `<div style="margin:16px 0 0;font-size:18px;font-weight:700;color:#111827;line-height:1.4;">${callTitle}</div>`
    : "";

  return `
    <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        ${hostName} invited you to join a call${callTitle ? `: ${callTitle}` : ""}.
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7fb;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
              <tr>
                <td style="background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 100%);padding:28px 32px;">
                  <div style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.78);font-weight:700;">
                    Confer
                  </div>
                  <div style="margin-top:10px;font-size:28px;line-height:1.2;color:#ffffff;font-weight:800;">
                    You have a new call invite
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:32px;color:#1f2937;">
                  <div style="font-size:16px;line-height:1.7;color:#374151;">
                    <strong style="color:#111827;">${hostName}</strong> invited you to join a call.
                  </div>
                  ${titleBlock}
                  <div style="margin-top:20px;padding:18px 20px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
                    <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">
                      Meeting link
                    </div>
                    <div style="margin-top:8px;font-size:14px;line-height:1.6;word-break:break-word;color:#0f172a;">
                      ${inviteUrl}
                    </div>
                  </div>
                  <div style="margin:28px 0 10px;text-align:center;">
                    <a
                      href="${inviteUrl}"
                      style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:14px 26px;border-radius:999px;box-shadow:0 8px 18px rgba(37,99,235,0.28);"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join the call
                    </a>
                  </div>
                  <div style="font-size:13px;line-height:1.7;color:#6b7280;text-align:center;">
                    If the button does not work, copy and paste this link into your browser.
                  </div>
                </td>
              </tr>
            </table>
            <div style="max-width:640px;margin:14px auto 0;font-size:12px;line-height:1.6;color:#94a3b8;text-align:center;">
              Sent from Confer
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function getTransporter() {
  if (transporter) return transporter;
  if (!smtpHost || !smtpPort) {
    // fallback to ethereal if not configured
    transporter = nodemailer.createTransport({
      jsonTransport: true,
    } as any);
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
  });
  return transporter;
}

export async function sendInviteEmail(
  to: string,
  inviteUrl: string,
  hostName?: string,
  callTitle?: string,
) {
  const t = getTransporter();
  const safeHostName = hostName?.trim() || "Someone";
  const safeCallTitle = callTitle?.trim();
  const subject = `${safeHostName} invited you to join a call${safeCallTitle ? `: ${safeCallTitle}` : ""}`;
  const text = `${safeHostName} invited you to join a call.${safeCallTitle ? `\nTitle: ${safeCallTitle}` : ""}\n\nJoin the call: ${inviteUrl}`;
  const html = buildInviteHtml({
    hostName: safeHostName,
    callTitle: safeCallTitle,
    inviteUrl,
  });

  try {
    const info = await t.sendMail({
      from: fromAddress,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (err) {
    // don't throw — caller should handle logging
    throw err;
  }
}
