import React from 'react';
import {v4 as uuidv4} from 'uuid';
import Clinic from './Clinic.jsx';
import styles from '../styles/ClinicContainer.scss';

const ClinicContainer = (props) => {
    
    let clinicsArray = props.clinic.map( (object) => {
        return (
        <Clinic 
            name={object.name} 
            stateName={object.stateName} 
            availability = {object.availability}
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