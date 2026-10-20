const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, name, subject, message } = await req.json();

    if (!email || !subject) {
      return new Response(
        JSON.stringify({ error: "email and subject are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

    const greeting = name ? `Hi ${name},` : "Hello,";

    const emailBody = `${greeting}

${message || "You have a new notification from CareerInsight."}

Visit your dashboard to see the latest updates.

Best regards,
The CareerInsight Team`;

    const emailResponse = await fetch(`${supabaseUrl}/auth/v1/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${serviceKey}`,
        "apikey": serviceKey,
      },
      body: JSON.stringify({
        type: "signup",
        email,
        options: {
          email_redirect: `${supabaseUrl}`,
          data: {
            subject,
            body: emailBody,
          },
        },
      }),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notification queued for ${email}`,
        email: email,
        subject: subject,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
