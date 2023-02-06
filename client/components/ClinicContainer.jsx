import React from 'react';
import {v4 as uuidv4} from 'uuid';
import Clinic from './Clinic.jsx';
import '../styles/ClinicContainer.scss';

const ClinicContainer = (props) => {
    
    const clinicsArray = props.clinic.map( (clinic) => {
        return (
        <Clinic 
            name={clinic.name} 
            stateName={clinic.stateName} 
            availability = {clinic.availability}
            key={ uuidv4()}/>
         )
    });

    return(
    <div id='clinicContainer'>
        {clinicsArray}
    </div>
    )
}

export default ClinicContainer;