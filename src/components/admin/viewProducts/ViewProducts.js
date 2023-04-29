import { collection, onSnapshot, orderBy, query, doc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';
import { deleteObject, ref } from 'firebase/storage';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from './ViewProducts.module.scss';
import Notiflix from 'notiflix';

import { useDispatch } from 'react-redux';
import { STORE_PRODUCT } from '../../../redux/slice/productSlice';


const ViewProducts = () => {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
    setProducts([]); // Here i am setting the products to blank to prevent memory leaks...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");

      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        // console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        
        dispatch(
          STORE_PRODUCT({
            products: allProducts
          })
          )

      });
    }
    catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete product',
      'Are you sure to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("product not deleted");
      },
      {
        width: '320px',
        borderRadius: '3px',
        cssAnimationStyle: 'zoom',
        titleColor: '#fa6464',
        okButtonBackground: '#ed4c4c',
        cancelButtonBackground: '#7a7a7a',
      },
    );
  }

  const deleteProduct = async(id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully");
    }
    catch(error){
      toast.error(error.message);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No Product found.</p>
        ) : (
          <table >
            <thead>
              <tr>
                <th>S/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product, index) => {
                  const { id, name, price, imageURL, category } = product;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td><img src={imageURL} alt={name} style={{ width: "100px" }} /></td>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>{`${price} Rs.`}</td>
                      <td className={styles.icons}>
                        <Link to={`/admin/add-product/${id}`}>
                          <FaEdit size={20} color="green" />
                        </Link>
                        &nbsp;
                        <FaTrashAlt size={20} color="red" onClick={()=> confirmDelete(id, imageURL)} />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default ViewProducts