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
	
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
	}
	
	for (var name in Game.rooms){
		var room = Game.rooms[name];
		
		if(room.memory.numSources == undefined){
			var sources = room.find(FIND_SOURCES);
			room.memory.numSources = sources.length;
		}
		
		if(room.memory.numMyCreeps == undefined || room.memory.numMyCreeps != room.find(FIND_MY_CREEPS).length){
			room.memory.numMyCreeps = room.find(FIND_MY_CREEPS).length;
		}
		
		room.memory.numHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvester').length;
		room.memory.numMiner = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner').length;
		room.memory.numTransporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'Transporter').length;
		room.memory.numUpgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'Upgrader').length;
		room.memory.numBuilder = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder').length;
		room.memory.numCombat = _.filter(Game.creeps, (creep) => creep.memory.role == 'Combat').length;
		
		if(room.memory.numHarvesters < room.memory.numSources){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'Harvester'});
		}
		
		if(room.memory.numUpgrader < 2 && room.memory.numHarvesters != 0 && room.memory.numTransporter != 0){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'Upgrader'});
		}
		
		/**
		if(room.memory.numBuilder < 2 && room.memory.numHarvesters != 0 && room.memory.numTransporter != 0){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'Builder'});
		}
		**/
		
		if(room.memory.numTransporter < (room.memory.numHarvesters + room.memory.numBuilder + room.memory.numUpgrader) && room.memory.numHarvesters != 0){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'Transporter'});
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