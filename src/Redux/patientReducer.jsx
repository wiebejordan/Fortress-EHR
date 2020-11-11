const initialState = {
  patients:   
    [{ id: '1', name: 'Wiebe, Jordan', age: '28', dob: '02/21/1992', gender: 'male', height: "6'6", weight: '165lbs', allergies: 'Avacado', patientHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus bibendum vestibulum. Mauris aliquet nibh vitae erat venenatis commodo. Nulla dapibus lorem vitae nulla vestibulum, et dictum massa tincidunt. In sagittis felis sit amet odio tristique, sed egestas quam sagittis. Curabitur laoreet eros quis mattis euismod. Ut gravida tempus urna, vitae feugiat mi tempor at. Nunc sit amet vehicula leo.', activeProblems: 'fat and sad, zits', medications: 'none'},
    { id: '2', name: 'Wiebe, Cicely', age: '30', dob: '03/16/1990', gender: 'female', height: "6'6", weight: '165lbs', allergies: 'Avacado', patientHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus bibendum vestibulum. Mauris aliquet nibh vitae erat venenatis commodo. Nulla dapibus lorem vitae nulla vestibulum, et dictum massa tincidunt. In sagittis felis sit amet odio tristique, sed egestas quam sagittis. Curabitur laoreet eros quis mattis euismod. Ut gravida tempus urna, vitae feugiat mi tempor at. Nunc sit amet vehicula leo.', activeProblems: 'fat and sad, zits', medications: 'none' },
    { id: '3', name: 'Jeff, Tall', age: '27', dob: '12/12/1993', gender: 'male', height: "6'6", weight: '165lbs', allergies: 'Avacado', patientHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus bibendum vestibulum. Mauris aliquet nibh vitae erat venenatis commodo. Nulla dapibus lorem vitae nulla vestibulum, et dictum massa tincidunt. In sagittis felis sit amet odio tristique, sed egestas quam sagittis. Curabitur laoreet eros quis mattis euismod. Ut gravida tempus urna, vitae feugiat mi tempor at. Nunc sit amet vehicula leo.', activeProblems: 'fat and sad, zits', medications: 'none' },
    { id: '4', name: 'Tillman, Daniel', age: '28', dob: '12/12/1992', height: "6'6", weight: '165lbs', gender: 'male', allergies: 'Avacado', patientHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus bibendum vestibulum. Mauris aliquet nibh vitae erat venenatis commodo. Nulla dapibus lorem vitae nulla vestibulum, et dictum massa tincidunt. In sagittis felis sit amet odio tristique, sed egestas quam sagittis. Curabitur laoreet eros quis mattis euismod. Ut gravida tempus urna, vitae feugiat mi tempor at. Nunc sit amet vehicula leo.', activeProblems: 'fat and sad, zits', medications: 'none' },
    { id: '5', name: 'Trump, Donald', age: '78', dob: '12/12/1950', gender: 'male', height: "6'6", weight: '165lbs', allergies: 'Avacado', patientHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus bibendum vestibulum. Mauris aliquet nibh vitae erat venenatis commodo. Nulla dapibus lorem vitae nulla vestibulum, et dictum massa tincidunt. In sagittis felis sit amet odio tristique, sed egestas quam sagittis. Curabitur laoreet eros quis mattis euismod. Ut gravida tempus urna, vitae feugiat mi tempor at. Nunc sit amet vehicula leo.', activeProblems: 'fat and sad, zits', medications: 'none' },
    { id: '6', name: 'Smith, Mike ', age: '45', dob: '05/25/1974', gender: 'male', height: "6'6", weight: '165lbs', allergies: 'Avacado', patientHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus bibendum vestibulum. Mauris aliquet nibh vitae erat venenatis commodo. Nulla dapibus lorem vitae nulla vestibulum, et dictum massa tincidunt. In sagittis felis sit amet odio tristique, sed egestas quam sagittis. Curabitur laoreet eros quis mattis euismod. Ut gravida tempus urna, vitae feugiat mi tempor at. Nunc sit amet vehicula leo.', activeProblems: 'fat and sad, zits', medications: 'none' },
    { id: '7', name: 'Doe, John', age: '99', dob: '11/11/1921', gender: 'male', height: "6'6", weight: '165lbs', allergies: 'Avacado', patientHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus bibendum vestibulum. Mauris aliquet nibh vitae erat venenatis commodo. Nulla dapibus lorem vitae nulla vestibulum, et dictum massa tincidunt. In sagittis felis sit amet odio tristique, sed egestas quam sagittis. Curabitur laoreet eros quis mattis euismod. Ut gravida tempus urna, vitae feugiat mi tempor at. Nunc sit amet vehicula leo.', activeProblems: 'fat and sad, zits', medications: 'none'}]
    
  
}

const GET_PATIENT = 'GET_PATIENT';

export function getPatient(patientObj){
  return {
    type: GET_PATIENT,
    payload: patientObj
  }
}

export default function patientReducer(state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case GET_PATIENT:
        return {...state, patients: payload};
    default:
        return state;
  }
}