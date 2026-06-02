'use client';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/Admin/users?email=admin_@gmail.com');
      const data = await res.json();

      if (res.ok && data.success) {
        setUsers(data.users);
      } else {
        toast.error('Access denied');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      toast.error('Something went wrong!');
    }
  };

  const confirmDelete = (userId) => {
    setSelectedUserId(userId);
    setShowConfirm(true);
  };

  const deleteUser = async () => {
    try {
      const res = await fetch(`/api/Admin/users/${selectedUserId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setUsers(users.filter((u) => u._id !== selectedUserId));
        toast.success('User deleted successfully');
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error('Something went wrong');
    } finally {
      setShowConfirm(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="p-6 mt-20">
      {/* Page Title */}
      <div className="flex items-center space-x-2 mb-6">
        <MdPeople className="text-3xl text-[#2e8b57]" />
        <h1 className="text-3xl font-bold text-[#2e8b57]">All Users</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-[#2e8b57] to-[#4caf50] text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-green-50 transition-colors"
              >
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 flex items-center gap-1 mx-auto"
                    onClick={() => confirmDelete(user._id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transparent Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={deleteUser}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedUserId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
