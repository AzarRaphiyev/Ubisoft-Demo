import { Route, Routes } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import Whislist from "./pages/Whislist"
import Cart from "./pages/Cart"
import GameFilter from "./pages/GameFilter"
import Store from "./pages/Store"
import UbisoftPlus from "./pages/UbisoftPlus"



function App() {
  

  return (
    <main className="bg-gradient-to-b from-[#0E0D0E] via-[#150C15] to-[#0F131E] pb-[30px]">
     <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="detail/:type/:id" element={<Detail/>}/>
        <Route path="whislist" element={<Whislist/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="allgames" element={<GameFilter/>}/>
        <Route path="store" element={<Store/>}/>
        <Route path="ubisoftplus" element={<UbisoftPlus/>}/>
        
      </Route>
     </Routes>
      
    </main>
  )

}

export default App
