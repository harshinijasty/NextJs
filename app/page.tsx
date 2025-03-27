"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "@/components/registrationcontext";


// Define validation schema using Yup
const schema = yup.object().shape({
   email: yup
    .string() 
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
 
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    setLoading(true);
  try {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Invalid email or password");
    }

    localStorage.setItem("accessToken", result.token);
    
    router.push("/listing");

    // Fetch User Data
    fetchUserData(result.token);
  } catch (error: any) {
    setLoginError(error.message);
  } finally {
    setLoading(false);
  }
};

const fetchUserData = async (token: string) => {
  try {
    const response = await fetch("https://reqres.in/api/users/4", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("Fetched User Data:", response);
    if (!response.ok) throw new Error("Failed to fetch user data");

    const userData = await response.json();
   

    setUser({
      firstName: userData.data.first_name,
      lastName: userData.data.last_name,
      email: userData.data.email,
      profileImage: userData.data.avatar,
      phoneNumber: "",
      dob: "",
      password: ""
    });

  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};


return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md shadow-lg p-6 rounded-lg bg-white">
      {/* Logo & Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <div className="flex justify-center">
          <Image src="/login.gif" alt="Login Image" height={100} width={100} />
        </div>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">Login</h2>
      </div>

      {/* Login Form */}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-2"
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-2"
          />
          <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-900">
            Remember me
          </label>
        </div>

        {/* Display Login Error Message */}
        {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      {/* Forgot Password and Signup Link */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-indigo-600 hover:underline">
            Reset it here
          </a>
        </p>
        <p className="mt-2">
          Don't have an account?{" "}
          <a href="/Signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
);
};

export default Login;
