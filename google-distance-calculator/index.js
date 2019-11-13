var distance = require('google-distance-matrix');

exports.handler = async (event) => {

  let start = event.start
  let end = event.end

console.log("vars: ", start, end)
let collectedDistanceData = await getDistanceInKm(start, end)
collectedDistanceData.start = await normaliseStartAndEndStrings(collectedDistanceData.start)
collectedDistanceData.end = await normaliseStartAndEndStrings(collectedDistanceData.end)

console.log("Collected distance is: ", collectedDistanceData)

    const response = {
        statusCode: 200,
        body: collectedDistanceData,
    };
    return response;
};

async function getDistanceInKm(start, end) {
  console.log("I'm hit")
  var origins = [start];
  var destinations = [end];

  distance.key('AIzaSyBh-za4Jv32QKFfNcIW0WK8sHDRaj8xnzI');

  return new Promise((resolve, reject) => {
    distance.matrix(origins, destinations, function (err, distances) {
          if (err) {
              console.log(err);
              reject(err)
          }
          if(!distances) {
              console.log('no distances');
              reject("No distances")
          }

          if (distances.status == 'OK') {
            console.log("Distances: ", distances)
              for (var i=0; i < origins.length; i++) {
                  for (var j = 0; j < destinations.length; j++) {
                      var origin = distances.origin_addresses[i];
                      var destination = distances.destination_addresses[j];
                      if (distances.rows[0].elements[j].status == 'OK') {
                          var distance = distances.rows[i].elements[j].distance.text;
                          console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                          resolve({
                            "start": distances.origin_addresses[i],
                            "end": distances.destination_addresses[j],
                            "distance": distance
                          })
                      } else {
                          console.log(destination + ' is not reachable by land from ' + origin);
                          reject(destination + ' is not reachable by land from ' + origin)
                      }
                  }
              }
          }
    });
  })
}

async function normaliseStartAndEndStrings(input) {
  let res = input.split(",")

  return new Promise((resolve) => {
    resolve(res[0])
  })
}
