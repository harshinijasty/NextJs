"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "./registrationcontext";
import { useState } from "react";


const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
  .string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email format"
  )
  .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    dob: yup.date().required("Date of birth is required"),
    password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  });


const Registration=()=>{

    
    const { setUser } = useUser();
    // console.log(setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form submission
  const onSubmit =async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("User already exists or registration failed");
      }

      const responseData = await response.json();
      setUser(responseData.user); // Store user in context
      localStorage.setItem("accessToken", responseData.token);
      alert("Registration successful!");
      router.push("/"); // Redirect after successful registration
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

    
      return (
        <>
          <div className="flex justify-center items-center min-h-screen bg-gray-100 pb-11 overflow-auto">
        <div className="w-full max-w-md max-h-screen overflow-y-auto">
          <div className="flex flex-col shadow-lg p-4 rounded-lg bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {/* <div className="flex justify-center">
                <Image src="/login.gif" alt="Login image" height={50} width={50} />
              </div> */}
              <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
                Sign Up
              </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-3">
                  {/* First Name Field */}
                  <div className="w-1/2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("firstName")}
                      id="firstName"
                      type="text"
                      className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-1.5"
                    />
                    <p className="text-red-500 text-xs mt-1">{errors.firstName?.message}</p>
                  </div>

                  {/* Last Name Field */}
                  <div className="w-1/2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("lastName")}
                      id="lastName"
                      type="text"
                      className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-1.5"
                    />
                    <p className="text-red-500 text-xs mt-1">{errors.lastName?.message}</p>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="text"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-1.5"
                  />
                  <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber")}
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-1.5"
                  />
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber?.message}</p>
                </div>

                {/* Date of Birth Field */}
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-900">
                    Date of Birth
                  </label>
                  <input
                    {...register("dob")}
                    id="dob"
                    type="date"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-2.5, pr-1.5"
                  />
                  <p className="text-red-500 text-xs mt-1">{errors.dob?.message}</p>
                </div>

                {/*Password Field */}
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-1.5"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
              </div>

                  {/* confirm password */}
                  <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm pl-1.5"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>
              </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="block w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-indigo-600"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </>
      );
    
}
export default Registration;