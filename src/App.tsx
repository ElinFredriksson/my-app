import './App.css';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


//Pages
import Home from './pages/Home';
import AddProductPage from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import { ShoppingCartProvider } from './context/ShoppingCartContext';


function App() {
 
  
  return (
    <>
      <ShoppingCartProvider>
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        
          <Route path="/productdetail/:id" element={<ProductDetail />} />
        


      </Routes>
      </Router>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
