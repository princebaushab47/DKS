import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">DKS</h3>
            <p className="text-muted-foreground mb-4">
              Designer Kitchens for Less provides high-quality modular kitchens at affordable prices without
              compromising on design or quality.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/15wNYPpL1F/" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.facebook.com/share/15wNYPpL1F/" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com/@dksmodularkitchenwardrobe0024?si=CbdCog2xLUIYwlzw" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>

            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-muted-foreground hover:text-primary">
                  Free 3D Design
                </p>
              </li>
              <li>
                <p className="text-muted-foreground hover:text-primary">
                  Kitchen Installation
                </p>
              </li>
              <li>
                <p className="text-muted-foreground hover:text-primary">
                  Kitchen Renovation
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">Patel Chowk Pachpediya</p>
              <p className="mb-2">Road Basti, Uttar Pardesh (India) 272002</p>
              <p className="mb-2">Phone:  +91 79059-06043</p>
              <p className="mb-2">Email: dksmodularkitchen0024@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DKS Modular Kitchen. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
