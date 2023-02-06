import React, { useState } from 'react';
import styles from '../styles/InputContainer.scss';
import United from './United.jsx';

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
            console.log(res)
        })
        .catch( err => {
            console.log('Could not reach server to fetch data.')
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
                        <United 
                            id='location' 
                            type='text' 
                            placeholder='location'
                            setLocation={setLocation}>
                        </United>
                    </div>

                    <div className='input-field'>
                        <label for='openTime'>Enter Earliest Opening Time</label>
                        <select 
                            id='openTime' 
                            value = {openTime}
                            onChange={ (e) => setOpenTime(e.target.value)}>
                            <option value="">--</option>
                            <option value="0">12:00 AM</option>
                            <option value="1">1:00 AM</option>
                            <option value="2">2:00 AM</option>
                            <option value="3">3:00 AM</option>
                            <option value="4">4:00 AM</option>
                            <option value="5">5:00 AM</option>
                            <option value="6">6:00 AM</option>
                            <option value="7">7:00 AM</option>
                            <option value="8">8:00 AM</option>
                            <option value="9">9:00 AM</option>
                            <option value="10">10:00 AM</option>
                            <option value="11">11:00 AM</option>
                            <option value="12">12:00 PM</option>
                            <option value="13">1:00 PM</option>
                            <option value="14">2:00 PM</option>
                            <option value="15">3:00 PM</option>
                            <option value="16">4:00 PM</option>
                            <option value="17">5:00 PM</option>
                            <option value="18">6:00 PM</option>
                            <option value="19">7:00 PM</option>
                            <option value="20">8:00 PM</option>
                            <option value="21">9:00 PM</option>
                            <option value="22">10:00 PM</option>
                            <option value="23">11:00 PM</option>
                        </select>
                    </div>

                    <div className='input-field'>
                        <label for='closeTime'>Enter Latest Closing Time</label>
                        <select 
                            id='closeTime' 
                            type='number' 
                            value= {closeTime}
                            onChange={ (e) => setCloseTime(e.target.value)}>
                            <option value="">--</option>
                            <option value="1">1:00 AM</option>
                            <option value="2">2:00 AM</option>
                            <option value="3">3:00 AM</option>
                            <option value="4">4:00 AM</option>
                            <option value="5">5:00 AM</option>
                            <option value="6">6:00 AM</option>
                            <option value="7">7:00 AM</option>
                            <option value="8">8:00 AM</option>
                            <option value="9">9:00 AM</option>
                            <option value="10">10:00 AM</option>
                            <option value="11">11:00 AM</option>
                            <option value="12">12:00 PM</option>
                            <option value="13">1:00 PM</option>
                            <option value="14">2:00 PM</option>
                            <option value="15">3:00 PM</option>
                            <option value="16">4:00 PM</option>
                            <option value="17">5:00 PM</option>
                            <option value="18">6:00 PM</option>
                            <option value="19">7:00 PM</option>
                            <option value="20">8:00 PM</option>
                            <option value="21">9:00 PM</option>
                            <option value="22">10:00 PM</option>
                            <option value="23">11:00 PM</option>
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

export default InputContainer;