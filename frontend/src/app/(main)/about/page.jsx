import React from 'react'
import { Phone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const About = () => {
  return (
    <div className='min-h-screen bg-background'>
      <section className="bg-muted py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About DKS</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about our mission to provide high-quality modular kitchens, TV Units and Wardrobe at affordable prices without compromising on
            design or quality.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  DKS (Designer Kitchens for Less) was founded in 2010 with a simple mission: to make high-quality designer
                  kitchens accessible to everyone without the premium price tag.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our founder, with over 15 years of experience in the kitchen industry, recognized that many homeowners
                  were paying excessive prices for modular kitchens due to high markups and unnecessary middlemen.
                </p>
                <p className="text-lg text-muted-foreground">
                  By streamlining our processes, working directly with manufacturers, and focusing on efficient operations,
                  we've been able to offer the same premium quality at prices up to 40% lower than our competitors.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src="/p11.jpg" alt="DKS founder in the showroom" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/p6.jpg"
                alt="DKS team working on kitchen design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  At DKS, we believe that everyone deserves a beautiful, functional kitchen without breaking the bank. Our
                  mission is to democratize access to high-quality modular kitchens by offering premium designs at
                  affordable prices.
                </p>
                <p className="text-lg text-muted-foreground">
                  We're committed to transparency, quality, and customer satisfaction. We use only the best materials from
                  trusted brands like Symphony, Hettich, and Ebco, and back our kitchens with a comprehensive 10-year
                  warranty.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our team of experienced designers works closely with each customer to create personalized kitchen
                  solutions that meet their unique needs, preferences, and budget.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              These core values guide everything we do at DKS, from design to installation and customer service.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-semibold mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on materials or craftsmanship. Every kitchen we design and install meets our
                  rigorous quality standards.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-semibold mb-4">Affordability</h3>
                <p className="text-muted-foreground">
                  We believe that high-quality design shouldn't come with a premium price tag. We work efficiently to keep
                  costs down without sacrificing quality.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-semibold mb-4">Customer Focus</h3>
                <p className="text-muted-foreground">
                  We listen to our customers' needs and preferences, providing personalized solutions and exceptional
                  service at every step.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Meet the experienced professionals who make DKS the trusted choice for modular kitchens.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["Mr. Shubham Singh", "Mr. Prince Singh"].map((index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square rounded-xl overflow-hidden mb-6 max-w-[200px] mx-auto shadow-lg">
                    <img
                      src={`/placeholder.svg?height=200&width=200`}
                      alt={`Team member ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{index}</h3>
                  <p className="text-muted-foreground">
                    {index === 1
                      ? "Founder & Lead Designer"
                      : index === 2
                        ? "Senior Kitchen Designer"
                        : index === 3
                          ? "Installation Manager"
                          : "Customer Service Manager"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-16 md:py-24 bg-primary text-primary-foreground">
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
      </section> */}
    </div>
  )
}

export default About
