'use client';
import { Button } from "@/components/ui/button"
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useEffect, useState } from "react";

export default function ManageUser() {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    //   console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  const token = localStorage.getItem('user');
  const decoded = jwtDecode(token);
  // console.log(decoded.role);
  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
    if (decoded.role !== 'admin') {
      window.location.href = '/login';
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(prev => prev.filter(user => user._id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg shadow text-sm md:text-base">
            <thead>
              <tr className="bg-muted">
                <th className="px-2 md:px-4 py-2 text-left">Name</th>
                <th className="px-2 md:px-4 py-2 text-left">Email</th>
                <th className="px-2 md:px-4 py-2 text-left">Role</th>
                <th className="px-2 md:px-4 py-2 text-left">Date Joined</th>
                <th className="px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-muted-foreground">No users found.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr className="border-b" key={user._id || idx}>
                    <td className="px-2 md:px-4 py-2">{user.name}</td>
                    <td className="px-2 md:px-4 py-2">{user.email}</td>
                    <td className="px-2 md:px-4 py-2">{user.role}</td>
                    <td className="px-2 md:px-4 py-2">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</td>
                    <td className="px-2 md:px-4 py-2 flex gap-2 flex-wrap">
                      <Button onClick={() => handleDelete(user._id)} size="sm" variant="destructive">Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
