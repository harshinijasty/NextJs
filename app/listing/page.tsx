"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
// import Footer from "@/components/footer"; // Import the Footer component

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const UserListing = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data.data); // Store users in state
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Open Modal with User Data
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    }
  };

  // Save Changes (Send POST request to API to update user)
  const handleSave = async () => {
    if (selectedUser) {
      try {
        // Send POST request to API to update the user
        const response = await fetch(`https://reqres.in/api/users`, {
          method: "POST", // Use "POST" for updating existing user
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedUser),
        });

        if (!response.ok) throw new Error("Failed to update user");

        // Update the users state with the modified user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? selectedUser : user
          )
        );

        setShowModal(false); // Close modal after save
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <>
    <div className="container mx-auto p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">User Listing</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[300px] bg-white border border-gray-200 shadow-md rounded-md text-sm">
            <thead>
              <tr className="bg-gray-100">  
                <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Avatar</th>
                <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-2 py-1 text-left text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-2.5 py-1">{user.id}</td>
                    <td className="px-2.5 py-1">
                      <Image
                        src={user.avatar}
                        alt={user.first_name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </td>
                    <td className="px-2.5 py-1">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="px-2.5 py-1">{user.email}</td>
                    <td className="px-2.5 py-1">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="px-2.5 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      )} 
    </div>


{/* Modal for Editing User */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-md font-bold mb-4">Edit User</h2>

            <div className="space-y-2">
              <label className="block">
                <span className="text-gray-700 text-xs">First Name</span>
                <input
                  type="text"
                  name="first_name"
                  value={selectedUser.first_name}
                  onChange={handleInputChange}
                  className="w-full border p-1.5 rounded text-xs mt-1"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs">Last Name</span>
                <input
                  type="text"
                  name="last_name"
                  value={selectedUser.last_name}
                  onChange={handleInputChange}
                  className="w-full border p-1.5 rounded text-xs mt-1"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs">Email</span>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                  className="w-full border p-1.5 rounded text-xs mt-1"
                />
              </label>
            </div>

            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded-md text-xs hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    {/* Adding Footer here */}
    {/* <Footer /> */}
    </>
  );
};

export default UserListing;
