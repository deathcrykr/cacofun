const PLACEHOLDER_API_KEY = "re_GrtrVRVr_BCm4aGUqquA1kRmjkJnm9AkT";
const ALLOWED_ORIGINS = new Set([
  "https://caco.fun",
  "https://www.caco.fun"
]);

function createCorsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://caco.fun";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
  };
}

function json(origin, payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: createCorsHeaders(origin)
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return replacements[character];
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "https://caco.fun";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: createCorsHeaders(origin)
      });
    }

    if (request.method !== "POST") {
      return json(origin, { error: "Method not allowed." }, 405);
    }

    const resendApiKey = env.RESEND_API_KEY || PLACEHOLDER_API_KEY;

    if (resendApiKey === PLACEHOLDER_API_KEY) {
      return json(origin, {
        error: "Replace `re_GrtrVRVr_BCm4aGUqquA1kRmjkJnm9AkT` with your real Resend API key in the worker secret."
      }, 500);
    }

    let body;

    try {
      body = await request.json();
    } catch (error) {
      return json(origin, { error: "Invalid JSON body." }, 400);
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return json(origin, { error: "Name, email, and message are required." }, 400);
    }

    if (!isValidEmail(email)) {
      return json(origin, { error: "Please provide a valid email address." }, 400);
    }

    if (name.length > 120 || email.length > 180 || message.length > 5000) {
      return json(origin, { error: "One or more fields are too long." }, 400);
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    try {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "CACO Contact <onboarding@resend.dev>",
          to: ["travis@caco.fun"],
          subject: `[CACO Contact] ${name}`,
          reply_to: email,
          html:
            `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#101512">` +
            `<h2 style="margin-bottom:16px">New contact form submission</h2>` +
            `<p><strong>Name:</strong> ${safeName}</p>` +
            `<p><strong>Email:</strong> ${safeEmail}</p>` +
            `<p><strong>Message:</strong><br>${safeMessage}</p>` +
            `</div>`,
          text:
            `New contact form submission\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        })
      });

      const resendResult = await resendResponse.json();

      if (!resendResponse.ok) {
        return json(origin, {
          error: resendResult.message || "Resend could not send the email.",
          details: resendResult
        }, resendResponse.status);
      }

      return json(origin, {
        ok: true,
        id: resendResult.id
      });
    } catch (error) {
      return json(origin, {
        error: "Unexpected error while sending the email."
      }, 500);
    }
  }
};
