import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import CourseCard from "../../components/CourseCard";
import api from "../../services/api";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/course");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1 className="page-title">Courses</h1>

        <div className="grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;