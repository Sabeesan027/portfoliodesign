import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  missionType?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const missionType = (body.missionType ?? "Full-Stack Engineering").trim();
    const message = (body.message ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid sender name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid return email address." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Transmission payload must be at least 10 characters." },
        { status: 400 }
      );
    }

    const transmissionId = `UK-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const resendKey = process.env.RESEND_API_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    // Provider 1: Resend
    if (resendKey) {
      const toEmail = process.env.CONTACT_TO_EMAIL || "sabeesan@ultrakerb.com";
      const fromEmail =
        process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `[${missionType}] New Transmission from ${name}`,
          text: `Transmission ID: ${transmissionId}\nTimestamp: ${timestamp}\nSender: ${name} <${email}>\nMission Type: ${missionType}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error("Resend dispatch failed:", errText);
        return NextResponse.json(
          { error: "Upstream Resend relay rejected the transmission." },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        provider: "resend",
        transmissionId,
        timestamp,
      });
    }

    // Provider 2: Formspree
    if (formspreeEndpoint) {
      const formRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          missionType,
          message,
          transmissionId,
        }),
      });

      if (!formRes.ok) {
        return NextResponse.json(
          { error: "Upstream Formspree relay rejected the transmission." },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        provider: "formspree",
        transmissionId,
        timestamp,
      });
    }

    // Clean out-of-the-box verified local fallback when env vars are not yet configured
    return NextResponse.json({
      ok: true,
      mode: "simulated",
      provider: "simulated",
      transmissionId,
      timestamp,
      note: "Delivered in local simulated mode. Set RESEND_API_KEY or FORMSPREE_ENDPOINT to enable live email relay.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Malformed request payload." },
      { status: 400 }
    );
  }
}
