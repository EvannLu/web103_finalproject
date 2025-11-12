import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const activities = [
    "Visit a museum",
    "Try new food",
    "Explore Central Park",
    "Coffee shops",
    "Live music",
    "Art galleries",
    "Sports events",
    "Theater shows",
    "Night clubs",
    "Hiking trails",
  ];

  const boroughs = [
    "Bronx",
    "Brooklyn",
    "Manhattan",
    "Queens",
    "Staten Island",
  ];
  const years = ["Freshman", "Sophomore", "Junior", "Senior"];

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Join Lexington Links</h1>
        <p className="subtitle">
          Connect with students who share your interests
        </p>

        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              placeholder="How should we call you?"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Choose a secure password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="activities">Favorite Hangout Activities</label>
            <select id="activities" multiple size="5">
              {activities.map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
            <small className="hint">Hold Ctrl/Cmd to select multiple</small>
          </div>

          <div className="form-group">
            <label htmlFor="borough">Borough</label>
            <select id="borough" required>
              <option value="">Select your borough</option>
              {boroughs.map((borough, index) => (
                <option key={index} value={borough}>
                  {borough}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select id="year" required>
              <option value="">Select your year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/home">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
