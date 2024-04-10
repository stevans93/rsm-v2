import {FaRegEdit, FaRegUserCircle} from 'react-icons/fa'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import React, {useEffect, useState} from 'react'

import {BsThreeDotsVertical} from 'react-icons/bs'
import DashboardSettingsInfoEdit from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsInfo/DashboardSettingsInfoEdit'
import {MdDeleteOutline} from 'react-icons/md'
import MunicipalityService from '../../../../services/municipalityService'
import SearchCity from '../../../../components/SearchCity/SearchCity'
import {storeAllMunicipalities} from '../../../../store/municipalitySlice'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'

function DashboardCityListDesktop({municipalities}) {
  const dispatch = useDispatch()
  const {totalPages} = useSelector((state) => state.municipalityStore)
  const [currentPage, setCurrentPage] = useState(1)
  const [showEditModal, setShowEditModal] = useState(false)
  const [municipalityId, setMunicipalityId] = useState('')
  const [reLoad, setReLoad] = useState(false)
  const [search, setSearch] = useState('')
  const perPage = 10

  useEffect(() => {
    MunicipalityService.allMunicipalities(currentPage, perPage, '', search, 'Grad Beograd')
      .then((res) => {
        dispatch(storeAllMunicipalities(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [dispatch, currentPage, perPage, reLoad, search])
  const deleteMunicipality = async (id) => {
    try {
      await MunicipalityService.deleteMunicipalities(id)
      setReLoad((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="desktop relative">
      <div className="table-responsive">
        <div className="flex justify-between items-center mb-[50px]">
          <h2 className="text-[40px] font-bold">Gradovi/Opštine</h2>
          <SearchCity setSearch={setSearch} />
        </div>
        <div>
          <div>
            <table className="text-start shadowBorder w-full table-auto text-[14px]">
              <thead>
                <tr className="text-left  bg-[#F0F5F7] p-[50px] border-b-2 border-main">
                  <th className="px-6 py-6">Okrug</th>
                  <th className="px-6 py-6">Grad/Opština</th>
                  <th className="px-6 py-6">Gradonačelnik/Predsednik opštine</th>
                  <th className="px-6 py-6">Slika</th>
                  <th className="px-6 py-6">Akcija</th>
                </tr>
              </thead>
              <tbody>
                {municipalities.map((municipality) => {
                  return (
                    <tr key={municipality._id} className="bg-[#fff]  border-b-2 border-main p-[50px]">
                      <td className="px-6 py-3">{municipality.district}</td>
                      <td className="px-6 py-3">{municipality.municipality}</td>
                      <td className="px-6 py-3">{municipality.fullNameOfThePresident}</td>
                      <td className="px-6 py-3">
                        {municipality.image ? (
                          <img
                            src={import.meta.env.VITE_IMAGE_URL + `${municipality.image}`}
                            alt={municipality.fullNameOfThePresident}
                            className="w-[40px] h-[40px]"
                          />
                        ) : (
                          <FaRegUserCircle size={32} />
                        )}
                      </td>
                      <td className="text-main text-lg flex gap-3 px-6 py-3">
                        {/* here goes edit */}
                        <button
                          type="button"
                          onClick={() => {
                            setMunicipalityId(municipality._id)
                            setShowEditModal(true)
                          }}>
                          <FaRegEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteMunicipality(municipality._id)
                            // setMunicipalityId(municipality._id)
                            // setShowEditModal(true)
                          }}>
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="align-middle">
                  <td className="px-6 py-6">Rows per page: {perPage}</td>
                  <td className="px-6 py-6 text-center" colSpan="3">
                    {municipalities.length === 0 ? `0 of 0` : `${currentPage} of ${totalPages}`}
                  </td>
                  <td className="flex px-6 py-6 align-middle">
                    <IoIosArrowBack
                      className="text-[22px]"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    />
                    <IoIosArrowForward
                      className="text-[22px]"
                      onClick={() => {
                        if (currentPage === totalPages || totalPages === 0) return
                        setCurrentPage((prev) => prev + 1)
                      }}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {showEditModal ? (
        <div className="mx-auto absolute top-0 right-[50%] translate-x-[50%]">
          <DashboardSettingsInfoEdit
            showCloseBtn={true}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            municipalityId={municipalityId}
            setReLoad={setReLoad}
          />
        </div>
      ) : null}
    </div>
  )
}

export default DashboardCityListDesktop
