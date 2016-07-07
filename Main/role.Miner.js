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
	}	
};

module.exports = roleMiner;