const Component = require('./Component.js')
class Nmos extends Component{
    constructor(jsonData){
        super(jsonData["type"] , jsonData["id"] , jsonData["netlist"])
        this.ml = jsonData["m(l)"]
    }
    componentJsonObject(){
        var jsonObj = {}
        jsonObj["type"] = this.type
        jsonObj["id"] = this.id
        jsonObj["m(l)"] = this.ml
        jsonObj["netlist"] = this.netlist
        return jsonObj
    }
}
module.exports = Nmos