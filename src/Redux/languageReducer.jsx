


const initialState = {
  english: false
}

const GET_LANG = 'GET_LANG'

export function getLang(englishObj){
  return {
    type: GET_LANG,
    payload: englishObj
  }
}

export default function languageReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
      case GET_LANG:
        return {...state, english: payload};
      
      default:
          return state;
    }
}