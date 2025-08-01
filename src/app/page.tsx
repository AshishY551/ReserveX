'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRedirectOnRole } from '@/hooks/useRedirectOnRole';
//  insert icons (Mail, Lock, LogIn, LogOut) from lucide-react
import { Mail, Lock, LogIn, LogOut } from "lucide-react"



export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  //    Add State for Loading and Password Visibility
  // 📍 Below useState declarations, 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useRedirectOnRole();

  // const handleLogin = async () => {
  //   const { error } = await supabase.auth.signInWithPassword({ email, password })
  //   if (error) setMessage(error.message)
  //   else setMessage('Logged in successfully!')
  // }

  // const handleLogout = async () => {
  //   await supabase.auth.signOut()
  //   setMessage('Logged out!')
  // }

  //    Update handleLogin() and handleLogout()
  // 📍 Wrap both with loading state:

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage('Logged in successfully!');
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    setMessage('Logged out!');
  };


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-4">

      <h1 className="text-xl font-bold mb-4">ReserveX Auth Test</h1>

      <div className="relative mb-2">
        <Mail className="absolute left-2 top-2.5 text-gray-500 w-5 h-5" />
        <input
          className="border p-2 pl-8 block w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative mb-2">
        <Lock className="absolute left-2 top-2.5 text-gray-500 w-5 h-5" />
        {/* <input
          type="password"
          className="border p-2 pl-8 block w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}

        {/* 4. Update Password Input to Include Toggle Button */}
        <div className="relative mb-2">
          <Lock className="absolute left-2 top-2.5 text-gray-500 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="border p-2 pl-8 pr-10 block w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2.5 text-gray-500 text-sm"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

      </div>

      {/* Add “Forgot Password?” link */}
      <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4">
        Forgot Password?
      </div>


      <div className="flex gap-2">
        {/* <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Login
        </button> */}
        {/* Update Buttons for Disabled State & Spinner */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <LogIn className="w-4 h-4" />
          )}
          Login
        </button>


        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* <p className="mt-4">{message}</p> */}
       {/* Improve Message Feedback UI */}
      {message && (
        <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
          {message}
        </div>
      )}


      </div>
    </main>

  )

}
