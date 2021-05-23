import { IError } from '../../Interfaces'
const UPDATE_ERROR = 'updateError';

export const updateError = (payload: string): IError => ({
    type: UPDATE_ERROR,
    payload: payload
});

type UpdateErrorState = {
    errorText: string
}

const initialState = {
    errorText: ''
}

export default (state: UpdateErrorState = initialState, action: IError): UpdateErrorState => {
    switch (action.type) {
        case UPDATE_ERROR:
            return { ...state, errorText: action.payload }
        default:
            return state
    }

}