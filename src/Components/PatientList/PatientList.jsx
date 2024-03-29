import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {Button} from '@material-ui/core'
import axios from 'axios';
import '../../styles/style.scss'
import Datatable from '../Global/data-table.component'
import {Grid} from '@material-ui/core'



const PatientList = (items, config = null, props) => {
  const [sortConfig, setSortConfig] = useState(config),
    [searchVal, setSearchVal] = useState(""),
    [english, setEnglish] = useState(true),
    [patientList, setPatientList] = useState([]),
    [loading, setLoading] = useState(true),
    user = useSelector(state => state.authReducer),
    lang = useSelector((state) => state.languageReducer.english),
        history = useHistory();
    // console.log(...patientList)
    // console.log(loading)

  useEffect(() => {
   
    getPatients()
  
  }, [])

  useEffect(() => {
    if(!user.user.email){
      history.push('/')}
  })



  const getPatients = () => {
    
    axios.get('/api/patients')

    .then(res => {
      
        setPatientList(res.data) 
        

          setLoading(false)
       
      
    })

  }

  const handleEnglish = () => {
    setEnglish(!english);
  };

  const columns = [
    {
      label: 'Patient ID',
      name: 'patientid',
      options:{
        sortThirdClickReset: true,
      }
    },
    {
      label: 'First Name',
      name: 'firstnm',
      options:{
        sortThirdClickReset: true,
      }
    },
    {
      label: 'Last Name',
      name: 'lastnm',
      options:{
        sortThirdClickReset: true,
      }
    },
    {
      label: 'D.O.B',
      name: 'birthdts',
      options:{
        sortThirdClickReset: true,
      }
    }
  ]

  const options = {
    download: false,
    enableNestedDataAccess: '.',
    onRowClick: (rowData, rowMeta) => {
      const record = patientList[rowMeta.dataIndex].patientid;
      history.push(`/patient/${record}`)
     
    },
    print: false,
    selectableRows: 'none',
    tableBodyHeight: 'auto',
    searchOpen: true,
    viewColumns: false,
  }

  return (
    <div style={{height: '100%', marginBottom: '50px', overflow: 'auto'}}>
      <Grid container direction='column' alignItems='center'>
      <h1>Patient List</h1>
      <Button onClick={() => history.push('/newpatient')} variant='contained' disabled={user.user.canedit === false} style={{margin: '10px'}} children={lang ? 'new patient' : 'nueve paciente'}/>
      <div style={{width: '80%'}}>

      <Datatable data={patientList} columns={columns} options={options}  />
      </div>
      </Grid>
    </div>
  )
}

export default PatientList;