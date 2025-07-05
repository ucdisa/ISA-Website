"use client"

import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter()

    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
        }
    }

    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/home`
            }
        })
        console.log(data, error)
    }

    if (!session) {
      return (
        <div>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button onClick={signOut}>Sign out</button>
          <p>Logged in as {session.user.email}</p>
        </div>
      )
  }
}
