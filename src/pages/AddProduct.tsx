import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Product } from '../Types/Product';


const AddProductPage: React.FC = () => {
  const initialProduct = {
    name: '',
    description: '',
    price: 0,
    imgURL: '',
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState(initialProduct);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.imgURL) {
      const payload = { 
        ...newProduct,
        price: Number(newProduct.price), };

      try {
        // Add the new product to Firestore
        const docRef = await addDoc(collection(db, 'Products'), payload);

        // Add new product to local state
        setProducts([...products, { ...newProduct, id: docRef.id }]);
        // Reset form
        setNewProduct(initialProduct);
      } catch (error) {
        console.error('Error adding product: ', error);
      }
    } else {
      alert('You have to enter ALL the product details!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="imgURL" className="form-label">Image URL:</label>
            <input
              type="text"
              className="form-control"
              id="imgURL"
              name="imgURL"
              value={newProduct.imgURL}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
      <h2>Product List</h2>
      <ul className="list-group mb-5">
        {products.map((product, index) => (
          <li className="list-group-item" key={index}>
            <strong>Name:</strong> {product.name}, <strong>Price:</strong> ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddProductPage;
