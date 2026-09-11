import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <input
        type="text"
        placeholder="Search courses, instructors or lectures..."
      />

      <div className="profile">
        <span>Admin</span>
        <div className="avatar">A</div>
      </div>
    </div>
  );
};

export default Navbar;