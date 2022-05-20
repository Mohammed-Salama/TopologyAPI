const { readFileSync } = require('fs');
const { writeFileSync } = require('fs');
const Topology = require('./Topology.js')
const Component = require('./Component.js')
/**
 * API class
 */
class API {
    /**
     * @constractor to initialize an empty list that will be used for saving the topologies in the memory 
     */
    constructor() { 
        this.topologies = []
    }

    /**
     * function to read json topology from the disk
     * @param {string} FileName (the path of the topology file that should be read)
     * @returns true if the file is read without errors
     */
    readJson(FileName){
        try {
            const data = readFileSync(FileName);
            var jsonData = JSON.parse(data);
            if (this.getTopology(jsonData["id"])==null){
                let topology = new Topology (jsonData)
                this.topologies.push(topology) 
            }
            return true
        }
        catch (error){
            console.log(error)
            return false
        }
    }

    /**
     * function to save file contains json topology to the disk
     * @param {string} TopologyID (The ID of a topology in the memory that should be saved in a file on the disk)
     * @returns trur if the file is written succesfully ,or false if the topology of that ID is not in te memory or there is an error occured in writting the file
     */
    writeJson(TopologyID){
        var topology = this.getTopology(TopologyID)
        if (topology != null){
            try {
                writeFileSync(topology["id"]+'json', JSON.stringify(topology.topologyJsonObject()));
                return true
            } 
            catch (error) {
                console.log(error);
                return false
            }
        }
        else{
            return false
        }
    }
     /**
      * Function retuns all the topologies in the memory 
      * @returns all the topologies that are currently in the memory
      */
    queryTopologies() {
        var jsonTopologies = []
        for (var topology of this.topologies){
            jsonTopologies.push(topology.topologyJsonObject())
        }
        return jsonTopologies;
    }

    /**
     * Function that deletes specific topology from the memory
     * @param {string} TopologyID (The ID of a topology in the memory that should be deleted)
     * @returns true if this topology is already in the memory , false if there is no topology in the memory with that ID
     */
    deleteTopology(TopologyID){
        let itemToBeRemoved = this.getTopology(TopologyID)
        if (itemToBeRemoved != null){
            this.topologies = this.topologies.filter(item => item != itemToBeRemoved)
            return true
        }
        else{
            return false
        }
    }

    /**
     * Function that returns Devices of a topology
     * @param {string} TopologyID (The ID of a topology in the memory that it is requsted to return its devices) 
     * @returns list of Devices of the topology of that ID if this topology is already in the memory , false if there is no topology in the memory with that ID
     */
    queryDevices(TopologyID){
        var topology = this.getTopology(TopologyID)
        if (topology != null){
            var components = topology.getComponents()
            var jsonComponents = []
            for (var component of components){
                jsonComponents.push(component.componentJsonObject())
            }
            return jsonComponents;
        }
        else {
            return null
        }
    }

    /**
     * Function that returns devices of a topology which have a specific node in there netlists
     * @param {string} TopologyID (The ID of a topology in the memory that it is requsted to return its devices that have specific node in its netlist) 
     * @param {string} NetlistNodeID "The ID of the node"
     * @returns list of devices or null if there is no topology with that ID
     */
    queryDevicesWithNetlistNode(TopologyID , NetlistNodeID){
        var topology = this.getTopology(TopologyID)
        if (topology != null){
            var components = topology.getComponents()
            let result = []
            for (var component of components){
                var netlist = component.getNetlist()
                for (var property  in netlist){
                    var val = netlist[property]
                    if (val==NetlistNodeID){
                        result.push(component.componentJsonObject())
                    }
                }
            }
            return result
        }
        else{
            return null
        }
    }

    /**
     * Function that returns a topology with its ID
     * @param {string} TopologyID ID of a topology
     * @returns topology with that ID if it is in the memory , or null if it is not found
     */
    getTopology(TopologyID){
        var topology
        for (topology of this.topologies){
            if(topology["id"]==TopologyID){
                return topology
            }
        }
        return null
    }

}
module.exports = API
