import {NETWORK_STATUS_CONNECT} from '../consts';

const initialState = {
  connected: false,
};

const Network = (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_STATUS_CONNECT: {
      return {
        // State
        ...state,
        // Redux Store
        connected: action.connected,
      };
    }
    default: {
      return state;
    }
  }
};

export const setConnectionStatus = state => ({
  type: NETWORK_STATUS_CONNECT,
  connected: state,
});

export default Network;
