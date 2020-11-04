import React, {useState, useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom'


const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config),    
        [searchVal, setSearchVal] = useState(''),
        [patientList, setPatientList] = useState([
          { id: '1', name: 'Wiebe, Jordan', age: '28', dob: '02/21/1992' },
          { id: '2', name: 'Wiebe, Cicely', age: '30', dob: '03/16/1990' },
          { id: '3', name: 'Jeff, Tall', age: '27', dob: '12/12/1993' },
          { id: '4', name: 'Tillman, Daniel', age: '28', dob: '12/12/1992' },
          { id: '5', name: 'Trump, Donald', age: '78', dob: '12/12/1950' },
          { id: '6', name: 'Smith, Mike ', age: '45', dob: '05/25/1974' },
          { id: '7', name: 'Doe, John', age: '99', dob: '11/11/1921'},
          
        ])
  
  useEffect(() => {
    
  })


  const handleSearch = (e) => {
    setSearchVal(e)
  }

  const sortedItems = useMemo(() => {
    let sortableItems = [...patientList];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig, handleSearch, searchVal, patientList };
};

const ProductTable = (patientList) => {
  const { items, requestSort, sortConfig, handleSearch, searchVal } = useSortableData(patientList);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div>
    <div>
    <p>Search</p>
    <input 
    name='searchVal'
    value= {searchVal}
    placeholder= 'search by name, DOB, patient #'
    onChange={(e) => handleSearch(e.target.value)}/>
    </div>
    <table>
      <caption>Patient List</caption>
      <thead>
        <tr>
        <th>
            <button
              type="button"
              onClick={() => requestSort('id')}
              className={getClassNamesFor('id')}
            >
              Patient ID
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('age')}
              className={getClassNamesFor('age')}
            >
              Age
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dob')}
              className={getClassNamesFor('dob')}
            >
              D.O.B.
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.filter(item => {
          let objString = JSON.stringify(item)
          return objString.toLowerCase().includes(searchVal.toLowerCase())
        }).map((item) => (

          <tr key={item.id}>
            <td>{item.id}</td>
            <Link to={`/patient/${item.id}`}>
             <td>{item.name}</td>
            </Link>
            <td>{item.age}</td>
            <td>{item.dob}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default function PatientTable() {
  return (
    <div className="App">
      <ProductTable
        
      />
    </div>
  );
}
