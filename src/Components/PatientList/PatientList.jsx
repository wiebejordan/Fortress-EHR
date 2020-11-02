import React from 'react';


const PatientTable = (props) => {
  const patients = [
    {name: 'Jordan',
    age: 21,
    dob: '2/21/1992'},
    {name: 'Cicely',
    age: 25,
    dob: '3/10/1990'},
    {name: 'Jeff',
    age: 18,
    dob: '2/21/1993'},
  ];
  const [sortConfig, setSortConfig] = React.useState(null);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  React.useMemo(() => {

    let sortedPatients = [...patients];
    if (sortConfig !== null){
      sortedPatients.sort((a,b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]){
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0
      });
    }
    return sortedPatients;
  }, [patients, sortConfig]);

    return(
    <table>
      <caption>Patients</caption>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => requestSort('name')}
            className={getClassNamesFor('name')}>
              Name
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort('age')}
            className={getClassNamesFor('age')}>
              Age
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort('dob')}
            className={getClassNamesFor('dob')}>
              DOB
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {patients.map(patient => (
          <tr key={patient.id}>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>{patient.dob}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

}

export default PatientTable;
