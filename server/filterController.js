const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { checkNameMatch, checkLocationMatch, checkAvailability } = require('./utils/filterFunctions')
const usStates = require('./constants')

const dentalURL = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json'
const vetURL = 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json'

const filterController = {};

// This middleware function serves to sanitize the user input to make sure that all the data is of the write form and type. If any data is not formatted properly, the search will error out.
filterController.sanitizeInput = (req, res, next) => {

    const {
        location,
        availability
    } = req.body;

    const {
        openTime,
        closeTime
    } = availability;

    let stateArray = Object.values(usStates).map( location => location.toLowerCase() );
    stateArray.push('allstates')

    // Check to make sure state location is a real state
    if ( !(stateArray.includes(location.toLowerCase())) )   {
        return next({
            log: 'Error in filterController.sanitizeInput. Invalid input for Clinic State Name.',
            message: {err: 'Invalid State Name'}
        })
    }

    const validInputTimes = Array.from({length: 26}, (_, i) => i - 1);
    
    // Check to make sure the opening input time are numeric in value
    if ( !(validInputTimes.includes(Number(openTime)))) {
        return next({
            log: 'Error in filterController.sanitizeInput. Invalid input for Clinic Opening Time.',
            message: {err: 'Invalid Input Time'}
        })
    }

    // Check to make sure the closing input time are numeric in value
    if ( !(validInputTimes.includes(Number(closeTime)))) {
        console.log('3 is broken')
        return next({
            log: 'Error in filterController.sanitizeInput. Invalid input for Clinic Closing Time.',
            message: {err: 'Invalid Closing Time'}
        })
    }

    return next();
}

// This middleware function serves to call both API's and store the data into our response body
filterController.fetchResults = async (req, res, next) => {

    try {
        await fetch(dentalURL)
        .then( data => data.json())
        .then (data => {
            res.locals.dentalData = data;
        })
    }
    catch(err) {
        return next({
            log: 'Error in filterController.fetchResults. Could not successfully fetch results from Dental Scratchpay API',
            message: {err: err}
        });
    }

    try {
        await fetch(vetURL)
        .then( data => data.json())
        .then (data => {
            res.locals.vetData = data;
        })
    }
    catch(err) {
        return next({
            log: 'Error in filterController.fetchResults. Could not successfully fetch results from Vet Scratchpay API',
            message: {err: err}
        });
    }

    return next();
}

// This middleware function serves to convert the key names of the Vet Data to be consistent with the key name of the Dental Data
filterController.convertResults = (req, res, next) => {

    const vetData = res.locals.vetData;
    for (let entry of vetData) {
        convertVetData(entry)
    }

    return next();
}

// This middleware function serves to filter out all the results according to the user input. If a filter field is entered, it will narrow down the search by calling a specific filter function.
filterController.filterResults = (req, res, next) => {

    const {
        name,
        location,
        availability
    } = req.body;

    let {
        openTime,
        closeTime
    } = availability;

    openTime = Number(openTime);
    closeTime = Number(closeTime);

    const vetData = res.locals.vetData;
    const dentalData= res.locals.dentalData;
    let totalData = [...vetData, ...dentalData]

    // Filter total data set by Clinic Name
    if (name !== '' ){
        totalData = totalData.filter( (clinic) => {
            return checkNameMatch(clinic, name)
        })
    }

    // Filter again by Clinic Location
    if (location !== 'allstates') {
        totalData = totalData.filter ( (clinic) => {
            return checkLocationMatch(clinic, location)
        })
    }

    // Filter again by user's availability
    totalData = totalData.filter( (clinic) => {
        return checkAvailability(clinic, openTime, closeTime)
    });

    res.locals.searchResults = totalData;
    return next();
}

// This helper function converts the Vet Data 'key' names to be consistent with the Dental Data keys
function convertVetData(entry) {
    entry.name = entry.clinicName;
    delete entry.clinicName;

    entry.stateName = usStates[entry.stateCode];
    delete entry.stateCode;

    entry.availability = {...entry.opening}
    delete entry.opening

    return entry
}

module.exports = filterController;