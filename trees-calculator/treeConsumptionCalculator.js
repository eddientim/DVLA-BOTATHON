exports.handler =  async function(destA, destB, reg) {
  // Getting variables from event
  // let destA = event.currentIntent.slots.destA
  // let destB = event.currentIntent.slots.destB
  // let reg = event.currentIntent.slots.carReg

  // Getting CO2 information
  let co2Emissions = await getVehCo2Emissions(reg)

  // Getting distance information
  let distanceKm = await getDistanceInKm(destA, destB)

  // Calculating tree offset
  let treeOffset = await calculatTreesdOffset(co2Emissions, distanceKm)

  let responseString = "This journey from the RLDC in Swansea, to Holborn in London, is " + distanceKm + "km in length. We estimate this journey in your vauxhall corsa, would have a carbon offset of " + treeOffset + " trees."

  console.log("KAMAR ", responseString)

  //callback(null, responseString)

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

// TODO: Actually get distance info (google maps API)
// Function to go get vehicle info using reg
async function getDistanceInKm(destA, destB) {
  console.log("STUB: Collecting distance between ", destA, " and ", destB)

  // Return new promise
  return new Promise(function(resolve, reject) {
    resolve(301)
    })
}

async function calculatTreesdOffset(co2Emissions, distance) {
  let co2InGrams = co2Emissions * distance
  let co2InTonnes = co2InGrams / 1000000

  return co2InTonnes * 5
}
