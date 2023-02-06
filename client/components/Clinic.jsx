import React from 'react';
import '../styles/Clinic.scss';

const Clinic = (props) => {
    return(
    <div className='clinic'>
        <div id='clinicName'>{props.name}</div>
        <div id='stateName'>State: {props.stateName}</div>
        <div className='times'>Opens at: {props.availability.from}</div>
        <div className='times'>Closes at: {props.availability.to}</div>
    </div>
    )
}

export default Clinic;