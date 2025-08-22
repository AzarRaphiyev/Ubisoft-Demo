import { Route, Routes } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import Whislist from "./pages/Whislist"

import GameFilter from "./pages/GameFilter"
import Store from "./pages/Store"
import UbisoftPlus from "./pages/UbisoftPlus"
import { ToastContainer } from "react-toastify"
import './css/toast.css';
import Error404 from "./pages/Error404"
import SliderAdmin from "./pages/SliderAdmin"
import AdminLayout from "./layouts/AdminLayout"
import GameAdmin from "./pages/GameAdmin"
import UniverseAdmin from "./pages/UniverseAdmin"
import DlcAdmin from "./pages/DlcAdmin"
import Basket from "./pages/Basket"
import SearchResulte from "./pages/SearchResulte"
import News from "./pages/News"
import NewsAdmin from "./pages/NewsAdmin "
import AdminHome from "./pages/AdminHome"
import AuthorLayout from "./layouts/AuthorLayout"
import UbisoftRegister from "./pages/UbisoftRegister"
import UbisoftLogin from "./pages/UbisoftLogin"
import ProtectedRoute from "./components/ProtectedRoute"
import UbisoftHelp from "./pages/UbisoftHelp"



function App() {
  

  return (
    <main className="">
      <ToastContainer  position="top-right" autoClose={3000} />
     <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="detail/:type/:id" element={<Detail/>}/>
        <Route path="whislist" element={<Whislist/>}/>
        <Route path="cart" element={<Basket/>}/>
        <Route path="allgames" element={<GameFilter/>}/>
        <Route path="store" element={<Store/>}/>
        <Route path="ubisoftplus" element={<UbisoftPlus/>}/>
        <Route path="resulte" element={<SearchResulte/>}/>
        <Route path="news" element={<News/>}/>
        <Route path="help" element={<UbisoftHelp/>}/>
        <Route path="*" element={<Error404/>}/>
      </Route>

      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="slider" element={<SliderAdmin />} />
        <Route path="game" element={<GameAdmin />} />
        <Route path="universe" element={<UniverseAdmin />} />
        <Route path="dlcs" element={<DlcAdmin />} />
        <Route path="news" element={<NewsAdmin />} />
      </Route>

      <Route path="auth" element={<AuthorLayout/>} >
      <Route path="register" element={<UbisoftRegister/>}/>
      <Route path="login" element={<UbisoftLogin/>}/>

      </Route>

     </Routes>
      
    </main>
  )

}

export default App
