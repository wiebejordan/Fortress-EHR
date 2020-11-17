const initialState = {
  idle: false
}

const IDLE_TRUE = 'IDLE_TRUE';
const IDLE_FALSE = 'IDLE_FALSE';

export function idleTrue(idleObj){
  return {
      type: IDLE_TRUE,
      payload: idleObj
  }
}

export function idleFalse(idleObj){
  return{
      type: IDLE_FALSE,
      payload: idleObj
  }
}

export default function idleReducer(state= initialState, action){
  const {type, payload} = action;
  switch(type){
    case IDLE_TRUE:
        return {...state, idle: payload.idle};
    case IDLE_FALSE:
        return {...state, idle: payload.idle};
    default:
        return state;
  }
}