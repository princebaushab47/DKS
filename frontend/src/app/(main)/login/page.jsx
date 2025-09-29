"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Mail, Lock } from "lucide-react"
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AppContext } from '@/contexts/appcontext'
import { jwtDecode } from 'jwt-decode'

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

const Login = () => {
  const router = useRouter();
  const { setUser } = React.useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, values);
        const userData = response.data;
        // console.log('Login successful:', userData);
        localStorage.setItem('user', userData.token);
        setUser(userData);
        const decodedUser = jwtDecode(userData.token);
        toast.success('Login successful!');
        if(decodedUser.role === 'admin'){
          router.push('/admin/dashboard');
        }
        else{
          router.push('/');
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Welcome Back</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Sign in to your DKS account to access your saved designs, track orders, and manage your profile.
          </p>
        </div>
      </section>

      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-xl border shadow-sm p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base" 
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 