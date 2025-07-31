'use client'
import { Button } from "@/components/ui/button"
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageContact = () => {
  const [contacts, setContacts] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/contact/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    // Run only on client
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
      fetchContacts();
    }
  }, [authChecked]);

  const handleDelete = async (contactId) => {
    try {
      const response = await fetch(`http://localhost:5000/contact/delete/${contactId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete contact");
      toast.success("Contact deleted successfully");
      setContacts(prev => prev.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  if (!authChecked) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Contacts</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg shadow text-sm md:text-base">
            <thead>
              <tr className="bg-muted">
                <th className="px-2 md:px-4 py-2 text-left">Name</th>
                <th className="px-2 md:px-4 py-2 text-left">Email</th>
                <th className="px-2 md:px-4 py-2 text-left">Phone</th>
                <th className="px-2 md:px-4 py-2 text-left">Message</th>
                <th className="px-2 md:px-4 py-2 text-left">Date</th>
                <th className="px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-muted-foreground">No contacts found.</td>
                </tr>
              ) : (
                contacts.map((contact, idx) => (
                  <tr className="border-b" key={contact._id || idx}>
                    <td className="px-2 md:px-4 py-2">{contact.name}</td>
                    <td className="px-2 md:px-4 py-2">{contact.email}</td>
                    <td className="px-2 md:px-4 py-2">{contact.phone}</td>
                    <td className="px-2 md:px-4 py-2">{contact.message}</td>
                    <td className="px-2 md:px-4 py-2">{contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : ''}</td>
                    <td className="px-2 md:px-4 py-2 flex gap-2 flex-wrap">
                      <Button onClick={() => handleDelete(contact._id)} size="sm" variant="destructive">Delete</Button>
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

export default ManageContact;