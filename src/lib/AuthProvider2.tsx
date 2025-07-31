'use client';
import { createContext, useContext, useEffect, useState } from 'react';
// import { Session, User ,AuthChangeEvent} from '@supabase/supabase-js';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
// import { supabase } from './supabase';
import { supabase } from '@/lib/supabaseClient';

// after creating src/lib/index.ts now we can use import { supabase, AuthProvider } from '@/lib';  instead of 
// import { supabase } from '@/lib/supabaseClient';
// import { AuthProvider } from '@/lib/AuthProvider';
// import { supabase, AuthProvider } from '@/lib';

// import { supabase } from '@/lib/supabase'; // only if using alias, otherwise keep './supabase'

// Add useRouter from Next.js for redirection
// import { useRouter } from 'next/navigation';
// ✅ Solution: Prevent redirect loop
// 🔧 Fix: Check current path before redirecting
import { useRouter, usePathname } from 'next/navigation'; // ✅ Add usePathname



type AuthContextType = {
    user: User | null;
    session: Session | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // Add router inside the component
    const router = useRouter();
    const pathname = usePathname(); // ✅ Get current path

    useEffect(() => {
        // Restore session on initial mount
        supabase.auth.getSession().then(({ data: { session } }) => {
        console.log("🔁 Restored session:", session);
        console.log("🙋‍♂️ User:", session?.user);
        setSession(session);
        });


        // Listen for auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
            console.log("🔄 Auth state changed:", _event);
            setSession(session);
        }
        );

        // ✅ 3. Add error handling in getSession
        // const getSession = async () => {
        //     const {
        //         data: { session },
        //         error,
        //     } = await supabase.auth.getSession();

        //     if (error) {
        //         console.error('Error fetching session:', error.message);
        //     }

            // if (session) {
            //     setSession(session);
            //     setUser(session.user);

            //     // ✅ Check if user is admin
            //     const email = session.user?.email;
            //     const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

                
            //     // 🔽 Add the debug logs right here
            //     console.debug("Session user:", session?.user?.email);
            //     console.debug("Is Admin:", isAdmin)

            //     // if (isAdmin) {
            //     //     console.log("🔐 Admin user detected. Redirecting...");
            //     //     router.push('/admin/dashboard');
            //     // }
            //     // 🔧 Fix: Check current path before redirecting
            //     if (isAdmin && pathname !== '/admin/dashboard') {
            //         console.log("🔐 Admin user detected. Redirecting...");
            //         router.push('/admin/dashboard');
            //     }
            // }

        //     if (session && session.user && session.user.email) {
        //         setSession(session);
        //         setUser(session.user);

        //         const email = session.user.email;
        //         const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

        //         console.debug("✅ Valid session found");
        //         console.debug("Session Email:", email);
        //         console.debug("Is Admin:", isAdmin);

        //         if (isAdmin && pathname !== '/admin/dashboard') {
        //             console.log("🔐 Admin user detected. Redirecting...");
        //             router.push('/admin/dashboard');
        //         }
        //     } else {
        //         console.log("🛑 No valid session or user email. Not redirecting.");
        //     }


        //     setLoading(false);
        // };



                const getSession = async () => {
            const {
                data: { session },
                error
            } = await supabase.auth.getSession();

            console.debug("📦 Raw session:", session);

            if (!session || !session.user || !session.user.email) {
                console.log("🛑 No valid session found. Skipping redirect.");
                return;
            }

            const email = session.user.email;
            const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

            console.debug("✅ Valid session");
            console.debug("Email:", email);
            console.debug("Is Admin:", isAdmin);

            // if (isAdmin && router.pathname !== "/admin/dashboard") {
            if (isAdmin && pathname !== "/admin/dashboard") {
                console.log("🔐 Admin login detected. Redirecting to dashboard.");
                router.push("/admin/dashboard");
            }
        };


        // ✅ 2. Add typing to (event, session) callback
        // ✅ Adds clarity and suppresses red squiggles from TypeScript.
        // ✅ 5. Optional: Rename listener to subscription for clarity -data:listner and 1st listener in unsubscribe()
        const { data: subscription } = supabase.auth.onAuthStateChange(
            (_event: AuthChangeEvent, session: Session | null) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        getSession();

        return () => {
            subscription.subscription.unsubscribe();
        };
    },[pathname]);

    return (
        <AuthContext.Provider value={{ user, session, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ 4. Guard useAuth with safety check 
// ✅ Prevents undefined context usage outside provider — clean crash if misused.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

