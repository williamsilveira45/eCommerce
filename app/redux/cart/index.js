import {CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, CART_CLEAR} from '../consts';

const initialState = {
  products: [],
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.product],
      };
    }
    case CART_REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(function (doc, key) {
          return key !== action.index;
        }),
      };
    }
    case CART_CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const addProduct = state => ({
  type: CART_ADD_PRODUCT,
  product: state,
});

export const removeProduct = state => ({
  type: CART_REMOVE_PRODUCT,
  index: state,
});

export const clearCart = () => ({
  type: CART_CLEAR,
});

export default Cart;
