const Component = require('./Component.js')
class Resistor extends Component {
    constructor(jsonData){
        super(jsonData["type"] , jsonData["id"] , jsonData["netlist"])
        this.resistance = jsonData["resistance"]
    }
    componentJsonObject(){
        var jsonObj = {}
        jsonObj["type"] = this.type
        jsonObj["id"] = this.id
        jsonObj["resistance"] = this.resistance
        jsonObj["netlist"] = this.netlist
        return jsonObj
    }
}
module.exports = Resistor