import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import OrderPage from './pages/OrderPage/OrderPage'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isString } from './utils'
import { jwtDecode } from 'jwt-decode'
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slide/userSlide'
import * as UserService from './services/UserService'

 function App() {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user)
  
  // useEffect(()=>{
  //   fetchApi()
  // },[])
  // const fetchApi =async()=>{
  //   const res = await axios.get(`http://localhost:3001/api/product/get-all`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query',query)
  useEffect(()=>{
    const {storageData,decoded} = handleDecoded()
      
        
        if(decoded?.id){
          handleDetailUser(decoded?.id,storageData)
        }
    
  },[])
  const handleDecoded = ()=>{
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isString(storageData)){
      storageData = JSON.parse(storageData)
      
        decoded = jwtDecode(storageData);
    }
    return {decoded,storageData} 
  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const curTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < curTime.getTime()/1000){
      const data = await UserService.refreashToken()
      config.headers['token'] = `Beare ${data?.access_token}`
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  const handleDetailUser = async(id,token) => {
    const res = await UserService.getDetailUser(id,token)
    dispatch(updateUser({...res?.data,access_token: token}))
  }
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page = route.page
            const checkAdmin = !route.isPrivate || user.isAdmin  
            const Layout = route.header ? DefaultComponent : Fragment
            return(
              <Route key={route.path} path={checkAdmin&&route.path} element={
              <Layout>
                <Page/>
              </Layout>
            } />
            )
          })} 
        </Routes>
      </Router>
    </div>
  )
}
export default App