const filterFunctions = {}

// Returns true if
// 1) You enter a word that is in the name of the entry
// 2) You enter 4 or more characters that can match the entry
// 3) You enter the complete entry name
filterFunctions.checkNameMatch = (entry, string) => {
        return (
        entry.name.toLowerCase().split(" ").includes(string.toLowerCase()) ||
        (entry.name.toLowerCase().includes(string.toLowerCase()) && string.length >= 4) ||
        entry.name.toLowerCase() === string.toLowerCase()
    )
}

// Returns true if the clinic state matches the user's input
filterFunctions.checkLocationMatch = (entry, location) => {
    return(
        entry.stateName.toLowerCase() === location.toLowerCase()
    )
}

// Returns true if the time the clinic opens is after the user's filter
filterFunctions.checkOpenTime = (entry, openTime) => {
    let minutes = parseInt(entry.availability.from.slice(3)) / 60 
    let hours = (parseInt(entry.availability.from))

    return (
        minutes + hours >= Number(openTime)
    )
}

// Returns true if the time the clinic closes is before the user's filter
filterFunctions.checkCloseTime = (entry, closeTime) => {
    let minutes = parseInt(entry.availability.to.slice(3)) / 60 
    let hours = (parseInt(entry.availability.to))

    return (
        minutes + hours <= Number(closeTime)
    )
}

module.exports = filterFunctions;