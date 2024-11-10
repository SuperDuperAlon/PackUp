'use client'

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      router.push('/packages');
    }
  }, []);

  return (
    <>
      <div className='homepage_view'>
        <div className="homepage_content">
          PackUp
        </div>
      </div>
    </>
  )
}
