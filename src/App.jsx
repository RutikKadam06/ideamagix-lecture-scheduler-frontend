import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import Instructors from "./pages/admin/Instructors.jsx";
import Courses from "./pages/admin/Courses.jsx";
import AddCourse from "./pages/admin/AddCourse.jsx";
import ManageLectures from "./pages/admin/ManageLectures.jsx";

import MyLectures from "./pages/instructor/MyLectures.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/instructors"
        element={
          <ProtectedRoute role="admin">
            <Instructors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute role="admin">
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-course"
        element={
          <ProtectedRoute role="admin">
            <AddCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/course/:id"
        element={
          <ProtectedRoute role="admin">
            <ManageLectures />
          </ProtectedRoute>
        }
      />

      <Route
        path="/instructor"
        element={
          <ProtectedRoute role="instructor">
            <MyLectures />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;