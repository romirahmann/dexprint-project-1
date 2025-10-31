import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Login success! 🚀");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 transition-colors duration-300">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40 transition-all">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-orange-500">Dexprint</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back 👋</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white border-gray-200 focus-within:border-orange-400 transition-all">
              <FiMail className="text-gray-400" size={18} />
              <input
                type="username"
                name="username"
                required
                placeholder="username..."
                className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white border-gray-200 focus-within:border-orange-400 transition-all">
              <FiLock className="text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-semibold text-white transition-all 
              ${
                loading
                  ? "bg-orange-400 cursor-not-allowed opacity-70"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98]"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2025 Dexprint. All rights reserved.
        </p>
      </div>
    </div>
  );
}
