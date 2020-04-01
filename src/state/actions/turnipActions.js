import axiosWithAuth from '../../utils/axiosWithAuth';
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

// ============ GET ALL TURNIPS ===========

export const getTurnips = () => dispatch => {
	dispatch({ type: FETCH_TURNIPS_START });
	axiosWithAuth()
		.get('/turnips')
		.then(res => {
			dispatch({ type: FETCH_TURNIPS_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: FETCH_TURNIPS_FAILURE, payload: err.response });
		});
};

// ============ GET TURNIP BY ID ===========

export const getTurnipById = reviewId => dispatch => {
	dispatch({ type: FETCH_TURNIP_BY_ID_START });
	return axiosWithAuth()
		.get(`/reviews/${reviewId}`)
		.then(res => {
			dispatch({ type: FETCH_TURNIP_BY_ID_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: FETCH_TURNIP_BY_ID_FAILURE, payload: err.response });
		});
};

// ============ POST TURNIP PRICE ===========

export const postTurnip = (villagerId, newTurnip) => dispatch => {
	dispatch({ type: POST_TURNIP_START });
	return axiosWithAuth()
		.post(`/villagers/${villagerId}/add-turnip-price`, newTurnip)
		.then(res => {
			dispatch({ type: POST_TURNIP_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: POST_TURNIP_FAILURE, payload: err.response });
		});
};

// ============ DELETE TURNIP PRICE ===========

export const deleteTurnip = (villagerId, turnipId) => dispatch => {
	dispatch({ type: DELETE_TURNIP_START });
	return axiosWithAuth()
		.delete(`/villagers/${villagerId}/turnips/${turnipId}`)
		.then(res => {
			dispatch({ type: DELETE_TURNIP_SUCCESS, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: DELETE_TURNIP_FAILURE, payload: err });
		});
};