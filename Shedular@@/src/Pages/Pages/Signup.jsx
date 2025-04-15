import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    id_code: '', // Employee ID entered by the user (must match an allowed ID)
    street: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    profile_image: null,
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);

  // Form validation
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name) errors.name = 'Full name is required';
    if (!emailRegex.test(formData.email)) errors.email = 'Invalid email format';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (!formData.id_code) errors.id_code = 'Employee ID is required';
    if (!formData.street) errors.street = 'Street address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State/Province is required';
    if (!formData.country) errors.country = 'Country is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Profile image upload function
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData({ ...formData, profile_image: file });
    }
  };

  // Submit Form with JWT auto-login on successful registration
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('id_code', formData.id_code); // Employee ID must match one in the backend allowed list
    formDataToSend.append('street', formData.street);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('zip_code', formData.zip_code);
    formDataToSend.append('country', formData.country);

    if (formData.profile_image) {
      formDataToSend.append('profile_image', formData.profile_image);
    }

    try {
      // Post registration data to the signup endpoint.
      // Ensure your backend endpoint (/api/auth/register/) uses the SignupSerializer that validates id_code.
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/register/',
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // If tokens are returned (auto-login), store them
      if (response.data.access) {
        localStorage.setItem("accessToken", response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem("refreshToken", response.data.refresh);
      }

      alert('✅ Registration successful!');
      navigate('/dashboard'); // Redirect to dashboard (adjust path as needed)
    } catch (error) {
      console.error('🔥 Error during signup:', error);
      setError('Something went wrong. Please check your details or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left Section: Signup Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-[2rem] shadow-2xl p-8 md:p-10 lg:p-12">
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl w-20 h-20 mb-6 shadow-lg">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 font-[Inter]">
              Employee Registration
            </h1>
            <p className="text-gray-600 text-lg">Join our workforce management system</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-center gap-3">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                            focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="employee@shiftwise.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                            focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password (min 8 characters)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                            focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Employee ID (Provided by HR)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                            focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                  value={formData.id_code}
                  onChange={(e) => setFormData({ ...formData, id_code: e.target.value })}
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                {validationErrors.id_code && <p className="text-red-500 text-sm mt-1">{validationErrors.id_code}</p>}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-semibold text-gray-900">Home Address</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                              focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  />
                  <svg 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {validationErrors.street && <p className="text-red-500 text-sm mt-1">{validationErrors.street}</p>}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                              focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  <svg 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {validationErrors.city && <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="State/Province"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                              focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                  <svg 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {validationErrors.state && <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 
                              focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                  <svg 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {validationErrors.country && <p className="text-red-500 text-sm mt-1">{validationErrors.country}</p>}
                </div>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <Dropzone onDrop={onDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <div 
                    {...getRootProps()} 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer 
                             hover:border-blue-400 transition-colors duration-300 bg-gray-50/50"
                  >
                    <input {...getInputProps()} />
                    {formData.profile_image ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(formData.profile_image)}
                          alt="Profile Preview"
                          className="w-32 h-32 rounded-full mx-auto object-cover shadow-md"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData({ ...formData, profile_image: null });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-600">Drag & drop photo, or click to select</p>
                        <p className="text-xs text-gray-500">Recommended size: 500x500 pixels</p>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl 
                        font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 
                        transform hover:scale-[1.01] shadow-lg relative"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Complete Registration"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section: Visual Showcase */}
      <div className="md:w-1/2 w-full relative overflow-hidden bg-gradient-to-br from-blue-800 to-indigo-900 
                    flex items-center justify-center p-8 min-h-[50vh] md:min-h-screen">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        <div className="relative z-10 text-center space-y-8 animate-slide-in">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 inline-block">
              <h2 className="text-6xl font-bold text-white mb-4 font-[Inter]">
                Shiftwise
              </h2>
              <div className="h-1.5 bg-white/20 rounded-full animate-pulse-slow"></div>
            </div>
            <p className="text-blue-100/90 text-xl leading-relaxed max-w-2xl mx-auto">
              Your gateway to seamless shift management and workforce coordination
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 opacity-50 mix-blend-lighten">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl backdrop-blur-sm animate-float-delayed">
                <svg className="w-8 h-8 mx-auto text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;