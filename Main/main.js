var roleHarvester = require('role.Harvester');
var roleMiner = require('role.Miner');
var roleTransporter = require('role.Transporter');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleCombat = require('role.Combat');

var BUILD_COST_MOVE = 50;
var BUILD_COST_WORK = 100;
var BUILD_COST_CARRY = 50;
var BUILD_COST_ATTACK = 80;
var BUILD_COST_RANGED_ATTACK = 150;
var BUILD_COST_HEAL = 200;
var BUILD_COST_TOUGH = 10;

module.exports.loop = function () {
	
	for (var name in Game.rooms){
		var room = Game.rooms[name];

		if(room.memory.numSources == undefined){
			var sources = room.find(FIND_SOURCES);
			room.memory.numSources = sources.length;
		}
		
		if(room.memory.numMyCreeps == undefined || room.memory.numMyCreeps != room.find(FIND_MY_CREEPS).length){
			room.memory.numMyCreeps = room.find(FIND_MY_CREEPS).length;
		}
	}

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		
		switch(creep.memory.role){
			case "Harvester": //Crappy role will be replaced with miner and transport when done creating them
				roleHarvester.run(creep);
				break;
			case "Miner":
				roleMiner.run(creep);
				break;
			case "Transporter":
				roleTransporter.run(creep);
				break;
			case "Upgrader":
				roleUpgrader.run(creep);
				break;
			case "Builder":
				roleBuilder.run(creep);
				break;
			case "Combat":
				roleCombat.run(creep);
			default:
				creep.memory.role = "Harvester"
		}
    }
};