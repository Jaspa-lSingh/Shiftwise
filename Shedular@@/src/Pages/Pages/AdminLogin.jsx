import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { HiMail, HiLockClosed, HiKey, HiShieldCheck, HiArrowRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [idCode, setIdCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    document.title = "Shiftwise - Admin Portal";
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const generateParticles = (count, colors) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100
      },
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 2
    }));
  };

  const particles = generateParticles(80, ["#6366f1", "#3b82f6", "#60a5fa"]);
  const stars = generateParticles(40, ["#ffffff", "#bfdbfe"]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid work email");
      return;
    }
    try {
      setLoading(true);
      await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/email-verification/send-admin-otp/`, { email });
      setStep(2);
      setOtpTimer(300);
      setError("");
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/email-verification/verify-admin-otp/`, { email, otp });
      if (res.data.verified) {
        setStep(3);
        setError("");
      }
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!password || !idCode) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/admin-login/`, {
        email,
        password,
        id_code: idCode,
      });

      localStorage.setItem("adminAccessToken", response.data.access);
      localStorage.setItem("adminRefreshToken", response.data.refresh);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full pointer-events-none"
          style={{
            left: `${star.position.x}%`,
            top: `${star.position.y}%`,
            scale: star.size / 2
          }}
          animate={{
            opacity: [0, 1, 0],
            x: ["0%", "100%"],
            y: ["0%", "100%"]
          }}
          transition={{
            duration: star.duration * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.position.x}%`,
            top: `${particle.position.y}%`
          }}
          animate={{
            y: ["0%", "-100%"],
            x: ["0%", Math.random() > 0.5 ? "10%" : "-10%"],
            opacity: [0.3, 0.8, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-3xl rounded-full -left-64 -top-64"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full -right-64 -bottom-64"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphcoders-lil-fiber.png')] opacity-10" />

      {/* Main Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-[40px] shadow-2xl border border-white/20 overflow-hidden z-10"
      >
        <div className="flex flex-col md:flex-row">
          {/* Illustration Section */}
          <div className="md:w-1/2 p-12 bg-gradient-to-br from-indigo-900 to-blue-900 relative hidden md:block">
            <div className="absolute inset-0 bg-noise opacity-10" />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative z-10 text-white space-y-8"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"
                >
                  <HiShieldCheck className="w-12 h-12 text-indigo-400" />
                </motion.div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-indigo-200">Enterprise Security</h2>
                <p className="text-blue-100/90">Advanced protection for system administration</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                    className="p-3 bg-white/5 rounded-xl backdrop-blur-sm"
                  >
                    <HiKey className="w-8 h-8 mx-auto text-indigo-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 p-12">
            <div className="max-w-xs mx-auto">
              <div className="mb-10 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block mb-6"
                >
                  <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg">
                    <HiShieldCheck className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  {step === 1 ? "Secure Access" : step === 2 ? "Verify Identity" : "Final Step"}
                </motion.h3>
                <p className="text-gray-500 text-sm">Elevated privileges authentication</p>
              </div>

              <div className="mb-8 flex justify-center">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all 
                      ${s <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-8 h-1 ${s < step ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>}
                  </div>
                ))}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-center gap-2"
                >
                  <HiShieldCheck className="w-5 h-5 text-red-400" />
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode='wait'>
                {step === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSendOtp}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                        placeholder="admin@shiftwise.com"
                        autoFocus
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                          />
                          Sending...
                        </>
                      ) : (
                        "Send OTP →"
                      )}
                    </motion.button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleVerifyOtp}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                        placeholder="OTP Code"
                        maxLength="6"
                        autoFocus
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                        disabled={loading || step > 2}
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                            />
                            Verifying...
                          </>
                        ) : (
                          "Verify OTP →"
                        )}
                      </motion.button>
                      <div className="text-sm text-gray-500 ml-4">
                        {otpTimer > 0 ? formatTime(otpTimer) : "Code expired"}
                      </div>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.form
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleAdminLogin}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                          placeholder="Password"
                          autoFocus
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          value={idCode}
                          onChange={(e) => setIdCode(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-400"
                          placeholder="Admin ID"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                          />
                          Authenticating...
                        </>
                      ) : (
                        "Access Dashboard →"
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-8 text-center">
                <a href="#help" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  Admin Support ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;