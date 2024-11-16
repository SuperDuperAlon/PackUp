import React from 'react'
import { useRouter } from 'next/navigation'
const RouteButton = ({ content, linkedRoute }) => {
    const router = useRouter()
    return (
        <>
            <button onClick={() => router.push(`${linkedRoute}`)}>{content}</button>
        </>
    )
}

export default RouteButton