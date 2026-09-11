import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  X
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import "./Instructors.css";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "instructor"
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await api.get("/auth/instructors");
      setInstructors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addInstructor = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "instructor"
      });

      setShowModal(false);
      fetchInstructors();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to add instructor");
    }
  };

  const deleteInstructor = async (id) => {
    if (!window.confirm("Delete this instructor?")) return;

    try {
      await api.delete(`/auth/delete/${id}`);
      fetchInstructors();
    } catch (err) {
      alert("Unable to delete instructor");
    }
  };

  const filtered = instructors.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="instructor-header">
          <div>
            <h1>Instructors</h1>
            <p>Manage instructors, add new faculty and organize lectures.</p>
          </div>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Add Instructor
          </button>
        </div>

        <div className="summary-grid">
          <div className="summary-card blue">
            <h2>{instructors.length}</h2>
            <span>Total Instructors</span>
          </div>

          <div className="summary-card green">
            <h2>{filtered.length}</h2>
            <span>Showing Results</span>
          </div>
        </div>

        <div className="instructor-card">
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search instructors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select>
              <option>All Instructors</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="user-box">
                        <div className="avatar">
                          {item.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h4>{item.name}</h4>
                          <span>Faculty Member</span>
                        </div>
                      </div>
                    </td>

                    <td>{item.email}</td>

                    <td>
                      <span className="role-pill">
                        Instructor
                      </span>
                    </td>

                    <td>
                      <div className="date-box">
                        <Calendar size={15} />
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">
                          <Pencil size={17} />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteInstructor(item._id)
                          }
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-list">
            {filtered.map((item) => (
              <div
                className="mobile-card"
                key={item._id}
              >
                <div className="mobile-top">
                  <div className="avatar">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.email}</p>
                  </div>
                </div>

                <span className="role-pill">
                  Instructor
                </span>

                <div className="date-box">
                  <Calendar size={15} />
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </div>

                <div className="mobile-actions">
                  <button className="edit-btn">
                    <Pencil size={17} />
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteInstructor(item._id)
                    }
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="footer-text">
            Showing {filtered.length} instructor(s)
          </div>
        </div>

        {showModal && (
          <div className="modal-bg">
            <div className="modal-box">
              <div className="modal-header">
                <h2>Add Instructor</h2>

                <button
                  onClick={() => setShowModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={addInstructor}>
                <div className="form-group">
                  <label>Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter instructor name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  Add Instructor
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;