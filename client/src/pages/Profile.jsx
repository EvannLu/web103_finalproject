import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // State for the profile form
  const [formData, setFormData] = useState({
    display_name: "",
    borough: "",
    year: "",
    bio: "",
  });
  
  // State for posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    getProfileAndPosts();
  }, []);

  const getProfileAndPosts = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/"); // Not logged in, send to sign up
        return;
      }
      setUser(user);

      // 1. Fetch the user's profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      if (profileData) {
        setFormData({
          display_name: profileData.display_name || "",
          borough: profileData.borough || "",
          year: profileData.year || "",
          bio: profileData.bio || "",
        });
      }

      // 2. Fetch only this user's posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }); // Show newest first
      
      if (postsError) throw postsError;
      
      setPosts(postsData || []);

    } catch (error) {
      console.error("Error loading data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: formData.display_name,
          borough: formData.borough,
          year: formData.year,
          bio: formData.bio,
          updated_at: new Date(),
        })
        .eq("id", user.id);

      if (error) throw error;
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile!");
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .insert([{ content: newPost, user_id: user.id }]);

    if (error) {
      alert("Error creating post");
    } else {
      setNewPost("");
      getProfileAndPosts(); // Refresh profile and posts
    }
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading && !user) {
     return <div className="loading-container">Loading...</div>; // Simple loader
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Your Profile</h1>
          <button onClick={() => navigate("/home")} className="back-btn">
            ← Back to Home
          </button>
        </div>

        {/* --- Profile Edit Form --- */}
        <form onSubmit={updateProfile} className="profile-form">
          <h3>Edit Your Info</h3>
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              value={formData.display_name}
              onChange={(e) => setFormData({...formData, display_name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell us about yourself..."
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <select 
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            >
              <option value="">Select your year</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>

        <hr className="divider" />

        {/* --- Create Post Form --- */}
        <form onSubmit={handleCreatePost} className="create-post-form-profile">
          <h3>Create a Post</h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an update..."
          />
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </form>

        <hr className="divider" />

        {/* --- User's Posts List --- */}
        <div className="posts-list-profile">
          <h3>Your Posts</h3>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card-profile">
                <p>{post.content}</p>
                <span className="post-time">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p>You haven't posted anything yet.</p>
          )}
        </div>

        <button onClick={signOut} className="signout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;