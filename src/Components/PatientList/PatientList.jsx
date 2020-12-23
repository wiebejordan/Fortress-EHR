import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {  Dimmer, Loader, Input, Segment } from "semantic-ui-react";
import axios from 'axios';
import '../../styles/style.scss'



const useSortableData = (items, config = null, props) => {
  const [sortConfig, setSortConfig] = useState(config),
    [searchVal, setSearchVal] = useState(""),
    [english, setEnglish] = useState(true),
    [patientList, setPatientList] = useState([]),
    [loading, setLoading] = useState(true);
    // console.log(...patientList)
    // console.log(loading)

  useEffect(() => {
    console.log('patient list has been called')
    getPatients()
  
  }, [])


  


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

  const handleSearch = (e) => {
    setSearchVal(e);
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...patientList];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return {
    items: sortedItems,
    requestSort,
    sortConfig,
    handleSearch,
    searchVal,
    patientList,
    english,
    handleEnglish,
    loading
  };
};

const ProductTable = (patientList, props) => {
  const {
    items,
    requestSort,
    sortConfig,
    handleSearch,
    searchVal,
    english,
    handleEnglish,
    loading
  } = useSortableData(patientList);
  

  const state = useSelector(state => state.languageReducer),
        user = useSelector(state => state.authReducer),
        history = useHistory();
  
  
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  
  return (
    <div className='patientlist-container'>
      
      <div className='searchbar-container'>
        {state.english === true ? (
          <div className='patientlist-header'>
            <div className='newpatient-btn'>
            <Link to='/newpatient'>
              <button disabled={user.user.canedit === false}>New Patient</button>
              </Link>
            </div>
            
            <div className='searchbar'>
            <h4>Search:</h4>
            <input
              name="searchVal"
              value={searchVal}
              placeholder="search by name, DOB, patient #"
              onChange={(e) => handleSearch(e.target.value)}
            />
            </div>
          </div>
        ) : (
          <div className='patientlist-header'>
            <div className='newpatient-btn'>
              <Link to='/newpatient'>
              <button disabled={user.user.canedit === false}>Nueva Paciente</button>
              </Link>
              </div>
            
              <div className='searchbar'>
            <h4>Buscar:</h4>
            <input
              name="searchVal"
              value={searchVal}
              placeholder="buscar por nombre, edad..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          </div>
        )}
      </div>

      {state.english === true ? (
      <>
      <h1>Patient List</h1>

      <div className='patient-table-container' >
      
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("patientid")}
                className={getClassNamesFor("patientid")}
              >
                Patient ID
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("lastnm")}
                className={getClassNamesFor("lastnm")}
              >
                Name
              </button>
            </th>
            {/* <th>
              <button
                type="button"
                onClick={() => requestSort("age")}
                className={getClassNamesFor("age")}
              >
                Age
              </button>
            </th> */}
            <th>
              <button
                type="button"
                onClick={() => requestSort("birthdts")}
                className={getClassNamesFor("birthdts")}
              >
                D.O.B.
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
           ? 
           <div className='loader-container'>
           
             <Loader size='massive' active />
           
          </div> 
          : 
          <>
          {items
            .filter((item) => {
              let objString = JSON.stringify(item);
              return objString.toLowerCase().includes(searchVal.toLowerCase());
            })
            .map((item) => (
              <tr key={item.patientid}>
                <td>{item.patientid}</td>
                <Link style={{textDecoration: 'none'}} to={`/patient/${item.patientid}`}>
             <td className='patient-name'>{item.lastnm}, {item.firstnm}</td>
                </Link>
                {/* <td>{item.age}</td> */}
                <td>{item.birthdts.substr(0, 10)}</td>
              </tr>
            ))}
            </>
          }
        </tbody>
      </table>
      </div>
      </>)
    : (
      <>
      <h1>Lista de Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("patientid")}
                className={getClassNamesFor("patientid")}
              >
                Paciente ID
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("lastnm")}
                className={getClassNamesFor("lastnm")}
              >
                Nombre
              </button>
            </th>
            {/* <th>
              <button
                type="button"
                onClick={() => requestSort("age")}
                className={getClassNamesFor("age")}
              >
                Años
              </button>
            </th> */}
            <th>
              <button
                type="button"
                onClick={() => requestSort("birthdts")}
                className={getClassNamesFor("birthdts")}
              >
                D.O.B.
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? <div className='loader-container'>
           
           <Loader size='massive' active />
         
        </div>  :
          <>
          {items
            .filter((item) => {
              let objString = JSON.stringify(item);
              return objString.toLowerCase().includes(searchVal.toLowerCase());
            })
            .map((item) => (
              <tr key={item.patientid}>
                <td>{item.patientid}</td>
                <Link to={`/patient/${item.patientid}`}>
            <td>{item.lastnm}, {item.firstnm}</td>
                </Link>
                {/* <td>{item.age}</td> */}
                <td>{item.birthdts.substr(0, 10)}</td>
              </tr>
            ))}
            </>
          }
        </tbody>
      </table>
      </>)}
    </div>
  );
};

function PatientTable(patientList) {
  const state = useSelector(state => state.languageReducer),
        user = useSelector(state => state.authReducer),
        history = useHistory();
        const {
          items,
          requestSort,
          sortConfig,
          handleSearch,
          searchVal,
          english,
          handleEnglish,
          loading,
        } = useSortableData(patientList);

  useEffect(() => {
    if(!user.user.email){
      history.push('/')}
  })
  
  

  return (
    
      
      <ProductTable />
  
    
  );
}

export default (PatientTable);
