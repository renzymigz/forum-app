import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/api";

export default function Login({ setUser }) {
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.current.value || !password.current.value) {
      setError("Enter username and password");
      return;
    }
    try {
      const res = await loginUser(
        username.current.value,
        password.current.value
      );
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/forum");
      } else {
        setError("Invalid login");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div class="py-5 font-semibold">Log in with your existing account</div>
      <div className="p-6 rounded-lg shadow-2xl shadow-[#2c2d2d] w-80 bg-[#181818] border border-[#2c2d2d]">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div className="relative w-full mb-2">
          <i className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-[#474949]"></i>
          <input
            className="w-full border p-2 pl-10 rounded placeholder:text-[#484948] border-[#2c2d2d]"
            type="text"
            placeholder="Username"
            ref={username}
          />
        </div>

        <div className="relative w-full mb-2">
          <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[#474949]"></i>
          <input
            className="w-full border p-2 pl-10 rounded placeholder:text-[#484948] border-[#2c2d2d]"
            type="password"
            placeholder="Password"
            ref={password}
          />
        </div>

        <button
          className="w-full bg-white text-black mt-2 p-2 rounded-lg hover:bg-gray-300 font-bold cursor-pointer"
          onClick={handleLogin}
        >
          Log in
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <p className="text-sm mt-3 text-center text-[#6e6e6e]">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
