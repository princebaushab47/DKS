"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Palette,
  ChevronRight,
  ChevronLeft,
  Award,
  Ruler,
  CuboidIcon as Cube,
  Percent,
  Layers3Icon as Layers3D,
  Pencil,
  Truck,
  Star,
} from "lucide-react"
import { Phone, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorThemeSelector } from "@/components/color-theme-selector"
import { Navbar } from "@/components/navbar"
import Feedback from "@/components/Feedback"

const features = [
  {
    icon: <Award className="h-10 w-10" />,
    title: "Premium Brands",
    description: "We use only the best materials from ebco, Hettich, Everwin and ozone for lasting quality.",
  },
  {
    icon: <Percent className="h-10 w-10" />,
    title: "Acrylic Kitchens",
    description: "Look no further than our acrylic kitchens. We offer a wide range of colors and styles to choose from, and our acrylic kitchens are sure to add a touch of elegance to your home.",
  },
  {
    icon: <Ruler className="h-10 w-10" />,
    title: "Wardrobe and TV Units",
    description: "We offer a wide range of wardrobe and TV units to choose from, and our wardrobe and TV units are sure to add a touch of elegance to your home.",
  },
  {
    icon: <Layers3D className="h-10 w-10" />,
    title: "Free 3D Design Service",
    description: "Visualize your dream kitchen with our complimentary 3D design service.",
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "250+ Colors & Styles",
    description: "Explore our extensive range of colors, finishes, and styles to match your unique taste.",
  },
  {
    icon: <Cube className="h-10 w-10" />,
    title: "10-Year Warranty",
    description: "Enjoy peace of mind with our comprehensive 10-year warranty on all kitchen installations.",
  },
]

const kitchenImages = [
  {
    src: "/p2.jpg",
    alt: "Modern L-shaped kitchen",
    type: "L-shaped",
  },
  {
    src: "/p1.jpg",
    alt: "Elegant U-shaped kitchen",
    type: "U-shaped",
  },
  {
    src: "/p3.jpg",
    alt: "Contemporary kitchen with island",
    type: "Island",
  },
  {
    src: "/p5.jpg",
    alt: "Minimalist galley kitchen",
    type: "Galley",
  },
]

const steps = [
  {
    icon: <Ruler className="h-8 w-8" />,
    title: "Measure",
    description: "We'll help you measure your space accurately to ensure a perfect fit.",
  },
  {
    icon: <Pencil className="h-8 w-8" />,
    title: "Design",
    description: "Our designers will create a custom 3D design based on your preferences.",
  },
  {
    icon: <Layers3D className="h-8 w-8" />,
    title: "Visualize",
    description: "Review your design in 3D and make any adjustments until it's perfect.",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Deliver & Install",
    description: "We'll deliver and install your new kitchen with minimal disruption.",
  },
]


