const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {
        it('responds with 200 status and text/html content type', () => request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
      });

      describe('POST', () => {

        it('responds with 200 status and application/json content type', () => request(server)
            .post('/')
            .send({ 
                name: "",
                location: "allstates",
                availability: {
                    openTime: "-1",
                    closeTime: "24"
                }
            })
            .expect('Content-Type', /application\/json/)
            .expect(200)
        )

        it('responds with the full list of all 15 clinics when all input fields are empty', async () => {
            const response = await request(server)
                .post('/')
                .send({ 
                    name: "",
                    location: "allstates",
                    availability: {
                        openTime: "-1",
                        closeTime: "24"
                    }
                })

            expect(response.body.length === 15)
        });
        
        it('responds with the full list of all clinics within California when only LOCATION is entered', async () => {
            const response = await request(server)
                .post('/')
                .send({ 
                    name: "",
                    location: "California",
                    availability: {
                        openTime: "-1",
                        closeTime: "24"
                    }
                })

            expect(response.body.length === 4)
        });

        it('responds with the list of 4 clinics when "scratch" is entered in the name search filter', async () => {
            const response = await request(server)
                .post('/')
                .send({ 
                    name: "scratch",
                    location: "allstates",
                    availability: {
                        openTime: "-1",
                        closeTime: "24"
                    }
                })
            expect(response.body.length === 4)
        });

        it('responds with the list of 9 clinics user is available from "9 - Anytime" ', async () => {
            const response = await request(server)
                .post('/')
                .send({ 
                    name: "scratch",
                    location: "allstates",
                    availability: {
                        openTime: "9",
                        closeTime: "24"
                    }
                })

            expect(response.body.length === 9)
        });


      });
    });
});

