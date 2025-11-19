import { Link } from "react-router-dom";
import "./Home.css";
import { useState, useEffect } from "react"; // ⬅️ IMPORT useState and useEffect
import { supabase } from "../supabaseClient";

function Home() {
  const [currentUserId, setCurrentUserId] = useState(null);

  const groups = [
    { id: 1, name: "CS_Club", image: "💻", members: 45 },
    { id: 2, name: "Art_Lovers", image: "🎨", members: 32 },
    { id: 3, name: "Foodies_NYC", image: "🍕", members: 67 },
    { id: 4, name: "Book_Club", image: "📚", members: 28 },
    { id: 5, name: "Fitness_Gang", image: "💪", members: 54 },
    { id: 6, name: "Music_Makers", image: "🎵", members: 41 },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>Lexington Links</h2>
        </div>
        <div className="nav-links">
          <Link to={currentUserId ? `/profile/${currentUserId}` : '/'} className="nav-button">
            Profile
          </Link>
          <button className="nav-button">Brew Random Group</button>
          <Link to="/messages" className="nav-button">
            Messages
          </Link>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search groups..."
              className="search-input"
            />
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-header">
          <h1>Discover Groups</h1>
          <p>Find your community and connect with like-minded students</p>
        </div>

        <div className="groups-grid">
          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-icon">{group.image}</div>
              <h3>{group.name}</h3>
              <p className="member-count">{group.members} members</p>
              <button className="join-button">Join Group</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
