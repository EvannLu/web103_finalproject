import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import UserLookup from "./pages/UserLookup";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/user-lookup" element={<UserLookup />} />
      </Routes>
    </Router>
  );
}

export default App;
