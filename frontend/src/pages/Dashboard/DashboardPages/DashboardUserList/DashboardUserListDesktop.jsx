import React, {useEffect, useState} from 'react'

import {FaArrowLeft} from 'react-icons/fa'
import {FaArrowRight} from 'react-icons/fa'
import {MdDeleteOutline} from 'react-icons/md'
import SearchUser from '../../../../components/SearchUser/SearchUser'
import UserService from '../../../../services/userService'
import {storeAllUsers} from '../../../../store/usersSlice'
import {useDispatch} from 'react-redux'

function DashboardUserListDesktop({users}) {
  const dispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [totalPages, setTotalPages] = useState()
  const [totalUsers, setTotalUsers] = useState()

  const fetchData = (search) => {
    UserService.getAllUsers(pageNumber, pageSize, search)
      .then((res) => {
        dispatch(storeAllUsers(res.data.users))
        setTotalPages(res.data.totalPages)
        setTotalUsers(res.data.totalUsers)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [pageNumber, pageSize])

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber)
  }

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      handlePageChange(pageNumber - 1)
    }
  }

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      handlePageChange(pageNumber + 1)
    }
  }
  const deleteUser = async (id) => {
    try {
      await UserService.deleteUser(id)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="desktop">
      <div>
        <div className="flex flex-col">
          <h2 className="text-[40px] font-bold mb-[50px]">Koordinatori/Funkcioneri</h2>
        </div>
        <div>
          <SearchUser setPageSize={setPageSize} getData={fetchData} />
        </div>
        <div>
          <div className="mt-[30px] w-[100%] rounded-xl !bg-[#fff] p-2 shadowBorder">
            <table className=" text-start w-[100%] text-[14px]">
              <thead>
                <tr className="text-left p-[50px]">
                  <th className="px-6 py-3 border-r border-b border-[#00000029]">SI</th>
                  <th className="px-6 py-3 border-r border-b border-[#00000029]">Ime</th>
                  <th className="px-6 py-3 border-r border-b border-[#00000029]">Prezime</th>
                  <th className="px-6 py-3 border-r border-b border-[#00000029]">Email</th>
                  <th className="px-6 py-3 border-r border-b border-[#00000029]">Broj Telefona</th>
                  <th className="px-6 py-3 border-r border-b border-[#00000029]">Pozicija</th>
                  <th className="px-6 py-3 border-b border-[#00000029]">Akcija</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr key={user._id} className="">
                      <td className="px-6 py-3 border-r border-b border-[#00000029]">
                        {(pageNumber - 1) * pageSize + (i + 1)}
                      </td>
                      <td className="px-6 py-3 border-r border-b border-[#00000029]">{user.firstName}</td>
                      <td className="px-6 py-3 border-r border-b border-[#00000029]">{user.lastName}</td>
                      <td className="px-6 py-3 border-r border-b border-[#00000029]">{user.email}</td>
                      <td className="px-6 py-3 border-r border-b border-[#00000029]">{user.phone}</td>
                      <td className="px-6 py-3 border-r border-b border-[#00000029]">{user.title}</td>
                      <td className="px-6 py-3 border-b border-[#00000029]">
                        <button
                          className="align-middle text-center ml-5"
                          type="button"
                          onClick={() => {
                            deleteUser(user._id)
                            // setMunicipalityId(municipality._id)
                            // setShowEditModal(true)
                          }}>
                          <MdDeleteOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="flex w-full bg-white justify-between px-4 py-2">
              <div className="flex">
                <span>
                  {users.length} of {totalUsers}
                </span>
              </div>
              <div className="flex justify-center">
                <span>
                  {pageNumber} of {totalPages}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={handlePrevPage}>
                  <FaArrowLeft />
                </button>
                <button onClick={handleNextPage}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardUserListDesktop
