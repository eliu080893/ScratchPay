const { checkNameMatch, checkLocationMatch, checkAvailability } = require('../server/utils/filterFunctions');

describe('Test suite will test each of the filter functions', () => {

    const florida = {
        "name": "Good Health Home",
        "stateName": "Florida",
        "availability": {
            "from": "15:00",
            "to": "20:00"
        }
    };

    const california = {
        "name": "National Veterinary Clinic",
        "stateName": "California",
        "availability": {
            "from": "15:00",
            "to": "22:30"
        }
    };

    const nevada = {
        "name": "City Vet Clinic",
        "stateName": "Nevada",
        "availability": {
            "from": "10:00",
            "to": "22:00"
        }
    };

    describe('Filter by Clinic Location using the state of California', () => {
        it('Should return false when the entry stateName is not equal to California',  () => {
            expect(checkLocationMatch(florida, 'California')).toEqual(false)
        })

        it('Should return true when the entry stateName is equal to California',  () => {

            expect(checkLocationMatch(california, 'California')).toEqual(true)
        })
    });

    describe('Filter by Clinic Name depending on user input', () => {

        it('Should return true when user types in a word within the clinic name',  () => {
            expect(checkNameMatch(nevada, 'vet')).toEqual(true);
            expect(checkNameMatch(florida, 'health')).toEqual(true);
            expect(checkNameMatch(california, 'national')).toEqual(true);
        })

        it('Should return true when user input matches at least 4 characters',  () => {
            expect(checkNameMatch(nevada, 'ty vet')).toEqual(true);
            expect(checkNameMatch(california, 'tional')).toEqual(true);
        })

        it('Should return true when user types the complete clinic name',  () => {
            expect(checkNameMatch(florida, 'Good Health Home')).toEqual(true);
            expect(checkNameMatch(california, 'National Veterinary Clinic')).toEqual(true);
        })

        it('Should return false when user input meets none of the match criteria',  () => {
            expect(checkNameMatch(nevada, 'health')).toEqual(false);
            expect(checkNameMatch(florida, 'test')).toEqual(false);
            expect(checkNameMatch(california, 'fakestring')).toEqual(false);
        })

    });

    describe('Filter Clinics based on user\'s availability', () => {

        it('Should return true if a clinic is open during the user\'s available time (3AM to 12PM)', () => {
            expect(checkAvailability(nevada, 3, 12)).toEqual(true);
        })

        it('Should return false if a clinic is not open during the user\'s available time (3AM to 12PM)', () => {
            expect(checkAvailability(california, 3, 12)).toEqual(false);
        })

        it('Should always return true if a user is available from "Any time" to "Any time".', () => {
            expect(checkAvailability(california, -1, 25)).toEqual(true);
            expect(checkAvailability(nevada, -1, 25)).toEqual(true);
            expect(checkAvailability(florida, -1, 25)).toEqual(true);
        })

        it('If no opening time is specified by the user, it should return true if a clinic is open at any time before the user\'s second input (Any time to 12PM)', () => {
            expect(checkAvailability(california, 3, 12)).toEqual(false);
        })
    })




});