import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import "./ManageLectures.css";

const ManageLectures = () => {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [instructors, setInstructors] = useState([]);
  const [lectures, setLectures] = useState([]);

  const [batchName, setBatchName] = useState("");
  const [lectureDate, setLectureDate] = useState("");
  const [instructorId, setInstructorId] = useState("");

  useEffect(() => {
    fetchCourse();
    fetchInstructors();
    fetchLectures();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/course/${id}`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const res = await api.get("/auth/instructors");
      setInstructors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await api.get(`/lecture/course/${id}`);
      setLectures(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!batchName || !lectureDate || !instructorId) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await api.post("/lecture", {
        courseId: id,
        instructorId,
        batchName,
        lectureDate,
      });

      toast.success("Lecture Scheduled Successfully");

      setBatchName("");
      setLectureDate("");
      setInstructorId("");

      fetchLectures();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Instructor already assigned on this date."
      );
    }
  };

  const deleteLecture = async (lectureId) => {
    try {
      await api.delete(`/lecture/${lectureId}`);
      toast.success("Lecture Deleted");
      fetchLectures();
    } catch (error) {
      toast.error("Unable to delete lecture");
    }
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1 className="page-title">Manage Lectures</h1>

        <div className="card course-info">
          <img
            src={`http://localhost:5000/uploads/${course.image}`}
            alt={course.name}
          />

          <div>
            <h2>{course.name}</h2>
            <p>{course.level}</p>
            <p>{course.description}</p>
          </div>
        </div>

        <div className="card">
          <h2>Add Lecture</h2>

          <form className="lecture-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Batch Name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />

            <input
              type="date"
              value={lectureDate}
              onChange={(e) => setLectureDate(e.target.value)}
            />

            <select
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
            >
              <option value="">Select Instructor</option>

              {instructors.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <button type="submit">Assign Lecture</button>
          </form>
        </div>

        <div className="card">
          <h2>Scheduled Lectures</h2>

          <table>
            <thead>
              <tr>
                <th>Batch</th>
                <th>Instructor</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {lectures.map((lecture) => (
                <tr key={lecture._id}>
                  <td>{lecture.batchName}</td>

                  <td>{lecture.instructorId?.name}</td>

                  <td>
                    {new Date(
                      lecture.lectureDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteLecture(lecture._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {lectures.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-row">
                    No Lectures Scheduled
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLectures;