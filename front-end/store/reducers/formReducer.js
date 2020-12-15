import * as types from '../types';

const initialState = {
    nombre: '',
    rut: '',
    correo: '',
    celular: '',
    sueldo: '',
    ahorro: '',
}

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FORM_DATA:
            return {
                ...state,

            }

        default:
            return state
    }
}