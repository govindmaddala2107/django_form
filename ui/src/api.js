import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, // ✅ allow cookies
});

// Fetch CSRF token and set default header
export const getCsrfToken = async () => {
    const res = await api.get("/csrf/");
    api.defaults.headers.post["X-CSRFToken"] = res.data.csrfToken;
};

export default api;
