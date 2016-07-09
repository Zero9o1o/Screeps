var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
		var spawners = creep.room.find(FIND_MY_STRUCTURES, {
			filter: { structureType: STRUCTURE_SPAWN }
		});
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {reusePath: 50});
            }
        }
        else {
            if(creep.transfer(spawners[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawners[0],{reusePath: 50});
            }
        }
	}
};

module.exports = roleHarvester;