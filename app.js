const API = require('./modules/API.js')
let api = new API()
api.readJson('topology1.json')
api.readJson('topology2.json')
api.readJson('topology1.json')
api.readJson('topology3.json')
api.deleteTopology('top1')
console.log( api.writeJson('top2'))
console.log(api.queryTopologies()[0])
console.log(api.queryDevices(api.queryTopologies()[0]["id"]))
console.log(api.queryDevicesWithNetlistNode(api.queryTopologies()[0]['id'],'vss'))
console.log(api.queryDevicesWithNetlistNode(api.queryTopologies()[0]['id'],'n1'))