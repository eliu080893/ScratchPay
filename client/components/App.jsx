import React, {useState, useEffect} from 'react';
import InputContainer from './InputContainer.jsx';
import ClinicContainer from './ClinicContainer.jsx';
import styles from '../styles/App.scss'

const App = () => {
    const [clinic, setClinic] = useState([])

    // useEffect( ()=> {
    //     console.log('state changed in App.jsx', clinic)
    // }, [clinic])

    return(
    <div id='app'>
        <h1 id='title'>CLINIC SEARCH!</h1>
        <InputContainer setClinic={setClinic}/>
        <ClinicContainer clinic={clinic}/>
    </div>
    )
}

export default App;