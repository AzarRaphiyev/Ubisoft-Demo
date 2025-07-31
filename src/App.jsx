import { Route, Routes } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Detail from "./pages/Detail"



function App() {
  

  return (
    <main >
     <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="games/:id" element={<Detail/>}/>
        
      </Route>
     </Routes>
      
    </main>
  )

}

export default App
