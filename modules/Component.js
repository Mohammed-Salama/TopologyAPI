class Component {
    constructor(type , id , netlist){
        this.type = type
        this.id = id
        this.netlist = netlist
    }
    getNetlist(){
        return this.netlist
    }
    componentJsonObject (){
        return null
    }
}
module.exports = Component