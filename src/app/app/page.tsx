'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRedirectOnRole } from '@/hooks/useRedirectOnRole';

export default function HomePage() {
  useRedirectOnRole();
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [msg, setMsg] = useState('');

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) setMsg(error.message);
    else setMsg('Logged in successfully!');
  };

  return (
    <main className="p-4">
      <h2>ReserveX – Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full"/>
      <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} className="border p-2 w-full"/>
      <button onClick={login} className="mt-2 bg-blue-600 text-white p-2">Login</button>
      <p>{msg}</p>
      <a href="/auth/signup" className="underline mt-2 block">Sign up</a>
    </main>
  );
}
