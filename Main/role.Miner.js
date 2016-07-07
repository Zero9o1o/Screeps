var roleMiner = {
	run: function(creep){
	    var sources = creep.pos.findClosestByRange(FIND_SOURCES);
	    creep.memory.sourceId = sources.id;
		
		var source = Game.getObjectById(creep.memory.sourceId);
		
		if(!creep.pos.isNearTo(source)){
			creep.moveTo(source);
		}
		
		if(creep.carry.energy < creep.carryCapacity) {
            creep.harvest(source);
        }
		else{
			if(creep.memory.hasBuddy == true){
				var myBuddy = creep.memory.nameBuddy;
				var myBuddyObj = Game.creeps[myBuddy];
				if(creep.pos.isNearTo(myBuddyObj)){
					if(myBuddyObj.memory.canCarry >= creep.carryCapacity){
						creep.transfer(myBuddyObj, RESOURCE_ENERGY, creep.carryCapacity);
					}
					else{
						creep.transfer(myBuddyObj, RESOURCE_ENERGY, myBuddyObj.memory.canCarry);
					}
				}
			}
		}
	}	
};

module.exports = roleMiner;