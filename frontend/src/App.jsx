import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./common/Navbar";
import { ToastContainer } from 'react-toastify';
import './App.css'



function App() {


  const loc = useLocation()
  const hideNavbarRoutes = ['/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(loc.pathname);

  return (
    <>
      {showNavbar && < NavBar/>}
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </>
  );
}

export default App;
