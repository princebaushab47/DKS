'use client'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [authChecked, setAuthChecked] = useState(false);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        window.location.href = '/login';
        return;
      }
      setAuthChecked(true);
    } catch (err) {
      window.location.href = '/login';
    }
  }, []);

  // Fetch dashboard data after auth
  useEffect(() => {
    if (!authChecked) return;
    const fetchData = async () => {
      try {
        const [contactsRes, feedbackRes, usersRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact/getall`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/feedback/getall`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`),
        ]);
        setContacts(contactsRes.data.length);
        setFeedback(feedbackRes.data.length);
        setUserCount(usersRes.data.length);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchData();
  }, [authChecked]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
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
            <p className="text-2xl md:text-3xl font-bold">{userCount}</p>
          </div>
        </div>
      </main>
    </div>
  );
}