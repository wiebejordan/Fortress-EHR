const initialState = {
  newEncounter: {
    patientid: null, 
    encounterdts: '', 
    weight_lbs: '', 
    height_inch: '', 
    systolic_bp: null, 
    diastolic_bp: null, 
    heart_rate: null, 
    respirations_min: null, 
    commenttxt: ''
  }
}

const NEW_ENC = 'NEW_ENC';
const CLEAR_ENC = 'CLEAR_ENC';

export function newEnc(newEncounterObj){
  return {
    type: NEW_ENC,
    payload: newEncounterObj
  }
}

export function clearEnc(){
  return{
    type: CLEAR_ENC,
    payload: {newEncounter: {
      patientid: null, 
      encounterdts: '', 
      weight_lbs: '', 
      height_inch: '', 
      systolic_bp: null, 
      diastolic_bp: null, 
      heart_rate: null, 
      respirations_min: null, 
      commenttxt: ''
    }} 
  }
}

export default function newEncReducer(state= initialState, action){
  const {type, payload} = action;
  switch(type){
    case NEW_ENC:
        return {...state, newEncounter: payload};
    case CLEAR_ENC:
        return {...state, newEncounter: payload};
    default:
        return state;
  }
}