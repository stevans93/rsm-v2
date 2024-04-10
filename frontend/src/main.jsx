import './index.css'

import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import App from './App.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import DashboardCityBelgrade from './pages/Dashboard/DashboardPages/DashboardCityBelgrade/DashboardCityBelgrade.jsx'
import DashboardCityList from './pages/Dashboard/DashboardPages/DashboardCityList/DashboardCityList.jsx'
import DashboardSettings from './pages/Dashboard/DashboardPages/DashboardSettings/DashboardSettings.jsx'
import DashboardUserList from './pages/Dashboard/DashboardPages/DashboardUserList/DashboardUserList.jsx'
import Login from './pages/Login/Login.jsx'
import Map from './pages/Map/Map.jsx'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import store from './store/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/map',
        element: <Map />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        index: true,
        element: <DashboardSettings />
      },
      {
        path: 'userList',
        element: <DashboardUserList />
      },
      {
        path: 'cityList',
        element: <DashboardCityList />
      },
      {
        path: 'cityBelgrade',
        element: <DashboardCityBelgrade />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer />
  </React.StrictMode>
)
