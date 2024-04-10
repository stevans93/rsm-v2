import {FaRegEdit, FaRegUserCircle} from 'react-icons/fa'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import React, {useEffect, useState} from 'react'

import {BsThreeDotsVertical} from 'react-icons/bs'
import DashboardSettingsInfoEdit from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsInfo/DashboardSettingsInfoEdit'
import MunicipalityService from '../../../../services/municipalityService'
import SearchCity from '../../../../components/SearchCity/SearchCity'
import {useDispatch} from 'react-redux'

function DashboardCityBelgradeDesktop({municipalities2}) {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [belgradeMunicipalities, setBelgradeMunicipalities] = useState([])
  const [reLoad, setReLoad] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [municipalityId, setMunicipalityId] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const perPage = 12

  useEffect(() => {
    MunicipalityService.allMunicipalities(currentPage, perPage, 'Grad Beograd')
      .then((res) => {
        console.log(res.data)
        setBelgradeMunicipalities(res.data.municipalities)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [dispatch, currentPage, perPage, reLoad])

  return (
    <div className="desktop">
      <div className="table-responsive">
        <div className="flex justify-between items-center mb-[50px]">
          <h2 className="text-[40px] font-bold">Beogradske Opštine</h2>
          <SearchCity />
        </div>
        <div>
          <div>
            <table className="text-start shadowBorder w-[100%] text-[14px]">
              <thead>
                <tr className="text-left bg-[#F0F5F7] p-[50px] border-b-2 border-main">
                  <th className="px-6 py-6">Okrug</th>
                  <th className="px-6 py-6">Grad/Opština</th>
                  <th className="px-6 py-6">Gradonačelnik/Predsednik opštine</th>
                  <th className="px-6 py-6">Slika</th>
                  <th className="px-6 py-6">Akcija</th>
                </tr>
              </thead>
              <tbody>
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
                <tr className="align-middle">
                  <td className="px-6 py-6">Rows per page: {perPage}</td>
                  <td className="px-6 py-6 text-center" colSpan="3">
                    {belgradeMunicipalities.length === 0 ? `0 of 0` : `${currentPage} of ${totalPages}`}
                  </td>
                  <td className="flex it px-6 py-6 align-middle">
                    <IoIosArrowBack
                      className="text-[22px]"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    />
                    <IoIosArrowForward
                      className="text-[22px]"
                      onClick={() => {
                        if (currentPage === totalPages || totalPages === 0) return
                        setCurrentPage((prev) => Math.max(prev + 1, totalPages))
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

export default DashboardCityBelgradeDesktop
