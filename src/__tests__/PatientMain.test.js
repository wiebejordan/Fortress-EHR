import React from 'react';
import {act, render, cleanup} from '@testing-library/react';
import PatientMain from '../Components/Patient/PatientMain/PatientMain';
import {MemoryRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import mockedAxios from 'axios';
import { Provider } from 'react-redux';
import {store} from '../Redux/store';
import patient from '../Components/Patient/PatientMain/PatientMain'

afterEach(cleanup);

// it('makes an axios get call for patient info', async () => { 
//   const pat = patient[0];
//   let container;
//   jest
//       .spyOn(mockedAxios, 'get')
//       .mockImplementation(() => Promise.resolve({data}));
  
  
  
// })