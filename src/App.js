import React, { Component } from 'react';
import * as style from './App.css';
import papaparse from 'papaparse';
import FilterBox from './FilterBox';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      fetchData: [],
      filteredData: [],
      fetched: false,
      filtered: false,
      countries: [],
      filterValue: "all",
      changeValue: false,
      loading: true
  }
}
  componentWillMount(){
    const myData = require('./data/airports.dat');
    papaparse.parse(myData, {
      download: true,
      delimiter: '\t',
      complete: this.handleResult
    })
  }

  handleResult = (results) => {
    let resutsToArray = results.data.map((result, index) => (
      result[0].replace(/"/g, "").split(',')
    ));
    let countries = resutsToArray.map((result, index) => (
      result[3]
    ));
    this.setState({ fetchData: resutsToArray, countries: countries, fetched: true })

  }

  filter = ()=> {
    const { fetchData } = this.state;
    let filteredData;
      console.log("inside filter");
    return filteredData = fetchData.filter((subarray) => (
      subarray[3] === this.state.filterValue))
  }

handleChange = (value) =>{
  this.setState({filterValue : value, changeValue : true})
}

 renderRows = () => {
   
   console.log("render rows")
   let arrayForRender;
   if (this.state.filterValue == "all") {
    console.log("fetchData for render")
   arrayForRender = this.state.fetchData;
   }
   else{ arrayForRender = this.filter();
    console.log("filtered for render");
    console.log(arrayForRender);
  }
   const rows = arrayForRender.map((resultString, index) => (
        (
          <tr key={index}>
            {resultString.map((resultValue, index) => (
              <td key={index}>
                {resultValue}
              </td>
            )
            )}
          </tr>)
      ));
      return rows;
    }
  
    renderSelect(setCountries){
      return  setCountries.map((country, index)=>(
          <option key={index} value={country} >{country}</option>
      ))
    }

  render() {

    return (
      <div className="normal">
       <FilterBox countries={this.state.countries} handleChange={this.handleChange}/>       
        <table className="table table-bordered table-striped">
          <thead className="thead-inverse">
            <tr>
              <th > Data from "airports.dat"</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    ); 
  }
}
export default App;
