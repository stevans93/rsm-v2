import 'react-toastify/dist/ReactToastify.css'

import {Outlet, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'

import {BounceLoader} from 'react-spinners'
import Navigation from './components/Navigation/Navigation.jsx'
import axios from 'axios'
import {restoreUser} from './store/userSlice.js'
import {useDispatch} from 'react-redux'

axios.defaults.baseURL = 'https://bgmapi.digitalhousepower.rs/api'
// axios.defaults.baseURL = 'http://localhost:4000/api'

axios.interceptors.request.use((config) => {
  if (localStorage.hasOwnProperty('rsm_token')) {
    config.headers.Authorization = localStorage.getItem('rsm_token')
  }

  return config
})

// axios.interceptors.response.use(undefined, (error) => {
//     console.log(error);
// });

function App() {
  let [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('rsm_user')

    if (user) {
      navigate('/map')
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    dispatch(restoreUser(JSON.parse(localStorage.getItem('rsm_user'))))
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[100vh]">
          <BounceLoader color="#222477" className="spin" />
        </div>
      ) : (
        <div className="flex flex-col h-[100vh]">
          <Navigation />
          <Outlet />
        </div>
      )}
    </>
  )
}

export default App
