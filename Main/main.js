var roleHarvester = require('role.Harvester');
var roleMiner = require('role.Miner');
var roleTransporter = require('role.Transporter');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleCombat = require('role.Combat');

/**
var BUILD_COST_MOVE = 50;
var BUILD_COST_WORK = 100;
var BUILD_COST_CARRY = 50;
var BUILD_COST_ATTACK = 80;
var BUILD_COST_RANGED_ATTACK = 150;
var BUILD_COST_HEAL = 250;
var BUILD_COST_CLAIM = 600;
var BUILD_COST_TOUGH = 10;
**/

module.exports.loop = function () {
	
	for(var name in Memory.creeps) {
		var creep = Memory.creeps[name];
        if(!Game.creeps[name]) {
			if(creep.hasBuddy != undefined){
				if(creep.hasBuddy == true) {
					var buddy = creep.nameBuddy;
					Game.creeps[buddy].memory.hasBuddy = false;
					console.log(name + ": It was a good run my friend.");
					console.log(buddy + ": You better save me a good spot over there.");
				}
			}
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
		
		if(room.memory.numHarvesters < (room.memory.numSources - 3) && room.memory.numMiner == 0){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'Harvester'});
		}
		else if(room.memory.numMiner != 0 && room.memory.numHarvesters != 0){
			var Harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvester');
			console.log(Harvester[0].name + ": I am not needed any more goodbye world!")
			Harvester[0].suicide()
		}
		
		
		if(room.memory.numMiner < (room.memory.numSources - 3) && room.memory.numTransporter != 0){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'Miner'});
		}
		
		if(room.memory.numUpgrader < 2 && room.memory.numMiner != 0 && room.memory.numTransporter != 0){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'Upgrader'});
		}
		
		
		if(room.memory.numBuilder < 2 && room.memory.numMiner != 0 && room.memory.numTransporter != 0){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'Builder'});
		}
		
		
		if(room.memory.numTransporter < (room.memory.numHarvesters + room.memory.numBuilder + room.memory.numUpgrader + room.memory.numMiner)){
			var spawn = room.find(FIND_MY_SPAWNS)[0];
			var newName = spawn.createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'Transporter'});
		}
		
		var lonelyCreeps = _.filter(Game.creeps, (creep) => creep.memory.hasBuddy == false);
		var lonelyWorkers = _.filter(lonelyCreeps, (creep) => creep.memory.role != 'Transporter');
		var lonelyTransporters = _.filter(lonelyCreeps, (creep) => creep.memory.role == 'Transporter');
		
		if(lonelyWorkers.length != 0 && lonelyTransporters.length != 0){
			lonelyWorkers[0].memory.nameBuddy = lonelyTransporters[0].name;
			lonelyTransporters[0].memory.nameBuddy = lonelyWorkers[0].name;
			lonelyWorkers[0].memory.hasBuddy = true;
			lonelyTransporters[0].memory.hasBuddy = true;
			console.log(lonelyTransporters[0].name + " has made " + lonelyWorkers[0].name + " their buddy!");
		}
	}
	
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		
		if(creep.memory.hasBuddy == undefined){
			creep.memory.hasBuddy = false;
			console.log(creep.name +": I am lonely.");
		}
		
		if(creep.memory.hasBuddy == false){
			console.log(creep.name +": I am lonely.");
		}
		
		switch(creep.memory.role){
			case "Harvester":
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
				break;
			default:
				console.log(creep.name + ": I don't have a role!");
		}
	}
};