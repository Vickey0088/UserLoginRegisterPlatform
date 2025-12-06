import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import newhero from "../assets/newhero.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please provide email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:1000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // store user in localStorage so app knows user is logged in
      try {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          // notify other parts of the app that user changed
          try { window.dispatchEvent(new Event('userChanged')) } catch { /* ignore error */ }
        }
      } catch (e) {
        console.warn("Could not store user in localStorage", e);
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-147 flex items-center justify-center space-x-20 bg-white">

      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* LOGIN FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <div className="mt-4 text-center text-red-600">{error}</div>}

        {/* SWIPER FOR REGISTER PROMOTION */}
        <div className="mt-6">
          <Swiper slidesPerView={1} spaceBetween={10} autoplay={{ delay: 3000 }}>
            <SwiperSlide>
              <div className="text-center text-gray-600 font-medium">
                New user?{' '}
                <Link to="/register" className="text-indigo-600 underline">
                  Register Now
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-center text-gray-600 font-medium">
                Create a new account in seconds!
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

      </div>
 
 <div>
      <img
        src={newhero}
        alt="Quantum"
        className="  h-135  rounded-lg  mt-18 ml-10 object-cover"
      />
 </div>
    </div>
  );
};

export default Login;
