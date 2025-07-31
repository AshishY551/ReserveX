'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState(''); const [pw, setPw] = useState('');
  const [msg, setMsg] = useState(''); const router = useRouter();

  const submit = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password: pw });
    if (error) return setMsg(error.message);
    setMsg('Registration successful, please login.');
    router.push('/');
  };

  return (
    <main className="p-4">
      <h2>Sign Up</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full"/>
      <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} className="border p-2 w-full"/>
      <button onClick={submit} className="mt-2 bg-green-600 text-white p-2">Sign Up</button>
      <p>{msg}</p>
    </main>
  );
}
