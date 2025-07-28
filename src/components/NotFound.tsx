
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4 text-gray-700 bg-gradient-to-br from-emerald-50 to-blue-50 ">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
            The page you are looking for does not exist or an error occurred.
        </p>
        <Link
            to="/"
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
            Back to Home
        </Link>
    </div>
  )
}
