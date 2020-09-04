// 文字列定数
export const CHANGE_MAINCOLOR     = 'CHANGE_MAINCOLOR'
export const CHANGE_SUBCOLOR      = 'CHANGE_SUBCOLOR'
export const CHANGE_ACCENTCOLOR   = 'CHANGE_ACCENTCOLOR'
export const CHANGE_TEXTCOLOR     = 'CHANGE_TEXTCOLOR'
export const INITIALIZE_FORM      = 'INITIALIZE_FORM'
export const REQUEST_DATA         = 'REQUEST_DATA'
export const RECEIVE_DATA_SUCCESS = 'RECEIVE_DATA_SUCCESS'
export const RECEIVE_DATA_FAILED  = 'RECEIVE_DATA_FAILED'

// action creaters
export const changeMainColor = (mainColor: string) => ({
  type: CHANGE_MAINCOLOR,
  mainColor,
})
export const changeSubColor = (subColor: string) => ({
  type: CHANGE_SUBCOLOR,
  subColor,
})
export const changeAccentColor = (accentColor: string) => ({
  type: CHANGE_ACCENTCOLOR,
  accentColor,
})
export const changeTextColor = (textColor: string) => ({
  type: CHANGE_TEXTCOLOR,
  textColor,
})
export const initializeForm = () => ({
  type: INITIALIZE_FORM,
})
export const requestData = () => ({
  type: REQUEST_DATA,
})
export const receiveDataSuccess = (colorArray: object) => ({
  type: RECEIVE_DATA_SUCCESS,
  colorArray,
})
export const receiveDataFailed = () => ({
  type: RECEIVE_DATA_FAILED,
})