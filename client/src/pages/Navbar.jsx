import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const syncUser = () => {
    try {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  };

 
  queueMicrotask(syncUser);


  window.addEventListener("userChanged", syncUser);
  window.addEventListener("storage", syncUser);

  return () => {
    window.removeEventListener("userChanged", syncUser);
    window.removeEventListener("storage", syncUser);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    try { window.dispatchEvent(new Event('userChanged')) } catch{
      // Silently ignore event dispatch errors
    }
    navigate("/");
  };

  const displayName = user?.name || "Vickey Yadav";

  return (
    <nav className="bg-gray-100 rounded space-x-4 flex items-center">
      <div className="flex-1 flex justify-start p-2">
        <Link to="/" className="px-3 rounded text-shadow-black text-3xl">
          {displayName}
        </Link>
      </div>



      <div className="flex-1 flex justify-end space-x-4 p-2">
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:bg-indigo-300 px-3 py-1 rounded text-2xl text-black">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
