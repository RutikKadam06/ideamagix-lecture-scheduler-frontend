import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Courses", value: 10, color: "#2563eb" },
    { title: "Instructors", value: 8, color: "#16a34a" },
    { title: "Total Lectures", value: 56, color: "#7c3aed" },
    { title: "Scheduled This Week", value: 12, color: "#ea580c" }
  ];

  const lectures = [
    {
      date: "10 Sept",
      course: "MERN Stack Development",
      instructor: "Rahul Sharma",
      time: "10:00 AM - 11:00 AM"
    },
    {
      date: "11 Sept",
      course: "Java Full Stack",
      instructor: "Pooja Patil",
      time: "02:00 PM - 03:00 PM"
    },
    {
      date: "12 Sept",
      course: "Python Data Science",
      instructor: "Aishwarya Bhosale",
      time: "11:00 AM - 12:00 PM"
    }
  ];

  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="hero">
          <div>
            <h1>Welcome Back, Admin 👋</h1>
            <p>Manage courses, instructors and lectures in one place.</p>
          </div>

          <button onClick={() => navigate("/admin/add-course")}>
            Add Course
          </button>
        </div>

        <div className="stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.title}>
              <div
                className="circle"
                style={{ background: item.color }}
              ></div>
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="card lecture-card">
            <h2>Upcoming Lectures</h2>

            {lectures.map((lecture) => (
              <div
                className="lecture-item"
                key={lecture.date + lecture.course}
              >
                <div className="lecture-date">{lecture.date}</div>

                <div className="lecture-info">
                  <h4>{lecture.course}</h4>
                  <span>{lecture.instructor}</span>
                  <small>{lecture.time}</small>
                </div>

                <button>Join</button>
              </div>
            ))}
          </div>

          <div className="card action-card">
            <h2>Quick Actions</h2>

            <button onClick={() => navigate("/admin/add-course")}>
              Add Course
            </button>

            <button>Add Instructor</button>
            <button>Schedule Lecture</button>
            <button>View Calendar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;