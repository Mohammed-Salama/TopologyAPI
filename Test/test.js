const API = require('../modules/API')

var topology1 = {
    "id": "top1",
    "components": [
      {
        "type": "resistor",
        "id": "res1",
        "resistance": {
          "default": 100,
          "min": 10,
          "max": 1000
        },
        "netlist": {
          "t1": "vdd",
          "t2": "n1"
        }
      },
      {
        "type": "nmos",
        "id": "m1",
        "m(l)": {
          "default": 1.5,
          "min": 1,
          "max": 2
        },
        "netlist": {
          "drain": "n1",
          "gate": "vin",
          "source": "vss"
        }
      }
    ]
  }

  var topology2 = {
    "id": "top2",
    "components": [
      {
        "type": "resistor",
        "id": "res1",
        "resistance": {
          "default": 100,
          "min": 10,
          "max": 1000
        },
        "netlist": {
          "t1": "vdd",
          "t2": "n1"
        }
      },
      {
        "type": "nmos",
        "id": "m1",
        "m(l)": {
          "default": 1.5,
          "min": 1,
          "max": 2
        },
        "netlist": {
          "drain": "n1",
          "gate": "vin",
          "source": "vss"
        }
      }
    ]
  }

  
// testing readJSON
var api = new API()
test('Reading existing file', () =>{
    expect(api.readJson('topology1.json')).toBe(true)
})
test('Reading non-existing file', () =>{
    expect(api.readJson('topology4.json')).toBe(false)
})

//testing writeJson
test('Writting existing topology', () =>{
    expect(api.writeJson('top1')).toBe(true)
})
test('Writting non-existing topology', () =>{
    expect(api.writeJson('top4')).toBe(false)
})

//testing queryTopologies
test('Get topologies', () =>{
    expect(api.queryTopologies()[0]).toEqual(topology1)
})

//testing deleteTopology
test('Delete non-existing topology', () =>{
    expect(api.deleteTopology('top4')).toBe(false)
})
test('Delete existing topology', () =>{
    expect(api.deleteTopology('top1')).toBe(true)
})
test('Delete existing topology', () =>{
    expect(api.queryTopologies().length).toBe(0)
})

// testing queryDevices

//testing queryDevices
test('Reading existing file', () =>{
    expect(api.readJson('topology2.json')).toBe(true)
})
test('Get Devices of topology2', () =>{
    //expect(api.queryDevices('top2').componentJsonOpject()).toEqual(topology2["components"])
})
test('Get Devices of non existing topology', () =>{
    expect(api.queryDevices('top4')).toBe(null)
})

//testing queryDevicesWithNetlistNode
var comp = [{
    "type": "resistor",
    "id": "res1",
    "resistance": {
      "default": 100,
      "min": 10,
      "max": 1000
    },
    "netlist": {
      "t1": "vdd",
      "t2": "n1"
    }
  }]
test('Get Devices of topology2 with node vdd', () =>{
    expect(api.queryDevicesWithNetlistNode('top2' , 'vdd')).toEqual(comp)
})
test('Get Devices of non existing topology with node vdd', () =>{
    expect(api.queryDevicesWithNetlistNode('top4' , 'vdd')).toBe(null)
})

