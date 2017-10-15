import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FilterBox extends Component {

    
  renderSelect(setCountries){
    return  setCountries.map((country, index)=>(
        <option key={index} value={country} >{country}</option>
    ))
   
  }


    render() {
        let setCountries = Array.from(new Set(this.props.countries));
        return (
            <FormGroup style={{width:200}}controlId="formControlsSelect">
                <ControlLabel>Filter By Country</ControlLabel>
                <FormControl componentClass="select" placeholder="select" onChange={(e)=>{this.props.handleChange(e.target.value)}}>
                    <option value='all'>All Countries</option>
                   {this.renderSelect(setCountries)}
                </FormControl>
            </FormGroup>)
    }
}
export default FilterBox;