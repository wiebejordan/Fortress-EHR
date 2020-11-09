


const initialState = {
  english: true  
}

const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export function getLang(englishObj){
  return {
    type: CHANGE_LANGUAGE,
    payload: englishObj
  }
}

export default function languageReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
      case CHANGE_LANGUAGE:
        return {...state, english: payload.english};
      default:
          return state;
    }
}