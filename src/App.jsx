import { Route, Routes } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import Whislist from "./pages/Whislist"
import Cart from "./pages/Cart"



function App() {
  

  return (
    <main >
     <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="detail/:type/:id" element={<Detail/>}/>
        <Route path="whislist" element={<Whislist/>}/>
        <Route path="cart" element={<Cart/>}/>
        
      </Route>
     </Routes>
      
    </main>
  )

}

export default App
