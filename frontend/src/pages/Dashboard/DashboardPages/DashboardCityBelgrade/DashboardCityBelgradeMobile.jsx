import {FaRegEdit, FaRegUserCircle} from 'react-icons/fa'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import React, {useEffect, useState} from 'react'

import {BsThreeDotsVertical} from 'react-icons/bs'
import DashboardSettingsInfoEdit from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsInfo/DashboardSettingsInfoEdit'
import MunicipalityService from '../../../../services/municipalityService'
import SearchCity from '../../../../components/SearchCity/SearchCity'
import {useDispatch} from 'react-redux'

function DashboardCityBelgradeMobile() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [belgradeMunicipalities, setBelgradeMunicipalities] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [reLoad, setReLoad] = useState(false)

  const [municipalityId, setMunicipalityId] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [totalMunicipalities, setTotalMunicipalities] = useState(0)
  const perPage = 12

  useEffect(() => {
    MunicipalityService.allMunicipalities(currentPage, perPage, 'Grad Beograd')
      .then((res) => {
        setBelgradeMunicipalities(res.data.municipalities)
        setTotalPages(res.data.totalPages)
        setTotalMunicipalities(res.data.totalMunicipalities)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [dispatch, currentPage, perPage, reLoad])
  return (
    <div className="mobile">
      <div className="flex flex-col w-full">
        <div className="justify-between flex flex-col md:flax-row md:items-center mb-[50px]">
          <h2 className="text-[30px] pb-3  font-bold">Beogradske Opštine</h2>
          <SearchCity />
        </div>
        <div>
          <div className="overflow-scroll">
            <table className="text-start overflow-scroll shadowBorder w-[100%] text-[14px]">
              <thead>
                <tr className="text-left bg-[#F0F5F7] p-[50px] border-b-2 border-main">
                  <th className="px-6 py-6">Okrug</th>
                  <th className="px-6 py-6">Grad/Opština</th>
                  <th className="px-6 py-6">Gradonačelnik/predsednik opštine</th>
                  <th className="px-6 py-6">Slika</th>
                  <th className="px-6 py-6">Akcija</th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {belgradeMunicipalities.map((municipality) => {
                  return (
                    <tr key={municipality._id} className="bg-[#fff] border-b-2 border-main p-[50px]">
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
                      <td className="text-main px-6 py-3 text-center text-[20px]">
                        <button
                          type="button"
                          onClick={() => {
                            setMunicipalityId(municipality._id)
                            setShowEditModal(true)
                          }}>
                          <FaRegEdit />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="w-full">
                  <td className="w-full" colSpan="3">
                    <div className="flex justify-between px-4 py-2">
                      <div className="flex">
                        <span>
                          {belgradeMunicipalities?.length} of {totalMunicipalities}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <span>
                          {currentPage} of {totalPages}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                          <IoIosArrowBack />
                        </button>
                        <button
                          onClick={() => {
                            if (currentPage === totalPages || totalPages === 0) return
                            setCurrentPage((prev) => Math.max(prev + 1, totalPages))
                          }}>
                          <IoIosArrowForward />
                        </button>
                      </div>
                    </div>
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

export default DashboardCityBelgradeMobile
