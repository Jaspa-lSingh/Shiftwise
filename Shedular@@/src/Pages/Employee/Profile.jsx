// Pages/Employee/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../helpers/employeeAuth"; 
import { userAPI } from "../../api/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data || err.message);
      setError("Could not load profile. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="m-4 text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="m-4 text-red-600">{error}</p>;
  }

  if (!profile) {
    return <p className="m-4 text-gray-600">No profile data available.</p>;
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-blue-600"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.85.647 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">Manage your personal information</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center p-8">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Profile Content */}
        {profile && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
            </div>

            <div className="p-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  {profile.profile_image ? (
                    <img
                      src={profile.profile_image}
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">
                      <svg 
                        className="w-8 h-8 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{profile.name || "N/A"}</h3>
                  <p className="text-sm text-gray-600">{profile.email || "N/A"}</p>
                  {profile.id_code && (
                    <p className="mt-1 text-sm text-gray-500">
                      Employee ID: <span className="font-medium">{profile.id_code}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Address</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Street</dt>
                      <dd className="mt-1 text-gray-900">{profile.street || "N/A"}</dd>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <dt className="text-sm text-gray-500">City</dt>
                        <dd className="mt-1 text-gray-900">{profile.city || "N/A"}</dd>
                      </div>
                      <div className="flex-1">
                        <dt className="text-sm text-gray-500">State</dt>
                        <dd className="mt-1 text-gray-900">{profile.state || "N/A"}</dd>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <dt className="text-sm text-gray-500">ZIP Code</dt>
                        <dd className="mt-1 text-gray-900">{profile.zip_code || "N/A"}</dd>
                      </div>
                      <div className="flex-1">
                        <dt className="text-sm text-gray-500">Country</dt>
                        <dd className="mt-1 text-gray-900">{profile.country || "N/A"}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Additional Details Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Other Details</h3>
                  <dl className="space-y-2">
                    {/* Add more profile fields here if available */}
                    <div>
                      <dt className="text-sm text-gray-500">Department</dt>
                      <dd className="mt-1 text-gray-900">N/A</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Position</dt>
                      <dd className="mt-1 text-gray-900">N/A</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;