const testimonials = [
  {
    name: "Emma Thompson",
    location: "Manchester",
    quote:
      "DKS transformed our outdated kitchen into a stunning, modern space that's both beautiful and functional. The quality of materials and craftsmanship is exceptional, and the price was much lower than other quotes we received.",
    rating: 5,
  },
  {
    name: "James Wilson",
    location: "Birmingham",
    quote:
      "The free 3D design service was a game-changer for us. Being able to see exactly how our kitchen would look before committing gave us complete confidence. The installation team was professional and efficient.",
    rating: 5,
  },
  {
    name: "Sarah & David Miller",
    location: "London",
    quote:
      "We couldn't be happier with our new kitchen from DKS. The quality is outstanding, and the 20% discount made it incredibly affordable. The team was helpful throughout the entire process.",
    rating: 5,
  },
]

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true)

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/getall`)
        if (!res.ok) throw new Error("Failed to fetch feedback")
        const data = await res.json()
        setFeedbacks(data)
      } catch (err) {
        setFeedbacks([])
      } finally {
        setLoadingFeedbacks(false)
      }
    }
    fetchFeedbacks()
  }, [])

  // Defensive: fallback to 0 if out of bounds
  const safeTestimonialIndex = feedbacks.length > 0 ? (currentIndex % feedbacks.length) : 0;
  const safeGalleryIndex = kitchenImages.length > 0 ? (currentIndex % kitchenImages.length) : 0;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1))
  }

  return (
    <>
      <Navbar />
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
      <div className='min-h-screen bg-background'>

        <section className="relative">
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-10" />
              <img src="/p12.jpg" alt="Modern kitchen design" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="container max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 lg:py-48 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Transform Your Space with Designer Kitchens – For Less.
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
                DKS offers customizable modular kitchens using premium materials from Everwin, Ebco and Symphony. All
                units are delivered ready-made with doors fitted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/about">Explore</Link>
                </Button>
                <Button size="lg" asChild className="border bg-transparent hover:bg-white/20">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Theme Showcase Section */}
        {/* <section className="py-16 md:py-24 bg-primary/5 border-b">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                Personalize Your Experience
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Choose from our collection of beautiful color themes to match your style preferences while browsing our
                kitchen designs.
              </p>
              <div className="flex justify-center">
                <ColorThemeSelector />
              </div>
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose DKS?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine premium quality with affordable prices to deliver exceptional modular kitchens tailored to your
                needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border group hover:border-primary/20 hover:scale-105"
                >
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Kitchen Gallery</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse through our portfolio of stunning kitchen designs that have transformed homes across the country.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-xl border shadow-lg">
                <div className="relative aspect-[4/3]">
                  <img
                    src={kitchenImages[safeGalleryIndex].src || "/placeholder.svg"}
                    alt={kitchenImages[safeGalleryIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
                    <p className="text-xl font-semibold mb-2">{kitchenImages[safeGalleryIndex].alt}</p>
                    <p className="text-sm opacity-90">{kitchenImages[safeGalleryIndex].type} Kitchen</p>
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/gallery">View All Designs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <img src="/p14.jpg" alt="DKS team working on kitchen design" className="rounded-xl shadow-lg" />
                  <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                    <p className="text-3xl font-bold">10+</p>
                    <p className="text-sm">Years Experience</p>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About DKS</h2>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    At Designer Kitchens for Less, we believe that everyone deserves a beautiful, functional kitchen without
                    breaking the bank. Our mission is to provide high-quality modular kitchens at affordable prices without
                    compromising on design or quality.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    With over a decade of experience in the industry, we've perfected the art of combining premium materials
                    with efficient manufacturing processes to deliver exceptional value to our customers.
                  </p>
                </div>
                <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied customers have to say about their experience
                with DKS.
              </p>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="bg-card rounded-xl p-8 shadow-sm border min-h-[250px] flex flex-col justify-center">
                {loadingFeedbacks ? (
                  <div className="text-center text-muted-foreground">Loading feedback...</div>
                ) : feedbacks.length === 0 ? (
                  <div className="text-center text-muted-foreground">No feedback found.</div>
                ) : (
                  <>
                    <div className="flex mb-6">
                      {[...Array(feedbacks[safeTestimonialIndex].rating || 0)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-xl italic mb-8">"{feedbacks[safeTestimonialIndex].message}"</blockquote>
                    <div>
                      <p className="text-lg font-semibold">{feedbacks[safeTestimonialIndex].name || 'Anonymous'}</p>
                      <p className="text-muted-foreground">{feedbacks[safeTestimonialIndex].email}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-center mt-8 gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  disabled={feedbacks.length === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  disabled={feedbacks.length === 0}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Kitchen?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Contact us today to discuss your project, request a free 3D design, or claim your exclusive 20% discount.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link href="/design">Get Free 3D Design</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-6 w-6" />
                <span className="text-lg">01234 567890</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6" />
                <span className="text-lg">info@designerkitchens.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MessageSquare className="h-6 w-6" />
                <span className="text-lg">WhatsApp: 07123 456789</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
