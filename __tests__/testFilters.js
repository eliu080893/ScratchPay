const { checkNameMatch, checkLocationMatch, checkOpenTime, checkCloseTime } = require('../server/utils/filterFunctions');

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
            expect(checkNameMatch(nevada, 'vet')).toEqual(true)
        })

        it('Should return true when user input matches at least 4 characters',  () => {
            expect(checkNameMatch(california, 'tional')).toEqual(true)
        })

        it('Should return true when user types the complete clinic name',  () => {
            expect(checkNameMatch(florida, 'Good Health Home')).toEqual(true)
        })

        it('Should return false when user input meets none of the match criteria',  () => {
            expect(checkNameMatch(florida, 'test')).toEqual(false)
        })

    });

    describe('Filter by Clinic Opening Times', () => {

        it('Should return true for clinics that open-up after input time', () => {
            expect(checkOpenTime(nevada, 12)).toEqual(true)
        })

        it('Should return false for clinics that open-up before input time', () => {
            expect(checkOpenTime(california, 10)).toEqual(false)
        })
    })




});