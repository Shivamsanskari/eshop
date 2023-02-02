import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products:[]
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCT(state,action){
        // console.log(action.payload);
        state.products = action.payload.products;
    }
  }
});

export const {STORE_PRODUCT} = productSlice.actions

export const selectedProduct = (state) => state.product.products;

export default productSlice.reducer