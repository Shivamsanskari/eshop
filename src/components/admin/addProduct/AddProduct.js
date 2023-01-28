import React, { useState } from 'react'
import Card from '../../card/Card';
import styles from './AddProduct.module.scss';

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
]

const AddProducts = () => {

  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: "",
    category: "",
    brand: "",
    desc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({...product, [name]:value });
  };
  const handleImageChange = (e) => {

  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form>

          <label>Product Name:</label>
          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={(e) => handleInputChange(e)} required />

          <label>Product Image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input type="file" accept="" placeholder="Product Image" name="images" onChange={(e) => handleImageChange(e)} />
            <input type="text" name="imageURL" required disabled value={product.imageURL} />
          </Card>

          <label>Product Price:</label>
          <input type="number" name="price" placeholder="Product price" value={product.price} onChange={(e) => handleInputChange(e)} required />

          <label>Product Price:</label>
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

          <button className="--btn --btn-primary">Save Product</button>

        </form>
      </Card>
    </div>
  )
}

export default AddProducts