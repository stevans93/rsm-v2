import React, {useEffect, useState} from 'react'

import {BounceLoader} from 'react-spinners'
import DashboardUserListDesktop from './DashboardUserListDesktop'
import DashboardUserListMobile from './DashboardUserListMobile'
import {useSelector} from 'react-redux'

function DashboardUserList() {
  const [isLoading, setIsLoading] = useState(true)
  const {users} = useSelector((state) => state.usersStore)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [users])

  return (
    <div className="lg:w-[100%] sm:ml-[30%] md:ml-[40%] lg:ml-[20%]">
      {isLoading ? (
        <div className="w-[60vw] h-[100vh] m-auto">
          <BounceLoader color="#222477" className="spin" />
        </div>
      ) : (
        <div>
          <div className="mt-[30px] mx-[50px]">
            <DashboardUserListDesktop users={users} />
          </div>
          <div className="w-full">
            <DashboardUserListMobile users={users} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardUserList
