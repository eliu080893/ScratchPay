import React, { useState } from 'react';
import '../styles/InputContainer.scss';
import United from './United.jsx';

const InputContainer = (props) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('allstates')
    const [openTime, setOpenTime] = useState('-1')
    const [closeTime, setCloseTime] = useState('24')

    const handleSubmit = (e) => {
        e.preventDefault();

        let payload = {
            name,
            location,
            openTime,
            closeTime
        }
        console.log(payload)

        fetch('/',
        {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then( res => res.json())
        .then( res => {
            props.setClinic(res)
            // console.log(res)
        })
        .catch( err => {
            console.log('Could not reach server to fetch data.')
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div id='input-container'>

                    <div className='input-field'>
                        <label for='name'>Enter Clinic Name</label>
                        <input 
                            id='name' 
                            type='text' 
                            placeholder='name' 
                            onChange={ (e) => setName(e.target.value)}>

                        </input>
                    </div>

                    <div className='input-field'>
                        <label for='location'>Enter State Name</label>
                        <United 
                            id='location' 
                            type='text' 
                            setLocation={setLocation}>
                        </United>
                    </div>

                    <div className='input-field'>
                        <label for='openTime'>Show all clinics open after:</label>
                        <select 
                            id='openTime' 
                            value = {openTime}
                            onChange={ (e) => setOpenTime(e.target.value)}>
                            <option value="-1">--</option>
                            {getTimeOptions()}
                        </select>
                    </div>

                    <div className='input-field'>
                        <label for='closeTime'>Show all clinics closed before:</label>
                        <select 
                            id='closeTime' 
                            type='number' 
                            value= {closeTime}
                            onChange={ (e) => setCloseTime(e.target.value)}>
                            <option value="24">--</option>
                            {getTimeOptions()}
                        </select>
                    </div>
                </div>

                <button type='submit'>
                    {(!name && !location && !openTime && !closeTime) ? 'Search All' : 'Search by Filter' } 
                </button>
            </form>


         </div>
    )
}

// helper function to create a list of dropdown items for all the valid times
const getTimeOptions = () => {
    return Array.apply(null, Array(24)).map(( _, index) => {
        const hour = index % 12 || 12;
        const ampm = index < 12 ? 'AM' : 'PM';
        const time = `${hour}:00 ${ampm}`;
        return <option value={index} key={index}>{time}</option>
    })
}

export default InputContainer;