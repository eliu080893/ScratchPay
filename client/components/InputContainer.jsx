import React, { useState } from 'react';
import styles from '../styles/InputContainer.scss';

const InputContainer = (props) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [openTime, setOpenTime] = useState('')
    const [closeTime, setCloseTime] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        let payload = {
            name,
            location,
            openTime,
            closeTime
        }

        fetch('/',
        {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then( res => res.json())
        .then( res => {
            props.setClinic(res)
            console.log(res)
        })
        .catch( err => {
            console.log('There was an error in this endpoint.')
        })
    }

    return(
        <div>
            <form onSubmit={ (e) => handleSubmit(e)}>
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
                        <input 
                            id='location' 
                            type='text' 
                            placeholder='location'
                            onChange={ (e) => setLocation(e.target.value)}>

                        </input>
                    </div>

                    <div className='input-field'>
                        <label for='openTime'>Enter Earliest Opening Time</label>
                        <input 
                            id='openTime' 
                            type='number' 
                            placeholder='time'
                            onChange={ (e) => setOpenTime(e.target.value)}>

                        </input>
                    </div>

                    <div className='input-field'>
                        <label for='closeTime'>Enter Latest Closing Time</label>
                        <input 
                            id='closeTime' 
                            type='number' 
                            placeholder='time'
                            onChange={ (e) => setCloseTime(e.target.value)}>

                        </input>
                    </div>
                </div>

                <button type='submit'>
                    {(!name && !location && !openTime && !closeTime) ? 'Search All' : 'Search by Filter' } 
                </button>
            </form>


         </div>
    )
}

export default InputContainer;