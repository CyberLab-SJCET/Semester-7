'use client';
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right side - Background */}
      <div className="hidden lg:flex relative w-0 flex-1 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-2xl text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Lab Management System</h2>
            <p className="text-lg opacity-90">
              Streamline your laboratory operations with our comprehensive management system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}