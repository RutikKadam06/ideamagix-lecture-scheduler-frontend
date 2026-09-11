import { Link } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img
        src={`http://localhost:5000/uploads/${course.image}`}
        alt={course.name}
      />

      <div className="course-content">
        <h3>{course.name}</h3>

        <span>{course.level}</span>

        <p>{course.description}</p>

        <Link to={`/admin/course/${course._id}`}>
          Manage Lectures
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;