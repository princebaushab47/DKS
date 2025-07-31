"use client";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button } from "@/components/ui/button"

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [authChecked, setAuthChecked] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:5000/feedback/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch feedback");
      const data = await response.json();
      setFeedbacks(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  }

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

  useEffect(() => {
    if (authChecked) {
      fetchFeedbacks();
    }
  }, [authChecked]);

  const handleDelete = async (feedbackId) => {
    try {
      const response = await fetch(`http://localhost:5000/feedback/delete/${feedbackId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete feedback");
      setFeedbacks(prev => prev.filter(feedback => feedback._id !== feedbackId));
      console.log("Feedback deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  }

  if (!authChecked) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Feedback</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg shadow text-sm md:text-base">
            <thead>
              <tr className="bg-muted">
                <th className="px-2 md:px-4 py-2 text-left">Name</th>
                <th className="px-2 md:px-4 py-2 text-left">Email</th>
                <th className="px-2 md:px-4 py-2 text-left">Message</th>
                <th className="px-2 md:px-4 py-2 text-left">Rating</th>
                <th className="px-2 md:px-4 py-2 text-left">Date</th>
                <th className="px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-muted-foreground">No feedback found.</td>
                </tr>
              ) : (
                feedbacks.map((feedback, idx) => (
                  <tr className="border-b" key={feedback._id || idx}>
                    <td className="px-2 md:px-4 py-2">{feedback.name}</td>
                    <td className="px-2 md:px-4 py-2">{feedback.email}</td>
                    <td className="px-2 md:px-4 py-2">{feedback.message}</td>
                    <td className="px-2 md:px-4 py-2">{feedback.rating}</td>
                    <td className="px-2 md:px-4 py-2">{feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : ''}</td>
                    <td className="px-2 md:px-4 py-2 flex gap-2 flex-wrap">
                      <Button onClick={() => handleDelete(feedback._id)} size="sm" variant="destructive">Delete</Button>
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

export default ManageFeedback;