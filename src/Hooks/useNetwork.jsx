import React, { useState } from "react";

export default function useNetwork() {

    let [isOnline, setIsonline] = useState(true);

    window.addEventListener('online', function () {
        setIsonline(true)
        console.log('online');
    })

    window.addEventListener('offline', function () {
        setIsonline(false)
        console.log('offline');
    })


    return (
        <div>useNetwork</div>
    )
}