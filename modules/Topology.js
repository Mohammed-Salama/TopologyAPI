const Resistor = require('./Resistor.js')
const Nmos = require('./Nmos.js')
class Topology {
    constructor(data){
        this.id = data["id"]
        this.components = []
        var component
        for (component of data["components"]){
            if (component["type"]=="resistor"){
                let resistorOpject = new Resistor(component)
                this.components.push(resistorOpject)
            }
            else{
                let nmosObject = new Nmos(component)
                this.components.push(nmosObject)
            }
        }
    }

    getComponents(){
        return this.components
    }

    topologyJsonObject (){
        var jsonObj = {}
        jsonObj["id"] = this.id
        jsonObj["components"] = []
        for (var component of this.components){
            jsonObj["components"].push(component.componentJsonObject())
        } 
        return jsonObj
    }
}
module.exports = Topology