import React, {useEffect, useState} from 'react'

import {BounceLoader} from 'react-spinners'
import DashboardCityListDesktop from './DashboardCityListDesktop'
import DashboardCityListMobile from './DashboardCityListMobile'
import {useSelector} from 'react-redux'

function DashboardCityList() {
  const [isLoading, setIsLoading] = useState(true)
  const {municipalities} = useSelector((state) => state.municipalityStore)
  const [reLoad, setReLoad] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [municipalities])

  return (
    <div className="lg:w-[100%] sm:ml-[30%] md:ml-[40%] lg:ml-[20%]">
      {isLoading ? (
        <div className="w-[60vw] h-[100vh] m-auto">
          <BounceLoader color="#222477" className="spin" />
        </div>
      ) : (
        <div>
          <div className="mt-[30px] mx-[50px]">
            <DashboardCityListDesktop municipalities={municipalities} setReLoad={setReLoad} />
          </div>
          <div>
            <DashboardCityListMobile municipalities={municipalities} setReLoad={setReLoad} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardCityList
