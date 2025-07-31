'use client'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';


export default function AdminDashboard() {

  const [contacts, setContacts] = useState(0)
  const [feedback, setFeedback] = useState(0)
  const [user, setUser] = useState(0)


  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:5000/contact/getall');
    // console.log(res.data);
    setContacts(res.data.length);
  }
  const fetchFeedbacks = async () => {
    const res = await axios.get('http://localhost:5000/feedback/getall');
    // console.log(res.data);
    setFeedback(res.data.length);
  }
  const fetchuser = async () => {
    const res = await axios.get('http://localhost:5000/user/getall');
    // console.log(res.data);
    setUser(res.data.length);
  }

  const token = localStorage.getItem('user');
  // console.log(decoded.role);
  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') {
      window.location.href = '/login';
    }
  }, [token]);



  useEffect(() => {
    fetchContacts();
    fetchFeedbacks();
    fetchuser();
  }, []);



  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar is now handled by layout */}
      <main className="flex-1 p-4 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 border border-gray-400">
          <div className="bg-card rounded-lg p-4 md:p-6 shadow">
            <h2 className="text-base md:text-lg font-semibold mb-2">Total Contacts</h2>
            <p className="text-2xl md:text-3xl font-bold">{contacts}</p>
          </div>
          <div className="bg-card rounded-lg p-4 md:p-6 shadow">
            <h2 className="text-base md:text-lg font-semibold mb-2">Total Feedback</h2>
            <p className="text-2xl md:text-3xl font-bold">{feedback}</p>
          </div>
          <div className="bg-card rounded-lg p-4 md:p-6 shadow">
            <h2 className="text-base md:text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-2xl md:text-3xl font-bold">{user}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
