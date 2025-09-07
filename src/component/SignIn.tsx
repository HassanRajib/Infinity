"use client"
import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SignIn: React.FC = () => {

    const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { username: "", password: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      const response = await axios.post(`${apiUrl}api/admin/login`, {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("adminToken", response.data.token);
      router.push("/admin");
    } catch (error) {
      console.error(error);
      setLoginError("Invalid username or password");
    }
  };

  return (
    <div className="bg-background flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-8">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-indigo-900 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300`}
              placeholder="Enter your username"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-indigo-900 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300`}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Sign In
          </button>
          {loginError && (
            <p className="text-red-600 font-medium text-center">
              {loginError}
            </p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default SignIn