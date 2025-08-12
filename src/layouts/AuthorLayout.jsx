import React from 'react'
import { Outlet } from 'react-router'

function AuthorLayout() {
  return (
    <>
     <main className=" ">
        <Outlet/>
    </main>
    </>
  )
}

export default AuthorLayout