const fs = require('fs')
const geolib = require('geolib')
const stations = require('./stations.json')

const output = stations.map(originStation => {

  const toOtherStations = stations.map(destinationStation => {
    const distance = geolib.getDistance(
      { latitude: originStation.lat, longitude: originStation.lon},
      { latitude: destinationStation.lat, longitude: destinationStation.lon}
    )

    return {
      station: destinationStation.name_clean,
      distance
    }
  })

  const toOtherStationsSorted = toOtherStations.sort((a, b) => a.distance > b.distance ? 1 : -1).slice(1)

  return {
    station: originStation.name_clean,
    distances: toOtherStationsSorted
  }
})

fs.promises.writeFile('./distances.json', JSON.stringify(output, null, 2))