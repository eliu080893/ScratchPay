import React, { useState } from 'react';
import styles from '../styles/InputContainer.scss';

const InputContainer = () => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [openTime, setOpenTime] = useState('')
    const [closeTime, setCloseTime] = useState('')
    const [clinic, setClinic] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('hi')

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
            setClinic(res)
            console.log(res)
        })
        .catch( err => {
            console.log('There was an error in this endpoint.')
        })
    }

    return(
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
                <label for='location'>Enter Clinic Name</label>
                <input 
                    id='location' 
                    type='text' 
                    placeholder='location'
                    onChange={ (e) => setLocation(e.target.value)}>

                </input>
            </div>

            <div className='input-field'>
                <label for='openTime'>Enter Clinic Name</label>
                <input 
                    id='openTime' 
                    type='number' 
                    placeholder='time'
                    onChange={ (e) => setOpenTime(e.target.value)}>

                </input>
            </div>

            <div className='input-field'>
                <label for='closeTime'>Enter Clinic Name</label>
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
    )
}

export default InputContainer;