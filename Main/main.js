var roleHarvester = require('role.harvester');
var roleMiner = require('role.miner')

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        else{
            roleMiner.run(creep);
        }
    }
};