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
		console.log(creep + " -> " + Closest);
		
		var creepHas = creep.carry.energy;
		var creepMax = creep.carryCapacity;
		creep.memory.canCarry = (creepMax - creepHas);
		if(creep.memory.hasBuddy == true){
			var myBuddy = creep.memory.nameBuddy;
			var myBuddyObj = Game.creeps[myBuddy];
			var myBuddyMem = myBuddyObj.memory;
			
			console.log(creep + " -> " + myBuddyMem.role);
			if(myBuddyMem.role == "Miner") {
				if(creep.carry.energy < creep.carryCapacity) {
					creep.moveTo(myBuddyObj);
				}
				else{
					creep.moveTo(Closest[0]);
					var structureEnergy = Closest[0].energy;
					var structureEnergyMax = Closest[0].energyCapacity;
					var structureCanTake = (structureEnergyMax - structureEnergy);
					if(Closest[0].energyCapacity > creep.carryCapacity){
						creep.transfer(Closest[0], RESOURCE_ENERGY, creep.carryCapacity);
					}
					else{
						creep.transfer(Closest[0], RESOURCE_ENERGY, structureCanTake);
					}
				}
			}
			
			console.log(myBuddyMem.role == "Upgrader" && creep.room.memory.numMiner != 0);
			if(myBuddyMem.role == "Upgrader" && creep.room.memory.numMiner != 0){
				if(creep.memory.canCarry > 0) {
					creep.moveTo(myBuddyObj);
					if(myBuddy.canCarry < creepHas){
						creep.transfer(myBuddyObj, RESOURCE_ENERGY, myBuddy.canCarry);
					}
					else{
						creep.transfer(myBuddyObj, RESOURCE_ENERGY, creepHas);
					}
				}
				else{
					
					creep.moveTo(Closest[0]);
					var structureEnergy = Closest[0].energy;
					var structureEnergyMax = Closest[0].energyCapacity;
					var structureCanTake = (structureEnergyMax - structureEnergy);
					if(structureEnergy > creep.memory.canCarry){
						Closest[0].transferEnergy(creep, RESOURCE_ENERGY, creep.memory.canCarry);
					}
					else{
						Closest[0].transferEnergy(creep, RESOURCE_ENERGY, structureEnergy);
					}
				}
			}
		}
		else{
			if(creep.carry.energy != 0){
				creep.moveTo(Closest[0]);
				var structureEnergy = Closest[0].energy;
				var structureEnergyMax = Closest[0].energyCapacity;
				var structureCanTake = (structureEnergyMax - structureEnergy);
				if(Closest[0].energyCapacity > creep.carryCapacity){
					creep.transfer(Closest[0], RESOURCE_ENERGY, creep.carryCapacity);
				}
				else{
					creep.transfer(Closest[0], RESOURCE_ENERGY, structureCanTake);
				}
			}
		}
	}	
};

module.exports = roleTransporter;