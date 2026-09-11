import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import "./AddCourse.css";

const AddCourse = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !level || !description || !image) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("level", level);
      formData.append("description", description);
      formData.append("image", image);

      await api.post("/course", formData);

      toast.success("Course Added Successfully");

      navigate("/admin/courses");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h1 className="page-title">Add Course</h1>

        <div className="card">
          <form className="course-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Course Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <textarea
              rows="5"
              placeholder="Course Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">
              {loading ? "Adding..." : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;