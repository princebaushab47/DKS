import React from 'react'
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare } from "lucide-react"
import Link from 'next/link'

const galleryItems = [
    {
      src: "/p2.jpg",
      alt: "Modern L-shaped kitchen with white cabinets",
      type: "image"
    },
    {
      src: "/VID-20250625-WA0022.mp4",
      alt: "Kitchen design video showcase",
      type: "video"
    },
    {
      src: "/p3.jpg",
      alt: "Traditional U-shaped kitchen with wooden cabinets",
      type: "image"
    },
    {
      src: "/VID-20250625-WA0023.mp4",
      alt: "Modern kitchen installation process",
      type: "video"
    },
    {
      src: "/p5.jpg",
      alt: "Contemporary kitchen with central island",
      type: "image"
    },
    {
      src: "/VID-20250625-WA0025.mp4",
      alt: "Kitchen renovation timelapse",
      type: "video"
    },
    {
      src: "/p6.jpg",
      alt: "Minimalist galley kitchen",
      type: "image"
    },
    {
      src: "/VID-20250625-WA0026.mp4",
      alt: "Kitchen lighting and finishing touches",
      type: "video"
    },
    {
      src: "/p8.jpg",
      alt: "U-shaped kitchen with glass cabinets",
      type: "image"
    },
    {
      src: "/VID-20250625-WA0028.mp4",
      alt: "Kitchen renovation timelapse",
      type: "video"
    },
    {
      src: "/p9.jpg",
      alt: "Island kitchen with pendant lights",
      type: "image"
    },
    {
      src: "/VID-20250815-WA0037.mp4",
      alt: "Kitchen renovation timelapse",
      type: "video"
    },
    {
      src: "/p10.jpg",
      alt: "Galley kitchen with dark cabinets",
      type: "image"
    },
    {
      src: "/VID-20250815-WA0038.mp4",
      alt: "Kitchen renovation timelapse",
      type: "video"
    },
    {
      src: "/VID-20250815-WA0039.mp4",
      alt: "Kitchen renovation timelapse",
      type: "video"
    },
    {
      src: "/VID-20250815-WA0040.mp4",
      alt: "Kitchen renovation timelapse",
      type: "video"
    },
  ]
  

const Gallery = () => {
  return (
    <div className='min-h-screen bg-background'>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/image.png" 
            alt="Kitchen gallery background" 
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Kitchen Gallery</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Browse our portfolio of stunning kitchen designs. Filter by style, layout, and features to find inspiration
            for your dream kitchen.
          </p>
        </div>
      </section>

      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-muted">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    alt={item.alt}
                    autoPlay
                    loop
                    muted
                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    preload="metadata"
                    poster="/placeholder.svg"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  {item.type === "video" && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section>
        
      </section>
    </div>
  )
}

export default Gallery
