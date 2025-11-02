import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PasswordCheckRequest {
  password: string;
}

interface PasswordCheckResponse {
  isCompromised: boolean;
  breachCount?: number;
  message: string;
}

async function sha1(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function checkPasswordBreach(
  password: string
): Promise<PasswordCheckResponse> {
  try {
    const hash = await sha1(password);
    const prefix = hash.substring(0, 5).toUpperCase();
    const suffix = hash.substring(5).toUpperCase();

    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        method: "GET",
        headers: {
          "User-Agent": "Africhicken-Rwanda-App",
        },
      }
    );

    if (!response.ok) {
      return {
        isCompromised: false,
        message: "Unable to verify password security at this time. Please try again later.",
      };
    }

    const text = await response.text();
    const lines = text.split("\r\n");

    for (const line of lines) {
      const [hash_suffix, count] = line.split(":");
      if (hash_suffix.toUpperCase() === suffix) {
        return {
          isCompromised: true,
          breachCount: parseInt(count, 10),
          message: `This password has been found in ${count} data breaches. Please choose a different password.`,
        };
      }
    }

    return {
      isCompromised: false,
      message: "Password is secure.",
    };
  } catch (error) {
    console.error("Password breach check error:", error);
    return {
      isCompromised: false,
      message: "Unable to verify password security. Please try again later.",
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { password }: PasswordCheckRequest = await req.json();

    if (!password || typeof password !== "string") {
      return new Response(
        JSON.stringify({ error: "Password is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const result = await checkPasswordBreach(password);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        isCompromised: false,
        message: "An error occurred. Please try again later.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
