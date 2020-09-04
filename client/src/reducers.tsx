import { combineReducers } from 'redux'
import { CHANGE_MAINCOLOR, CHANGE_SUBCOLOR, CHANGE_ACCENTCOLOR, CHANGE_TEXTCOLOR,  INITIALIZE_FORM, REQUEST_DATA, RECEIVE_DATA_SUCCESS, RECEIVE_DATA_FAILED } from './actions'

const initialState = {
    form: {  // AddFormに入力されている文字列
      mainColor: '',
      subColor: '',
      accentColor: '',
      textColor: '',
    },
    colors: {
      isFetching: false,  // サーバーから色のリストを取ってきている最中かどうか
      colorArray: [],  // 色のデータを入れるArray
    },
}

const formReducer = (state = initialState.form, action: { type: any; mainColor: any; subColor: any; accentColor: any; textColor: any }) => {
    switch (action.type) {
        case CHANGE_MAINCOLOR:
            return {
                ...state,
                mainColor: action.mainColor,
            }
        case CHANGE_SUBCOLOR:
            return {
                ...state,
                subColor: action.subColor,
            }
        case CHANGE_ACCENTCOLOR:
            return {
                ...state,
                accentColor: action.accentColor,
            }
        case CHANGE_TEXTCOLOR:
            return {
                ...state,
                textColor: action.textColor,
            }
        case INITIALIZE_FORM:
            return initialState.form// 初期状態を返す
        default:
            return state
    }
}

const colorsReducer = (state = initialState.colors, action: { type: any; colorArray: any }) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                colorArray: action.colorArray,
            }
        case RECEIVE_DATA_FAILED:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
        }
}

const rootReducer = combineReducers({
    form: formReducer,
    colors: colorsReducer,
})

export default rootReducer