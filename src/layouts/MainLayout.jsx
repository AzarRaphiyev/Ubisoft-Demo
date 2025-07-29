import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


function MainLayout() {
  return (
    <>
    <Header/>
    <main className="bg-[#0D0D0D] ">
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default MainLayout