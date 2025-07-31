'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
    user: User | null;
    session: Session | null;
    role: string | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    role: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();
    const redirected = useRef(false);

    useEffect(() => {
        let mounted = true;

        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!mounted) return;

            if (session) {
                setSession(session);
                setUser(session.user);

                // ✅ Fetch role from Supabase profiles table
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                if (profile?.role) {
                    setRole(profile.role);
                    console.log("🎭 Role from DB:", profile.role);
                } else {
                    console.warn("⚠️ Role not found or error:", error?.message);
                }
            }

            setLoading(false);
        };

        // ✅ Auth listener
        const { data: subscription } = supabase.auth.onAuthStateChange(
            async (event: AuthChangeEvent, session: Session | null) => {
                if (!mounted) return;

                console.log("🔄 Auth event:", event);
                setSession(session);
                setUser(session?.user ?? null);

                // Fetch role again on login
                if (session?.user) {
                    const { data: profile, error } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', session.user.id)
                        .single();

                    if (profile?.role) {
                        setRole(profile.role);
                        console.log("🎭 Role from DB:", profile.role);

                        // ✅ Redirect if admin logs in
                        if (
                            event === 'SIGNED_IN' &&
                            profile.role === 'admin' &&
                            !redirected.current &&
                            pathname !== '/admin/dashboard'
                        ) {
                            console.log("🔐 Admin detected. Redirecting...");
                            redirected.current = true;
                            router.push('/admin/dashboard');
                        }
                    }
                }
            }
        );

        getSession();

        return () => {
            mounted = false;
            subscription.subscription.unsubscribe();
        };
    }, [pathname, router]);

    return (
        <AuthContext.Provider value={{ user, session, role, loading }}>
            {loading ? <div className="p-4">Loading session...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
