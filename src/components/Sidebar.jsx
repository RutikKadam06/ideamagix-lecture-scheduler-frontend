import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarDays,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="mobile-topbar">
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
        <h2>Ideamagix</h2>
      </div>

      <div className={`sidebar ${open ? "show" : ""}`}>
        <div className="logo-box">
          <h2>Ideamagix</h2>
          <button className="close-btn" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="menu-section">
          {user?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className={location.pathname === "/admin" ? "active" : ""}
              >
                <LayoutDashboard size={20}/>
                Dashboard
              </Link>

              <Link
                to="/admin/courses"
                className={location.pathname === "/admin/courses" ? "active" : ""}
              >
                <BookOpen size={20}/>
                Courses
              </Link>

              <Link
                to="/admin/instructors"
                className={location.pathname === "/admin/instructors" ? "active" : ""}
              >
                <Users size={20}/>
                Instructors
              </Link>

              <Link
                to="/admin/add-course"
                className={location.pathname === "/admin/add-course" ? "active" : ""}
              >
                <CalendarDays size={20}/>
                Add Course
              </Link>
            </>
          )}

          {user?.role === "instructor" && (
            <Link
              to="/instructor"
              className={location.pathname === "/instructor" ? "active" : ""}
            >
              <CalendarDays size={20}/>
              My Lectures
            </Link>
          )}
        </div>

        <button className="logout" onClick={handleLogout}>
          <LogOut size={20}/>
          Logout
        </button>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default Sidebar;