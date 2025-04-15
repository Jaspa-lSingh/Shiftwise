// employeeAuth.js
export function getEmployeeAuthHeader() {
    const token = localStorage.getItem("employeeAccessToken");
    return {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  }
  