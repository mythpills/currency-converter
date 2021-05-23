import { ILoading } from '../../Interfaces'
const SHOW_LOADING = 'showLoading';
const HIDE_LOADING = 'hideLoading';

export const showLoading = (): ILoading => ({
  type: SHOW_LOADING
});
export const hideLoading = (): ILoading => ({
  type: HIDE_LOADING
});

type IsLoadingState = {
  isLoading: boolean
}

const initialState = {
  isLoading: false
}

export default (state: IsLoadingState = initialState, action: ILoading): IsLoadingState => {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, isLoading: true }
    case HIDE_LOADING:
      return { ...state, isLoading: false }
    default:
      return state
  }

}