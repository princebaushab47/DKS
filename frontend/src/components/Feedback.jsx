'use client'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"

export default function Feedback({ onSubmit }) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [nameToSend, setNameToSend] = useState("")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('user')
      if (token) {
        try {
          const decoded = jwtDecode(token)
          setNameToSend(decoded.name || "")
          setIsLoggedIn(true)
        } catch (e) {
          setIsLoggedIn(false)
        }
      } else {
        setIsLoggedIn(false)
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      const res = await fetch("http://localhost:5000/feedback/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameToSend, email, message, rating }),
      })
      if (!res.ok) throw new Error("Failed to submit feedback")
      toast.success("Feedback submitted successfully!")
      setSuccess(true)
      setEmail("")
      setMessage("")
      setRating(5)
      if (onSubmit) onSubmit()
    } catch (err) {
      setError(err.message || "Something went wrong")
      console.error("Error submitting feedback:", err)
      toast.error("Failed to submit feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow text-center">
        <h2 className="text-xl font-bold mb-2">Leave Feedback</h2>
        <p className="text-red-600 font-medium">You need to login to give feedback.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-card p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Leave Feedback</h2>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Your email"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Message</label>
        <Textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          placeholder="Your feedback"
          rows={4}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Rating</label>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              className="focus:outline-none"
            >
              <Star
                className={`h-7 w-7 transition-colors ${(hoverRating || rating) >= star
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-muted text-muted-foreground'
                  }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">{rating} / 5</span>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
      {success && <div className="text-green-600 text-sm">Thank you for your feedback!</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  )
}
