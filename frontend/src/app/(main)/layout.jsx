'use client'
import { useState } from "react"
import Feedback from "@/components/feedback"
import { Navbar } from "@/components/navbar"
import { MessageSquare } from "lucide-react"
import { Toaster } from "react-hot-toast"

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      <Toaster/>
      <Navbar />
      {/* Feedback Floating Button and Dialog */}
      <div>
        {/* Floating Button */}
        <button
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-primary/90 transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open feedback dialog"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
        {/* Dialog Overlay */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-end">
            <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
            <div className="relative m-6 w-full max-w-md">
              <div className="bg-card rounded-xl shadow-xl p-0">
                <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b">
                  <h2 className="text-lg font-bold">Leave Feedback</h2>
                  <button
                    className="text-muted-foreground hover:text-primary text-xl font-bold"
                    onClick={() => setOpen(false)}
                    aria-label="Close feedback dialog"
                  >
                    ×
                  </button>
                </div>
                <div className="p-6">
                  <Feedback onSubmit={() => setOpen(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Main Content */}
      {children}
    </div>
  )
}
