var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
		
		var controller = creep.room.controller;
		
		if(!creep.pos.isNearTo(controller)){
			creep.moveTo(controller);
		}
		else{
			if(creep.carry.energy > 0){
				creep.upgradeController(controller);
			}
		}
    }
};

module.exports = roleUpgrader;