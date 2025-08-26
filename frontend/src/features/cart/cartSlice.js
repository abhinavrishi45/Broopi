import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data.items || [];
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId }) => {
  const res = await axios.post(`${API_URL}/add`, { userId, productId });
  return res.data.items || [];
});

export const updateQuantity = createAsyncThunk("cart/updateQuantity", async ({ userId, productId, action }) => {
  const res = await axios.patch(`${API_URL}/update`, { userId, productId, action });
  return res.data.items || [];
});
export const getOneProductPerCategory = async () => {
  const res = await axios.get(`http://localhost:5000/api/product/allproducts/onepercategory`);
  return res.data;
};
export const getOneProductPerSubcategory = async () => {
  const res = await axios.get(`http://localhost:5000/api/product/allproducts/onepersubcategory`);
  return res.data;
};
export const getProductsByCategory = async (category) => {
  const res = await axios.get(`http://localhost:5000/api/product/allproducts/category/${category}`);
  return res.data;
};
// const removeFromCart = createAsyncThunk("cart/remove", ... )  // optional

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
