import * as functions from 'firebase-functions';
import * as superagent from 'superagent';
const cors = require('cors')({
  origin: true,
});

/**
 * This function makes a CORS request to the translink bus api
 * Once it has the data, it parses it into the state shape that the Map app wants for convenience
 * @param {superagent.Request} request
 * @param {superagent.Response} response
 */
export const fetchBusList = functions.https.onRequest((request: superagent.Request, response: superagent.Response) => {
  return cors(request, response, () => {
    superagent
    .get('http://api.translink.ca/rttiapi/v1/buses')
    .accept('application/json')
    .query({apikey: 'nVRxsMLYhoVQeTNI1TKh'})
    .then((res: any) => {
      const result = res.body;
      const busList: any[] = [];
      result.forEach((data: any): void => {
        busList.push({
         "coordinates": [
            data.Longitude,
            data.Latitude
         ],
         "name": "Vehicle#: " + data.VehicleNo + " - " + data.Direction + " Bound - Destination: " + data.Destination,
        })
      });

      response.json(busList);
    });
  });
});
