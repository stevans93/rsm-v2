import React, {useEffect, useState} from 'react'

import {BounceLoader} from 'react-spinners'
import DashboardSettingsDesktop from './DashboardSettingsDesktop'
import DashboardSettingsMobile from './DashboardSettingsMobile'

function DashboardSettings() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <div className="lg:w-[100%] sm:ml-[30%] md:ml-[40%] lg:ml-[20%]">
      {isLoading ? (
        <div className="w-[60vw] h-[100vh] m-auto">
          <BounceLoader color="#222477" className="spin" />
        </div>
      ) : (
        <div>
          <div className="mt-[30px] mx-[50px] lg:h-[100svh]">
            <DashboardSettingsDesktop />
          </div>
          <div>
            <DashboardSettingsMobile />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardSettings
