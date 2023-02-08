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

// Returns true if there is any overlap between when the user needs to go in, and the clinic operating hours
filterFunctions.checkAvailability = (entry, openTime, closeTime) => {
    let openMinutes = parseInt(entry.availability.from.slice(3)) / 60 ;
    let openHours = parseInt(entry.availability.from);
    let opening = openMinutes + openHours;

    let closeMinutes = parseInt(entry.availability.to.slice(3)) / 60 ;
    let closeHours = parseInt(entry.availability.to);
    let closing = closeMinutes + closeHours;


    for (let available = openTime; available <= closeTime; available++) {
        if ((available > opening) && (available < closing)) {
            return true
        }
    }

    return false;
}

module.exports = filterFunctions;