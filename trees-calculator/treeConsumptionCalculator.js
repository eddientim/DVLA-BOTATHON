var googleDistanceService = require('./googleDistanceService.js');

exports.handler =  async function(destA, destB, reg) {
  // Getting variables from event

  // Getting CO2 information
  let co2Emissions = await getVehCo2Emissions(reg)

  // Getting distance information
  //let distanceKm = await getDistanceInKm(destA, destB)
  let distanceData = await googleDistanceService.handler(destA, destB);

  // Calculating tree offset
  let treeOffset = await calculatTreesdOffset(co2Emissions, distanceData.distance)

  let responseString = "This journey from " + distanceData.start + " to " + distanceData.end + ", is " + distanceData.distance + " in length. We estimate this journey in your vauxhall corsa, would have a carbon offset equivalent to " + treeOffset + " trees."

  return new Promise(function(resolve, reject) {
    resolve(responseString)
  })
}

// TODO: Actually get vehicle info
// Function to go get vehicle info using reg
async function getVehCo2Emissions(reg) {
  console.log("STUB: Collecting co2 emissions on vehicle reg ", reg)

  // Return new promise
  return new Promise(function(resolve, reject) {
    resolve(118)
    })
}

async function calculatTreesdOffset(co2Emissions, distance) {
  let distanceInt = distance.split(" ")

  let co2InGrams = co2Emissions * distanceInt[0]
  let co2InTonnes = co2InGrams / 1000000

  return co2InTonnes * 5
}
