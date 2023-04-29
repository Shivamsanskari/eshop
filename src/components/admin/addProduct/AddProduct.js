import React, { useRef, useState } from 'react'
import Card from '../../card/Card';
import styles from './AddProduct.module.scss';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import Loader from '../../loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';


const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
]

const initialState = {
  name: "",
  imageURL: "",
  price: "",
  category: "",
  brand: "",
  desc: "",
};
const AddProducts = () => {
  const {productId} = useParams();
  // console.log(productId);

  const aRef = useRef(null);
  const [product, setProduct] = useState({...initialState});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();


  function detectForm(productId,f1,f2){
    if(productId === "ADD"){
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const storage = getStorage();
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.floor(progress));
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );

  };

  const addProduct = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Add a new document with a generated id.
      await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now()
      });
      setIsLoading(false);
      toast.success("Product added successfully");
      setUploadProgress(0);
      aRef.current.value = null;
      setProduct({...initialState});
      navigate('/admin/all-products/');
    }
    catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(productId,"Add New Product","Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>

            <label>Product Name:</label>
            <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={(e) => handleInputChange(e)} required />

            <label>Product Image:</label>
            <Card cardClass={styles.group}>

              {uploadProgress === 0 ? null :
                <div className={styles.progress}>
                  <div className={styles["progress-bar"]} style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100 ? `${uploadProgress}%` : `${uploadProgress}% Done`}
                  </div>
                </div>
              }

              <input type="file" accept="" placeholder="Product Image" name="images" ref={aRef} onChange={(e) => handleImageChange(e)} />

              {product.imageURL === "" ? null : <input type="text" name="imageURL" required disabled placeholder={product.imageURL} value={product.imageURL} />}

            </Card>

            <label>Product Price:</label>
            <input type="text" name="price" placeholder="Product price" value={product.price} onChange={(e) => handleInputChange(e)} required />

            <label>Product Category:</label>
            <select name="category" required value={product.category} onChange={(e) => handleInputChange(e)}>
              <option value="" disabled>-- Choose Product Category --</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>{category.name}</option>
                )
              })}
            </select>

            <label>Product Company/Brand:</label>
            <input type="text" name="brand" placeholder="Product brand" value={product.brand} onChange={(e) => handleInputChange(e)} required />

            <label>Product Description</label>
            <textarea
              name="desc"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>

            <button className="--btn --btn-primary">{detectForm(productId,"Save Product","Edit Product")}</button>

          </form>
        </Card>
      </div>
    </>
  )
}

export default AddProducts