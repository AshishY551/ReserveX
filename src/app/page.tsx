'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRedirectOnRole } from '@/hooks/useRedirectOnRole';


export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  useRedirectOnRole();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Logged in successfully!')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setMessage('Logged out!')
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">ReserveX Auth Test</h1>
      <input
        className="border p-2 mb-2 block"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 mb-2 block"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
      >
        Login
      </button>
      <button
        onClick={handleLogout}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      <p className="mt-4">{message}</p>
    </main>
  )
}
