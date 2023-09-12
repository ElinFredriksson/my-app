import { useState, useEffect } from 'react';
import { collection, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import db from '../firebase';
import { Product } from '../Types/Product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Products"), (snapshot) => {
      const productData: Product[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return { ...data, id: doc.id } as Product; //  includes the document ID
      });
      setProducts(productData);
    });

    return () => unsubscribe();
  }, []);

  return products;
}
