var roleHarvester = require('role.Harvester');
var roleMiner = require('role.Miner');
var roleTransporter = require('role.Transporter');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleCombat = require('role.Combat');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
		switch(creep.memory.role){
			case "harvester":
				roleHarvester.run(creep);
				break;
			case "miner":
				roleMiner.run(creep);
				break;
			case "transporter":
				roleTransporter.run(creep);
				break;
			case "Upgrader":
				roleUpgrader.run(creep);
				break;
			case "Builder":
				roleBuilder.run(creep);
				break;
			default:
				roleCombat.run(creep);
		}
		
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        else{
            roleMiner.run(creep);
        }
    }
};