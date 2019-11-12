exports.handler =  async function(event, context) {

  // Getting variables from event
  let destA = event.destA
  let destB = event.destB
  let reg = event.reg

  // Getting CO2 information
  let co2Emissions = await getVehCo2Emissions(reg)

  // Getting distance information
  let distanceKm = await getDistanceInKm(destA, destB)

  // Calculating tree offset
  let treeOffset = await calculatTreesdOffset(co2Emissions, distanceKm)

  return `This journey is ${distanceKm}km and would need to be offset by ${treeOffset} of trees`
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
