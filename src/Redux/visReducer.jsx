const initialState = {
  vis: 'weight_lbs'
}

const CHANGE_VIS = 'CHANGE_VIS'

export function changeVis(visObj){
  return {
    type: CHANGE_VIS,
    payload: visObj
  }
}

export default function visReducer(state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case CHANGE_VIS:
      return {...state, vis: payload.vis};
    default:
      return state;
  }
}