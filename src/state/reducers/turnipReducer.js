import {
  FETCH_TURNIPS_FAILURE,
  FETCH_TURNIPS_START,
  FETCH_TURNIPS_SUCCESS,
  FETCH_TURNIP_BY_ID_FAILURE,
  FETCH_TURNIP_BY_ID_START,
  FETCH_TURNIP_BY_ID_SUCCESS,
  POST_TURNIP_FAILURE,
  POST_TURNIP_START,
	POST_TURNIP_SUCCESS,
	DELETE_TURNIP_FAILURE,
  DELETE_TURNIP_START,
	DELETE_TURNIP_SUCCESS
} from '../types';

const initialState = {
	data: [],
	dataById: {},
	fetchingData: false,
	isLoading: false,
	turnipAdded: false,
	isDeleting: false,
	turnipDeleted: false,
	error: ''
};

const turnipReducer = (state = initialState, action) => {
  switch (action.type) {
		case FETCH_TURNIPS_START: {
			return {
				...state,
				fetchingData: true,
				isLoading: true
			};
		}
		case FETCH_TURNIPS_SUCCESS: {
			return {
				...state,
				fetchingData: false,
				isLoading: false,
				data: action.payload
			};
		}
		case FETCH_TURNIPS_FAILURE: {
			return {
				...state,
				fetchingData: false,
				isLoading: false,
				error: action.payload
			};
		}
		case FETCH_TURNIP_BY_ID_START: {
			return {
				...state,
				fetchingData: true,
				isLoading: true
			};
		}
		case FETCH_TURNIP_BY_ID_SUCCESS: {
			return {
				...state,
				fetchingData: false,
				isLoading: false,
				dataById: action.payload
			};
		}
		case FETCH_TURNIP_BY_ID_FAILURE: {
			return {
				...state,
				fetchingData: false,
				isLoading: false,
				error: action.payload
			};
		}
		case POST_TURNIP_START: {
			return {
				...state,
				fetchingData: true,
				isLoading: true
			};
		}
		case POST_TURNIP_SUCCESS: {
			return {
				...state,
				fetchingData: false,
				isLoading: false,
				turnipAdded: true
			};
		}
		case POST_TURNIP_FAILURE: {
			return {
				...state,
				fetchingData: false,
        isLoading: false,
				error: action.payload
			};
		}
		case DELETE_TURNIP_START: {
			return {
				...state,
				isDeleting: true,
				turnipDeleted: false
			};
		}
		case DELETE_TURNIP_SUCCESS: {
			return {
				...state,
				dataById: action.payload,
				isDeleting: false,
				turnipDeleted: true
			};
		}
		case DELETE_TURNIP_FAILURE: {
			return {
				...state,
				isDeleting: false,
				turnipDeleted: false,
				error: action.payload
			};
		}
    default:
      return state;
  }
};
export default turnipReducer;