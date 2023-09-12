import './App.css';

import Navbar from './components/Navbar';
import HeroImage from './components/Hero';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// import { product } from './data';

//Pages
import Home from './pages/Home';
import AddProductPage from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';


function App() {
 
  
  return (
    <>
    <Router>
      <Navbar />
      <HeroImage/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        
          <Route path="/productdetail/:id" element={<ProductDetail />} />
        


      </Routes>
      </Router>
    </>
  );
}

export default App;
