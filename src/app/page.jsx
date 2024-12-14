'use client'

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { admin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!admin) {
      router.push('/auth/login');
    } else {
      router.push('/packages');
    }
  }, []);

  if (!admin) {
    return null;
  }
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
