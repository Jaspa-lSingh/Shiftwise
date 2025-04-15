export function getAdminAuthHeader() {
  const token = localStorage.getItem("adminAccessToken"); 
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
}
