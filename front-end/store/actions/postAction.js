import * as types from '../types';
import axios from 'axios';

export const fetchposts = () => async dispatch => {
    const res = await axios.get('https://apvbackendmanager.azurewebsites.net/ApvSimulacion/obtenerporid?id=7');
    console.log(res);
    dispatch({
        type: types.GET_POSTS,
        payload:res.data
    });
}