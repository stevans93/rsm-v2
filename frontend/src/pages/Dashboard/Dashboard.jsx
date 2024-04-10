import React, {useEffect, useState} from 'react'

import {BounceLoader} from 'react-spinners'
import DashboardSidebar from '../../components/DashboardComponents/DashboardSidebar/DashboardSidebar.jsx'
import {Outlet} from 'react-router-dom'

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [showGlobalLoader, setShowGlobalLoader] = useState(true)

  useEffect(() => {
    document.body.classList.add('no-before-background')

    // Simulate an API call or any other async operation
    const timeOut = setTimeout(() => {
      setIsLoading(false)
      setShowGlobalLoader(false) // Set to false after loading completes
    }, 1500)

    return () => {
      clearTimeout(timeOut)
      document.body.classList.remove('no-before-background')
    }
  }, [])

  return (
    <>
      {showGlobalLoader && (
        <div className="w-full h-[100vh]">
          <BounceLoader color="#222477" className="spin" />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col md:flex-row bg-[#F0F5F7]">
          <DashboardSidebar />
          <Outlet />
        </div>
      )}
    </>
  )
}

export default Dashboard
