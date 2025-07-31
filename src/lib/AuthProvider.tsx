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

    useEffect(() => {
        // const getSession = async () => {
        //     const {
        //         data: { session },
        //         error,
        //     } = await supabase.auth.getSession();
        //     if (session) {
        //         setSession(session);
        //         setUser(session.user);
        //     }
        //     setLoading(false);
        // };
        // ✅ 3. Add error handling in getSession
        const getSession = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error('Error fetching session:', error.message);
            }

            if (session) {
                setSession(session);
                setUser(session.user);
            }

            setLoading(false);
        };


        // const { data: listener } = supabase.auth.onAuthStateChange(
        //     async (event, session) => {
        //         setSession(session);
        //         setUser(session?.user ?? null);
        //     }
        // );

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
    }, []);

    return (
        <AuthContext.Provider value={{ user, session, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext);
// ✅ 4. Guard useAuth with safety check 
// ✅ Prevents undefined context usage outside provider — clean crash if misused.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

