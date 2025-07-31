import React from 'react'
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare } from "lucide-react"
import Link from 'next/link'

const galleryItems = [
    {
      src: "/p2.jpg",
      alt: "Modern L-shaped kitchen with white cabinets",
      title: "Modern White L-shaped Kitchen",
      categories: ["L-shaped", "Modern", "Handleless"],
    },
    {
      src: "/p3.jpg",
      alt: "Traditional U-shaped kitchen with wooden cabinets",
      title: "Traditional Wooden U-shaped Kitchen",
      categories: ["U-shaped", "Traditional"],
    },
    {
      src: "/p5.jpg",
      alt: "Contemporary kitchen with central island",
      title: "Contemporary Island Kitchen",
      categories: ["Island", "Modern"],
    },
    {
      src: "/p6.jpg",
      alt: "Minimalist galley kitchen",
      title: "Minimalist Galley Kitchen",
      categories: ["Galley", "Modern", "Handleless"],
    },
    {
      src: "/p7.jpg",
      alt: "L-shaped kitchen with breakfast bar",
      title: "L-shaped Kitchen with Breakfast Bar",
      categories: ["L-shaped", "Modern"],
    },
    {
      src: "/p8.jpg",
      alt: "U-shaped kitchen with glass cabinets",
      title: "U-shaped Kitchen with Glass Cabinets",
      categories: ["U-shaped", "Traditional"],
    },
    {
      src: "/p9.jpg",
      alt: "Island kitchen with pendant lights",
      title: "Island Kitchen with Pendant Lights",
      categories: ["Island", "Modern"],
    },
    {
      src: "/p10.jpg",
      alt: "Galley kitchen with dark cabinets",
      title: "Galley Kitchen with Dark Cabinets",
      categories: ["Galley", "Modern"],
    },
  ]
  

const Gallery = () => {
  return (
    <div className='min-h-screen bg-background'>
      <section className="bg-muted py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kitchen Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our portfolio of stunning kitchen designs. Filter by style, layout, and features to find inspiration
            for your dream kitchen.
          </p>
        </div>
      </section>

      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-semibold text-xl mb-3">{item.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.categories.map((category, catIndex) => (
                      <span key={catIndex} className="text-sm bg-white/20 text-white px-3 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Kitchen?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to discuss your project, request a free 3D design, or claim your exclusive 20% discount.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button asChild size="lg" variant="secondary">
              <Link href="/design">Get Free 3D Design</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground hover:bg-primary-foreground/20"
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
  )
}

export default Gallery
