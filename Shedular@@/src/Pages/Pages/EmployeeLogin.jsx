import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [idCode, setIdCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Shiftwise - Employee Portal";
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid work email");
      return;
    }
    try {
      setLoading(true);
      await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/email-verification/send-employee-otp/`, { email });
      setStep(2);
      setError("");
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/email-verification/verify-employee-otp/`, { email, otp });
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !idCode) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/employee-login/`, {
        email,
        password,
        id_code: idCode,
      });

      localStorage.setItem("employeeAccessToken", response.data.access);
      localStorage.setItem("employeeRefreshToken", response.data.refresh);
      navigate("/employee/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Generate random particles
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

  const particles = generateParticles(80, ["#6366f1", "#8b5cf6", "#3b82f6", "#10b981"]);
  const stars = generateParticles(40, ["#ffffff", "#fef08a", "#bfdbfe"]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Shooting Stars */}
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

      {/* Floating Particles */}
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

      {/* Animated Background Elements */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl rounded-full -left-64 -top-64"
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
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl rounded-full -right-64 -bottom-64"
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

      {/* Geometric Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphcoders-lil-fiber.png')] opacity-10" />

      {/* Main Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-[40px] shadow-2xl border border-white/20 overflow-hidden z-10"
      >
        <div className="flex flex-col md:flex-row">
          {/* Illustration Section */}
          <div className="md:w-1/2 p-12 bg-gradient-to-br from-slate-900 to-slate-800 relative hidden md:block">
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
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </motion.div>
                <h1 className="text-3xl font-bold tracking-tight font-[Inter]">Shiftwise</h1>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Employee Suite</h2>
                <p className="text-slate-300/90 leading-relaxed">Enterprise-grade workforce management solutions with advanced security protocols</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                    className="p-3 bg-white/5 rounded-xl backdrop-blur-sm"
                  >
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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
                  <div className="p-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-slate-900 mb-2"
                >
                  {step === 1 ? "Secure Access" : step === 2 ? "Verify Identity" : "Final Step"}
                </motion.h3>
                <p className="text-slate-500 text-sm">Enterprise authentication portal</p>
              </div>

              <div className="mb-8 flex justify-center">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all 
                      ${s <= step ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-8 h-1 ${s < step ? 'bg-slate-900' : 'bg-slate-200'}`}></div>}
                  </div>
                ))}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
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
                    onSubmit={sendOtp}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all placeholder-slate-400"
                        placeholder="Work Email"
                        autoFocus
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
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
                        "Continue →"
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
                    onSubmit={verifyOtp}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all placeholder-slate-400"
                        placeholder="OTP Code"
                        maxLength="6"
                        autoFocus
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                      disabled={loading}
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
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.form
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleLogin}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all placeholder-slate-400"
                          placeholder="Password"
                          autoFocus
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          value={idCode}
                          onChange={(e) => setIdCode(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all placeholder-slate-400"
                          placeholder="Employee ID"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
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
                <a href="#help" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
                  Need Assistance? ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Starbursts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`starburst-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 100}px`,
            height: `${Math.random() * 100 + 100}px`,
            background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default EmployeeLogin;