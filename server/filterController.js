const unitedStates = require('./constants')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const dentalURL = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json'
const vetURL = 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json'

const filterController = {};

filterController.fetchResults = async (req, res, next) => {

    console.log('reached fetchResults')
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
            log: 'Error in filterController.fetchResults. Could not successfully fetch results from Dental Scratchpay API',
            message: {err: err}
        });
    }

    return next();
}

filterController.filterResults = (req, res, next) => {

    console.log('Reached filteredResults')

    const {
        name,
        location,
        openTime,
        closeTime
    } = req.body;

    // console.log(name, location, openTime, closeTime)

    // const dentalTranslatedObject = {
    //     name: name,
    //     stateName: location,
    //     'availability.from': openTime,
    //     'availability.from': closeTime
    // }
    // const venTranslatedObject = {
    //     clinicName: name,
    //     stateCode: location,
    //     'opening.from': openTime,
    //     'opening.from': closeTime
    // }

    const vetData = res.locals.vetData;
    const dentalData= res.locals.dentalData;
    const totalData = [...vetData, ...dentalData]

    let filteredDental = dentalData.filter( (entry) => {
        return (
            // checkNameMatch(entry, name) &&
            checkLocationMatch(entry, location) &&
            // checkOpenTime(entry, openTime) &&
            checkCloseTime(entry, closeTime)
        )
    })

    console.log(filteredDental)

    res.locals.searchResults = totalData;
    return next();
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
        entry.stateName === location
    )
}

function checkOpenTime(entry, openTime) {
    return (
        entry.availability.from <= openTime
    )
}

function checkCloseTime(entry, closeTime) {
    return (
        entry.availability.to >= closeTime
    )
}


module.exports = filterController;