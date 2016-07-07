var roleTransporter = {
	run: function(creep){
		
		var structures = creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
	    creep.memory.structureId = structures.id;
		
		var creepHas = creep.carry.energy;
		var creepMax = creep.carryCapacity;
		creep.memory.canCarry = (creepMax - creepHas);
		if(creep.memory.hasBuddy == true){
			var myBuddy = creep.memory.nameBuddy;
			var myBuddyRole = Game.creeps[myBuddy].memory.role;
			if(myBuddyRole == "Miner") {
				if(creep.carry.energy < creep.carryCapacity) {
					creep.moveTo(Game.creeps[myBuddy]);
				}
				else{
					creep.moveTo(structures);
					var structureEnergy = structures.energy;
					var structureEnergyMax = structures.energyCapacity;
					var structureCanTake = (structureEnergyMax - structureEnergy);
					if(structures.energyCapacity <= creep.carryCapacity){
						creep.transfer(structures, RESOURCE_ENERGY, creep.carryCapacity);
					}
					else{
						creep.transfer(structures, RESOURCE_ENERGY, structureCanTake);
					}
				}
			}
		}
	}	
};

module.exports = roleTransporter;