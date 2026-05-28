import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENT = "sajison71@gmail.com"

const projectLabels: Record<string, string> = {
  "gis-system": "GIS System Architecture",
  "drone-gis": "Drone Data & GIS Integration",
  "spatial-consulting": "Spatial Data Consulting",
  "ai-gis": "AI + GIS Research",
  "other": "Other",
}

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-20k": "$5,000 – $20,000",
  "20k-50k": "$20,000 – $50,000",
  "50k-plus": "$50,000+",
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured. Add RESEND_API_KEY to your environment." },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, organization, projectType, budget, message } = body

    if (!name || !email || !organization || !projectType || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: "Scotch Portfolio <onboarding@resend.dev>",
      to: [RECIPIENT],
      replyTo: email,
      subject: `New inquiry: ${projectLabels[projectType] ?? projectType} — ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 560px; margin: 0 auto; padding: 36px; background: #07080F; color: #F0F0FA; border-radius: 16px; border: 1px solid #1E2030;">
          <div style="margin-bottom: 28px;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #7C3AFF;">Portfolio Contact</span>
            <h2 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #F0F0FA;">New Inquiry Received</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1E2030;">
              <td style="padding: 12px 0 12px 0; color: #4B4F6A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; width: 130px; vertical-align: top; padding-top: 14px;">Name</td>
              <td style="padding: 12px 0; color: #F0F0FA; font-size: 14px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1E2030;">
              <td style="padding: 12px 0; color: #4B4F6A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; vertical-align: top; padding-top: 14px;">Email</td>
              <td style="padding: 12px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #06D6F0; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #1E2030;">
              <td style="padding: 12px 0; color: #4B4F6A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; vertical-align: top; padding-top: 14px;">Organization</td>
              <td style="padding: 12px 0; color: #F0F0FA; font-size: 14px;">${organization}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1E2030;">
              <td style="padding: 12px 0; color: #4B4F6A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; vertical-align: top; padding-top: 14px;">Project Type</td>
              <td style="padding: 12px 0; font-size: 14px;">
                <span style="background: rgba(124,58,255,0.15); color: #A78BFA; padding: 3px 10px; border-radius: 20px; font-size: 12px;">
                  ${projectLabels[projectType] ?? projectType}
                </span>
              </td>
            </tr>
            ${budget ? `
            <tr style="border-bottom: 1px solid #1E2030;">
              <td style="padding: 12px 0; color: #4B4F6A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; vertical-align: top; padding-top: 14px;">Budget</td>
              <td style="padding: 12px 0; color: #F0F0FA; font-size: 14px;">${budgetLabels[budget] ?? budget}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 14px 0 0 0; color: #4B4F6A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; vertical-align: top;">Message</td>
              <td style="padding: 14px 0 0 0; color: #D1D5DB; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #1E2030;">
            <a href="mailto:${email}" style="display: inline-block; background: #FF9F0A; color: #000; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 24px; border-radius: 100px;">
              Reply to ${name} →
            </a>
          </div>
          <p style="margin-top: 20px; color: #2D3048; font-size: 11px;">Sent via scotchajison.com contact form</p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
  }
}
