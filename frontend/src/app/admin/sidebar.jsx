'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppContext } from "@/contexts/appcontext"
import { jwtDecode } from "jwt-decode"

const navLinks = [
	{ href: "/admin/dashboard", label: "Dashboard" },
	{ href: "/admin/manage-contact", label: "Manage Contacts" },
	{ href: "/admin/manage-feedback", label: "Manage Feedback" },
	{ href: "/admin/manage-user", label: "Manage User" },
]

const Sidebar = () => {
	const router = useRouter()
	const { logout } = useContext(AppContext)
	const [open, setOpen] = useState(false)
	const [name, setName] = useState(null)

	const handleLogout = () => {
		logout()
		router.push('/')
	}



	useEffect(() => {
		const token = localStorage.getItem('user')
	if(token){
		const decoded = jwtDecode(token)
		setName(decoded.name)
	}}, [])

	return (
		<>
			{/* Mobile Hamburger */}
			<button
				className="md:hidden fixed top-4 left-4 z-40 p-2 rounded bg-background border border-border shadow"
				onClick={() => setOpen(!open)}
				aria-label="Open sidebar"
			>
				<svg
					className="h-6 w-6 text-foreground"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
			{/* Sidebar */}
			<aside
				className={`fixed md:static z-30 top-0 left-0 h-full w-64 bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border flex flex-col p-6 transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
					} md:translate-x-0`}
				style={{ minHeight: "100vh" }}
			>
				<div className="mb-8 flex items-center justify-between md:block">
					<div>
						<h2 className="text-2xl font-bold mb-2">Admin Panel</h2>
						<p className="text-sm text-muted-foreground">
							Welcome, {name || "Admin"}
						</p>
					</div>
					<button
						className="md:hidden p-1 rounded hover:bg-muted"
						onClick={() => setOpen(false)}
						aria-label="Close sidebar"
					>
						<svg
							className="h-6 w-6 text-foreground"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<nav className="flex flex-col gap-2 flex-1">
					{navLinks.map((link) => (
						<Button
							asChild
							variant="ghost"
							className="justify-start w-full"
							key={link.href}
							onClick={() => setOpen(false)}
						>
							<Link href={link.href}>{link.label}</Link>
						</Button>
					))}
				</nav>
				<div className="mt-8">
					<Button onClick={handleLogout} variant="outline" className="w-full">
						Logout
					</Button>
				</div>
			</aside>
			{/* Overlay for mobile */}
			{open && (
				<div
					className="fixed inset-0 bg-black/30 z-20 md:hidden"
					onClick={() => setOpen(false)}
					aria-label="Close sidebar overlay"
				/>
			)}
		</>
	)
}

export default Sidebar
