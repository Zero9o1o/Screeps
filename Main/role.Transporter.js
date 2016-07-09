var roleTransporter = {
	run: function(creep){
		
		var Closest = [];
			
		var storages = creep.room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_STORAGE }
		});
		if(storages.length != 0){
			Closest = storages;
		}
		var extensions = creep.room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_EXTENSION }
		});
		if(extensions.length != 0){
			Closest = extensions;
		}
		var spawners = creep.room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_SPAWN }
		});
		if(spawners.length != 0){
			Closest = spawners;
		}		
		var creepHas = creep.carry.energy;
		var creepMax = creep.carryCapacity;
		creep.memory.canCarry = (creepMax - creepHas);
		if(creep.memory.hasBuddy == true){
			var myBuddy = creep.memory.nameBuddy;
			var myBuddyObj = Game.creeps[myBuddy];
			var myBuddyMem = myBuddyObj.memory;
			var myBuddyCanCarry = (myBuddyObj.carryCapacity - myBuddyObj.carry.energy);
			
			if(myBuddyMem.role == "Miner") {
				if(creep.carry.energy < creep.carryCapacity) {
					//creep.moveTo(myBuddyObj);
					creep.moveTo(myBuddyObj, {reusePath: 50});
				}
				else{
					//creep.moveTo(Closest[0]);
					creep.moveTo(Closest[0], {reusePath: 50});
					var structureEnergy = Closest[0].energy;
					var structureEnergyMax = Closest[0].energyCapacity;
					var structureCanTake = (structureEnergyMax - structureEnergy);
					if(structureCanTake > creep.carryCapacity){
						creep.transfer(Closest[0], RESOURCE_ENERGY, creep.carryCapacity);
					}
					else{
						creep.transfer(Closest[0], RESOURCE_ENERGY, structureCanTake);
					}
				}
			}
			
			if(myBuddyMem.role == "Upgrader" && creep.room.memory.numMiner == (creep.room.memory.numSources - 3 + creep.room.memory.numUpgrader) && creep.room.memory.numTransporter == (creep.room.memory.numHarvesters + creep.room.memory.numBuilder + creep.room.memory.numUpgrader + creep.room.memory.numMiner)){
				if(creep.carry.energy > 0) {
					//creep.moveTo(myBuddyObj);
					creep.moveTo(myBuddyObj, {reusePath: 50});
					if(myBuddyCanCarry < creep.carry.energy){
					    
						creep.transfer(myBuddyObj, RESOURCE_ENERGY, myBuddy.canCarry);
					}
					else{
						creep.transfer(myBuddyObj, RESOURCE_ENERGY, creep.carry.energy);
					}
				}
				else if(creep.carry.energy != creep.carryCapacity){
					
					//creep.moveTo(Closest[0]);
					creep.moveTo(Closest[0], {reusePath: 50});
					var structureEnergy = Closest[0].energy;
					var structureEnergyMax = Closest[0].energyCapacity;
					var structureCanTake = (structureEnergyMax - structureEnergy);
					if(structureEnergy > creep.memory.canCarry){
						Closest[0].transferEnergy(creep, creep.memory.canCarry);
					}
					else{
						Closest[0].transferEnergy(creep, structureEnergy);
					}
				}
			}
		}
	}	
};

module.exports = roleTransporter;