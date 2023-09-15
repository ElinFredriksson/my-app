import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function

export const submitCart = async (cartItems: CartType[]) => {
  try {
    // Generate a random ID for the cart
    const id = uuidv4();

    // Create a reference to the document
    const docRef = doc(db, 'Carts', id);

    // Add data to Firestore
    await setDoc(docRef, { cartItems });

    console.log('Cart items submitted to Firestore!');
  } catch (error) {
    console.error('Error submitting cart:', error);
  }
};

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
        price: Number(newProduct.price),
      };

      try {
        // Generate a random ID
        const id = uuidv4();

        // Create a reference to the document
        const docRef = doc(db, 'Products', id);

        // Add data to Firestore
        await setDoc(docRef, { ...payload, id });

        // Add new product to local state
        setProducts([...products, { ...payload, id }]);

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
      <h2>New Products Added:</h2>
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
