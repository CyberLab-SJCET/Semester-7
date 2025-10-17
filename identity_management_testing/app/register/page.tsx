'use client';
import Link from 'next/link';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <RegisterForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Important Information</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500 text-center">
                By creating an account, you agree to our terms and conditions. Your account will need to be approved by an administrator.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Background */}
      <div className="hidden lg:flex relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center p-8">
          <div className="max-w-2xl text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Lab Management System</h2>
            <ul className="mt-6 space-y-4 text-lg">
              <li className="flex items-center justify-center">
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Book lab resources efficiently
              </li>
              <li className="flex items-center justify-center">
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Track equipment and maintenance
              </li>
              <li className="flex items-center justify-center">
                <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Real-time availability updates
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}