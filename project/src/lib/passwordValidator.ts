export interface PasswordValidationResult {
  isCompromised: boolean;
  breachCount?: number;
  message: string;
}

export async function validatePasswordBreach(
  password: string
): Promise<PasswordValidationResult> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(
      `${supabaseUrl}/functions/v1/validate-password-breach`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!response.ok) {
      console.error('Password validation error:', response.status);
      return {
        isCompromised: false,
        message: 'Unable to verify password security at this time. Please try again later.',
      };
    }

    const result: PasswordValidationResult = await response.json();
    return result;
  } catch (error) {
    console.error('Password breach check error:', error);
    return {
      isCompromised: false,
      message: 'Unable to verify password security. Please try again later.',
    };
  }
}
