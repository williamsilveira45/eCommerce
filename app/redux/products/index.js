import {PRODUCTS_LOAD} from '../consts';

const initialState = {
  products: [],
};

const Products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOAD: {
      return {
        ...state,
        products: action.products,
      };
    }
    default: {
      return state;
    }
  }
};

export const setProducts = state => ({
  type: PRODUCTS_LOAD,
  products: state,
});

export default Products;
