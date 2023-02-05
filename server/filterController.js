const unitedStates = require('./constants')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const dentalURL = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json'
const vetURL = 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json'

const filterController = {};

// This middleware function serves to call both API's and store the data into our response object
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

// This middleware function serves to convert the kay names of the Vet Data to be consistent with the key name of the Dental Data
filterController.convertResults = (req, res, next) => {

    const vetData = res.locals.vetData;
    for (let entry of vetData) {
        convertVetData(entry)
    }

    return next();
}

// This middleware function serves to filter out all the results according to the user input. If a filter field is entered, it will narrow down the search by calling a specific filter function.
filterController.filterResults = (req, res, next) => {

    console.log('Reached filteredResults')

    const {
        name,
        location,
        openTime,
        closeTime
    } = req.body;

    // Define the user's filter searches, and the filter functions to call.
    let filterVariables = [name, location, openTime, closeTime]
    let filterFunctions = [checkNameMatch, checkLocationMatch, checkOpenTime, checkCloseTime]

    const vetData = res.locals.vetData;
    const dentalData= res.locals.dentalData;
    let totalData = [...vetData, ...dentalData]

    // Iterate through each inputted filter search, and invoke the corresponding filter function on the all entries.
    filterVariables.forEach( (el, index) => {
        // console.log('Filtering for: ' + el)
        if (el !== '') {
            totalData = totalData.filter( (entry) => {
                // console.log(el, '-----', filterFunctions[index](entry, el))
                return filterFunctions[index](entry, el)
            })
        }
    })

    res.locals.searchResults = totalData;
    return next();
}

function convertVetData(entry) {
    entry.name = entry.clinicName;
    delete entry.clinicName;

    entry.stateName = unitedStates[entry.stateCode];
    delete entry.stateCode;

    entry.availability = {...entry.opening}
    delete entry.opening

    return entry
}

function checkNameMatch(entry, string) {
    // console.log('checkNameMatch - entry: ', entry, '. Looking for name: ', string)
    // console.log('---', entry.name.toLowerCase().split(" ").includes(string.toLowerCase()))

    // Returns true if
    // 1) You enter a word that is in the name of the entry
    // 2) You enter 4 or more characters that can match the entry
    // 3) You enter the complete entry name
    return (
        entry.name.toLowerCase().split(" ").includes(string.toLowerCase()) ||
        (entry.name.toLowerCase().includes(string.toLowerCase()) && string.length >= 4) ||
        entry.name.toLowerCase() === string.toLowerCase()
    )
}

function checkLocationMatch(entry, location) {
    return(
        entry.stateName.toLowerCase() === location.toLowerCase()
    )
}

function checkOpenTime(entry, openTime) {
    return (
        entry.availability.from >= openTime
    )
}

function checkCloseTime(entry, closeTime) {
    return (
        entry.availability.to <= closeTime
    )
}


module.exports = filterController;