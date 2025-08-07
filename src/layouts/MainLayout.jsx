import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


function MainLayout() {
  return (
    <>
    <Header/>
    <main className="bg-gradient-to-b from-[#0E0D0E] via-[#150C15] to-[#0F131E] ">
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default MainLayout