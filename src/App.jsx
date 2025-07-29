import { Route, Routes } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"



function App() {
  

  return (
    <main >
     <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        
      </Route>
     </Routes>
      
    </main>
  )

}

export default App
