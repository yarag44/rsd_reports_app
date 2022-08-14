import axios from 'axios';
import React,{ useState, useRef, useEffect, useMemo, useCallback}  from 'react';
import {Button,Card,Row,Col} from 'react-bootstrap';

//import logo from './logo.svg';
import './App.css';
//import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import * as constants from './constants';

const animatedComponents = makeAnimated();


function App() {

const gridRef = useRef(); // Optional - for accessing Grid's API
const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

const [selectedResidential,setSelectedResidential] = useState({ value :0,label: 'Select' });


// Each Column Definition results in one Column.
const [columnDefs, setColumnDefs] = useState([
  {field: 'residentname', filter: true},
  {field: 'residential', filter: true},
  {field: 'house', filter: true},
  {field: 'year', filter: true},
  {field: 'Jan'},
  {field: 'Feb'},
  {field: 'Mar'},
  {field: 'Apr'},
  {field: 'May'},
  {field: 'Jun'},
  {field: 'Jul'},
  {field: 'Aug'},
  {field: 'Sep'},
  {field: 'Oct'},
  {field: 'Nov'},
  {field: 'Dec'},
  {field: 'yearamount'},
  
]);

// DefaultColDef sets props common to all Columns
const defaultColDef = useMemo( ()=> ({
  sortable: true
}));

 // Example of consuming Grid Event
const cellClickedListener = useCallback( event => {
  console.log('cellClicked', event);
}, []);

// Example load data from sever
useEffect(() => {
  // fetch('http://localhost:3000/report')
  // .then(result => result.json())
  // .then(rowData => setRowData(rowData))

    newGrid();



}, []);

const newGrid = async () => {


  //console.log(constants.path_url + 'report?Residential=' + selectedResidential.value.toString());

  let result = await axios.get(constants.path_url + 'report?Residential=' + selectedResidential.value.toString() )

  //console.log(JSON.parse(JSON.stringify(result)).data);

  setRowData(JSON.parse(JSON.stringify(result)).data);

}



// Example using Grid's API
const buttonListener = useCallback( e => {
  gridRef.current.api.deselectAll();

  //console.log(rowData);


}, []);

  const options = [
    { value: '1', label: 'VISTA REAL' },
  ]

  const methodOnChange = (item) => {

    if(!item) {setSelectedResidential({ value :0,label: 'Select' }); return;} 

    //gridRef.current.api.deselectAll();
    setSelectedResidential(item)
   

  }


  useEffect(() => {

    newGrid();

  },[selectedResidential])



  return (

    <>

      <Row className={'mx-auto'} style={{ 'marginTop' : 15 }}>

      <Col>
      
       <Card >
      <Card.Header><h3>Pagos por Residencial</h3></Card.Header>
      <Card.Body>
        {/* <Card.Title>Pagos por Residencial</Card.Title> */}
          <Row className={'mx-auto'}>
            <Col>
            
              <Select
                closeMenuOnSelect={true}
                isClearable
                //components={animatedComponents}
                //defaultValue={[colourOptions[4], colourOptions[5]]}
                placeholder={'SELECCIONA RESIDENTIAL ....'}
                onChange={(e) => { methodOnChange(e) } }
                //isMulti
                options={options}
              />
            
            </Col>

          </Row>

          <Row className={'mx-auto'}>
            <Col className={'ag-theme-alpine'} style={{width: '100%', height: '600px'}}>
            
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API

              rowData={rowData} // Row Data for Rows

              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection='multiple' // Options - allows click selection of rows

              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              /> 

            </Col>
          </Row>

        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
      </Card>
      
      </Col>


      </Row>
    
    </>

  );
}

export default App;
