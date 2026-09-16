import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  X,
  KeyRound,
  ArrowLeft,
  Store,
  ShieldAlert
} from 'lucide-react';
import { STORE_EMAIL } from '../types';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  isFullPage?: boolean;
  onNavigateHome?: () => void;
  noticeMessage?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isFullPage = false,
  onNavigateHome,
  noticeMessage
}) => {
  if (!isOpen && !isFullPage) return null;

  const [email, setEmail] = useState('maniminarskids@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const getStoredPassword = (): string => {
    return localStorage.getItem('mm_admin_pwd') || 'ManiAdmin2026!';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      const currentAdminPassword = getStoredPassword();

      if (trimmedEmail !== STORE_EMAIL.toLowerCase()) {
        setError(`Access Denied: Only the official admin account (${STORE_EMAIL}) has dashboard permissions.`);
        setIsSubmitting(false);
        return;
      }

      if (password !== currentAdminPassword) {
        setError('Invalid security password. Please check your credentials and retry.');
        setIsSubmitting(false);
        return;
      }

      // Success
      const sessionToken = `mm_admin_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('mm_admin_auth', 'true');
      sessionStorage.setItem('mm_admin_token', sessionToken);
      sessionStorage.setItem('mm_admin_email', trimmedEmail);
      sessionStorage.setItem('mm_admin_login_time', new Date().toISOString());

      setLoginSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    }, 400);
  };

  const handleAutofillDemo = () => {
    setEmail('maniminarskids@gmail.com');
    setPassword(getStoredPassword());
    setError('');
  };

  const formContent = (
    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
      {/* Close Button (if modal) */}
      {!isFullPage && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Security Header Badge */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-950 text-amber-400 flex items-center justify-center shadow-md mb-3 border border-blue-900">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full mb-1">
          Restricted Admin Area
        </span>
        <h2 className="text-2xl font-black text-blue-950 font-display">
          Admin Sign In
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
          Sign in using authorized store administrator credentials to manage products, live inventory, and customer orders.
        </p>
      </div>

      {/* Route Notice / Redirect Warning */}
      {noticeMessage && (
        <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-800 animate-in fade-in">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>{noticeMessage}</div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {/* Success Alert */}
      {loginSuccess && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800 font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Identity verified! Redirecting to /admin/dashboard...</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="mt-5 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Authorized Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              id="admin-login-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maniminarskids@gmail.com"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-950/10 transition-all outline-hidden"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Designated admin: <strong className="text-slate-600 font-mono">maniminarskids@gmail.com</strong>
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700">
              Security Password
            </label>
            <button
              type="button"
              id="admin-autofill-demo-btn"
              onClick={handleAutofillDemo}
              className="text-[11px] font-bold text-blue-900 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
              title="Autofill standard admin credentials for test login"
            >
              <KeyRound className="w-3 h-3" />
              <span>Autofill Demo Pass</span>
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              id="admin-login-password-input"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-950/10 transition-all outline-hidden"
            />
            <button
              type="button"
              id="admin-login-toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          id="admin-login-submit-btn"
          disabled={isSubmitting || loginSuccess}
          className="w-full py-3 rounded-xl bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <span>Sign In to Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Security Notice Box */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>Encrypted Session Protection</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">v2.4-SECURE</span>
      </div>

      {isFullPage && onNavigateHome && (
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <button
            onClick={onNavigateHome}
            className="text-xs text-slate-500 hover:text-blue-950 font-semibold inline-flex items-center gap-1.5 cursor-pointer hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store Website</span>
          </button>
        </div>
      )}
    </div>
  );

  if (isFullPage) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        {/* Top Navigation Strip */}
        <header className="bg-blue-950 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-blue-900 shadow-xs">
          <div className="flex items-center gap-3">
            {onNavigateHome ? (
              <button 
                onClick={onNavigateHome}
                className="flex items-center gap-2.5 hover:opacity-90 transition-opacity text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white shadow-xs">
                  MM
                </div>
                <div>
                  <h1 className="text-sm font-extrabold text-white font-display leading-tight">
                    Mani Minars Kids Wear
                  </h1>
                  <p className="text-[10px] text-amber-300 font-semibold">Store Administration Portal</p>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white shadow-xs">
                  MM
                </div>
                <div>
                  <h1 className="text-sm font-extrabold text-white font-display leading-tight">
                    Mani Minars Kids Wear
                  </h1>
                  <p className="text-[10px] text-amber-300 font-semibold">Store Administration Portal</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-900 border border-blue-800 transition-colors cursor-pointer"
              >
                <Store className="w-3.5 h-3.5 text-amber-300" />
                <span>Back to Store</span>
              </button>
            )}
          </div>
        </header>

        {/* Centered Login Card */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {formContent}
        </main>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      {formContent}
    </div>
  );
};
