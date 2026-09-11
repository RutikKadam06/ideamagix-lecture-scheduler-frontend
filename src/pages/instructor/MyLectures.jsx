import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./MyLectures.css";

const MyLectures = () => {
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    getMyLectures();
  }, []);

  const getMyLectures = async () => {
    try {
      const res = await api.get("/lecture/my-lectures");
      setLectures(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="sidebar instructor-sidebar">
        <h2 className="logo">Ideamagix</h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main">
        <Navbar />

        <h1 className="page-title">My Assigned Lectures</h1>

        <div className="lecture-grid">
          {lectures.map((lecture) => (
            <div className="lecture-card" key={lecture._id}>
              <img
                src={`http://localhost:5000/uploads/${lecture.courseId.image}`}
                alt={lecture.courseId.name}
              />

              <div className="lecture-content">
                <h2>{lecture.courseId.name}</h2>

                <p>
                  <strong>Level:</strong> {lecture.courseId.level}
                </p>

                <p>
                  <strong>Batch:</strong> {lecture.batchName}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(lecture.lectureDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

          {lectures.length === 0 && (
            <div className="card empty-card">
              <h3>No Lectures Assigned</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLectures;