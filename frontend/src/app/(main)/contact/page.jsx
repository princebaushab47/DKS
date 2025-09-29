"use client"

import React from 'react'
import { MapPin, Phone, Mail, Clock, MessageSquare, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const contactValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
        .required('Phone is required')
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
    message: Yup.string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters'),
})

const Contact = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: contactValidationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/add`, values);
                console.log(response.data);
                toast.success('Message sent successfully!');
                resetForm();
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'Failed to send message');
            } finally {
                setSubmitting(false);
            }
        }
    });

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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">
                        Have questions about our modular kitchens or services? Get in touch with our team and we'll be happy to help.
                    </p>
                </div>
            </section>

            <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Address</h3>
                                        <p className="text-muted-foreground">Near Chaudhary Restaurant Patel Chowk <br /> Pachpediya Road Basti 272002</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                        <p className="text-muted-foreground"> +91 79059-06043, +91 96281-97888</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                                        <p className="text-muted-foreground">dksmodularkitchen0024@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                        <MessageSquare className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                                        <p className="text-muted-foreground">+91 74080-82218, +91 79059-06043</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Opening Hours</h3>
                                        <p className="text-muted-foreground">Monday - Sunday: 10am - 9pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/share/15wNYPpL1F/" className="bg-primary/10 p-3 rounded-lg text-primary hover:bg-primary/20 transition-colors">
                                    <Facebook className="h-6 w-6" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                                <a href="https://www.instagram.com/dksmodularkitchen0024?igsh=MWd1a3JrdW9hdmtoYg==" className="bg-primary/10 p-3 rounded-lg text-primary hover:bg-primary/20 transition-colors">
                                    <Instagram className="h-6 w-6" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                                <a href="https://youtube.com/@dksmodularkitchenwardrobe0024?si=CbdCog2xLUIYwlzw" className="bg-primary/10 p-3 rounded-lg text-primary hover:bg-primary/20 transition-colors">
                                    <Youtube className="h-6 w-6" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border shadow-sm p-8">
                        <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone</label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Your phone number"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <p className="text-sm text-red-500">{formik.errors.phone}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="How can we help you?"
                                    className="min-h-[150px]"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.message && formik.errors.message && (
                                    <p className="text-sm text-red-500">{formik.errors.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <section className="py-16 bg-muted">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-xl overflow-hidden h-[500px] shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.917403921849!2d82.7379202748915!3d26.81075846446554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990d1b223cfce39%3A0xdc1f9db918469b7a!2sDKS%20MODULAR%20KITCHEN%20%26%20WARDROBE%20SHOWROOM!5e0!3m2!1sen!2sin!4v1748156286716!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
