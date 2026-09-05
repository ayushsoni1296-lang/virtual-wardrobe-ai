import React, { useState } from 'react';
import { StatusBar } from '../common/Header';
import { Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onGoToSignUp: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onGoToSignUp,
}) => {
  const [email, setEmail] = useState('ankit@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-y-auto no-scrollbar">
      <div>
        <StatusBar dark={false} />

        <div className="px-6 pt-6 pb-2">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2 tracking-tight">
              Welcome Back! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 shadow-2xs transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-10 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 shadow-2xs transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email!')}
                  className="text-xs font-medium text-slate-500 hover:text-indigo-600"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold rounded-2xl text-sm shadow-md shadow-indigo-600/30 transition-all"
            >
              Login
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-[#F8FAFC] px-3 text-xs text-slate-400">
              or continue with
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={onLoginSuccess}
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 active:scale-[0.99] transition-all shadow-2xs"
          >
            {/* Google G icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>

      <div className="px-6 py-6 text-center">
        <p className="text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            onClick={onGoToSignUp}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
