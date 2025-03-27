"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/registrationcontext";

const Logout = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = () => {
    // Clear user data from context
    setUser(null);
    
    // Remove token from local storage
    localStorage.removeItem("accessToken");

    // Redirect to login page
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default Logout;
