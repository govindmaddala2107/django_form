import { useEffect, useState } from "react";
import api, { getCsrfToken } from "./api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCsrfToken(); // fetch token on mount
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await api.post("/validate/", { username, password });
      setMessage("✅ " + JSON.stringify(res.data));
    } catch (err) {
      setMessage("❌ " + err.response?.data?.error || "Error");
    }
  };

  return (
    <div>
      <h1>Login Test</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
