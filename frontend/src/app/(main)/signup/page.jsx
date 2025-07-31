"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Mail, Lock, User } from "lucide-react"
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'

const signupValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const Signup = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const { confirmPassword, ...userData } = values;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, userData);
        console.log(response.data);
        toast.success('Account created successfully!');
        resetForm();
        router.push('/login');
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Account creation failed!');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='min-h-screen bg-background'>
      <section className="bg-muted py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Create Your Account</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join DKS to access exclusive offers, track your orders, and save your favorite kitchen designs.
          </p>
        </div>
      </section>

      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-xl border shadow-sm p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base" 
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
