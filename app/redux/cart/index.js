import {CART_ADD_PRODUCT, CART_REMOVE_PRODUCT} from '../consts';

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

export default Cart;
