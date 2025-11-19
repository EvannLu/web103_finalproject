import { useState } from "react";
import { getUserById } from "../services/userService";
import "./UserLookup.css";

function UserLookup() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await getUserById(userId);
      console.log("User data received:", data);
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.response?.data?.error || err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-lookup-container">
      <div className="user-lookup-card">
        <h2>User Lookup Test</h2>
        <p>Enter a user ID to fetch their username from the database</p>

        <form onSubmit={handleLookup} className="lookup-form">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID (e.g., 1)"
            className="lookup-input"
            required
          />
          <button type="submit" className="lookup-button" disabled={loading}>
            {loading ? "Loading..." : "Lookup User"}
          </button>
        </form>

        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}

        {userData && (
          <div className="user-result">
            <h3>User Found!</h3>
            <div className="user-details">
              <p><strong>ID:</strong> {userData.id}</p>
              <p><strong>Username:</strong> {userData.username || "(no username)"}</p>
              <details>
                <summary>Full Data</summary>
                <pre>{JSON.stringify(userData, null, 2)}</pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLookup;
