import React, { useMemo } from 'react';
import unitedStates from '../constants.js';

const United = (props) => {

    let stateArray = useMemo( () => {
        return generateStateArray(unitedStates);
    }, [unitedStates])

    return(
        <select
            id='location' 
            onChange={ (e) => props.setLocation(e.target.value)}>
            <option value='allstates' key='allStates'>All states</option>
            {stateArray}
        </select>
    )
}

// Helper function to create the list of US states as a dropdown selection value
function generateStateArray(unitedStates) {
    let stateArray =[];
    for (let city in unitedStates) {
        stateArray.push(
            <option 
                value={unitedStates[city]}
                key={city}> {unitedStates[city]} </option>
        )
    }
    return stateArray
}

export default United;