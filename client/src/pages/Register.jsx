import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import newabout from "../assets/newabout.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !dob || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:1000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setSuccess(data.message || "Registered successfully");
      // clear form
      setName("");
      setDob("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-147 flex items-center space-x-20 justify-center bg-white">

<div>
      <img
        src={newabout}
        alt="Quantum"
        className="  rounded-lg w-120 mr-20 h-160 mt-18 object-cover"
      />
 </div>

      <div className="max-w-md w-full mt-5 bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {/* REGISTER FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
         
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
        {success && <div className="mt-4 text-center text-green-600">{success}</div>}

        {/* SWIPER FOR LOGIN PROMOTION */}
        <div className="mt-6">
          <Swiper slidesPerView={1} spaceBetween={10} autoplay={{ delay: 3000 }}>
            <SwiperSlide>
              <div className="text-center text-gray-600 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 underline">
                  Login Here
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-center text-gray-600 font-medium">
                Login to continue your journey!
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

      </div>

    </div>
  );
};

export default Register;
