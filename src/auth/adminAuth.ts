/**
 * Secure Administrator Authentication Service
 * 
 * Enforces single secure admin account authentication.
 * Demo credentials and insecure localStorage auth fallbacks have been removed.
 */

export const INVALID_CREDENTIALS_ERROR = 'Invalid email or password';

export const ADMIN_AUTH_KEYS = {
  AUTH: 'mm_admin_auth',
  TOKEN: 'mm_admin_token',
  EMAIL: 'mm_admin_email',
  LOGIN_TIME: 'mm_admin_login_time',
};

/**
 * Validates login credentials against the single secure administrator account.
 * Only [MY_EMAIL] / [MY_NEW_PASSWORD] (and owner email / configured env variables) are accepted.
 */
export const validateAdminCredentials = (emailInput: string, passwordInput: string): boolean => {
  const cleanEmail = emailInput.trim().toLowerCase();
  if (!cleanEmail || !passwordInput) {
    return false;
  }

  // Permitted admin emails:
  // - Literal '[my_email]'
  // - Account owner email 'maherramzan415@gmail.com'
  // - Configured VITE_ADMIN_EMAIL (if set in environment)
  const allowedEmails = [
    '[my_email]',
    'maherramzan415@gmail.com',
    (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase()
  ].filter(Boolean);

  // Permitted admin passwords:
  // - Literal '[MY_NEW_PASSWORD]'
  // - Configured VITE_ADMIN_PASSWORD (if set in environment)
  const allowedPasswords = [
    '[MY_NEW_PASSWORD]',
    import.meta.env.VITE_ADMIN_PASSWORD
  ].filter(Boolean);

  const isEmailValid = allowedEmails.includes(cleanEmail);
  const isPasswordValid = allowedPasswords.includes(passwordInput);

  return isEmailValid && isPasswordValid;
};

/**
 * Verifies whether the current session has an active authenticated administrator
 */
export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEYS.AUTH) === 'true';
  } catch {
    return false;
  }
};

/**
 * Stores secure administrator session data in sessionStorage
 */
export const setAdminSession = (adminEmail: string): void => {
  const sessionToken = `mm_admin_sec_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  sessionStorage.setItem(ADMIN_AUTH_KEYS.AUTH, 'true');
  sessionStorage.setItem(ADMIN_AUTH_KEYS.TOKEN, sessionToken);
  sessionStorage.setItem(ADMIN_AUTH_KEYS.EMAIL, adminEmail.trim());
  sessionStorage.setItem(ADMIN_AUTH_KEYS.LOGIN_TIME, new Date().toISOString());
};

/**
 * Clears administrator session data
 */
export const clearAdminSession = (): void => {
  sessionStorage.removeItem(ADMIN_AUTH_KEYS.AUTH);
  sessionStorage.removeItem(ADMIN_AUTH_KEYS.TOKEN);
  sessionStorage.removeItem(ADMIN_AUTH_KEYS.EMAIL);
  sessionStorage.removeItem(ADMIN_AUTH_KEYS.LOGIN_TIME);
};

/**
 * Retrieves the currently logged-in administrator email
 */
export const getAdminEmail = (): string => {
  return sessionStorage.getItem(ADMIN_AUTH_KEYS.EMAIL) || 'Admin';
};
