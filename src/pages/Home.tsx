
import db from '../firebase';

// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

import { Product } from '../Types/Product';



const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Products"), (snapshot) => {
      const productData: Product[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        console.log("DATA",data);
        return data as Product;
      });
      setProducts(productData);
    });

    return () => unsubscribe(); // Unsubscribe from the listener when the component is unmounting
  }, []);
  console.log(products);

  return (
    <div className="App">
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={index.toString()}
          product={product}
          
        />
      ))}
    </div>
  </div>
  )
}

export default Home