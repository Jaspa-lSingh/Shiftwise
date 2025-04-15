import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../../helpers/employeeAuth";
import { formatDistanceToNow } from "date-fns";
import { employeeAnnouncementAPI } from "../../../api/api";

const AnnouncementsTab = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  useEffect(() => {
    axios
    employeeAnnouncementAPI.getAll()
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.error("Error fetching announcements:", err.response?.data || err.message);
        setError("Failed to load announcements. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with Gradient Background */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg 
                className="h-6 w-6 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              Company Announcements
            </h2>
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
              {announcements.length} Active
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <svg 
                className="h-5 w-5 text-red-400 mr-3" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-600">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-100 rounded-xl">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4 text-gray-400">
                <svg 
                  className="h-16 w-16 mx-auto" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No announcements available</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for updates</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {announcements.map((announcement) => (
                <article 
                  key={announcement.id}
                  className={`group relative p-6 bg-white border rounded-xl transition-all
                    ${expandedAnnouncement === announcement.id 
                      ? 'border-blue-200 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-100 hover:shadow-md'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="mr-2">{announcement.topic}</span>
                        {announcement.is_urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Urgent
                          </span>
                        )}
                      </h3>
                      
                      <div className={`prose max-w-none transition-all overflow-hidden
                        ${expandedAnnouncement === announcement.id ? 'max-h-screen' : 'max-h-20'}
                      `}>
                        <p className="text-gray-600">{announcement.message}</p>
                      </div>

                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg 
                          className="h-4 w-4 mr-1.5 text-gray-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {formatDistanceToNow(new Date(announcement.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedAnnouncement(
                        expandedAnnouncement === announcement.id ? null : announcement.id
                      )}
                      className="ml-4 p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
                    >
                      <svg 
                        className={`h-5 w-5 transform transition-transform
                          ${expandedAnnouncement === announcement.id ? 'rotate-180' : ''}
                        `}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Fade-out gradient for collapsed state */}
                  {!expandedAnnouncement === announcement.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white pointer-events-none"></div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsTab;