var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
		
		var controller = creep.room.controller;
		
		if(!creep.pos.isNearTo(controller)){
			creep.moveTo(controller, {reusePath: 50});
		}
		else{
			if(creep.carry.energy > 0){
				creep.upgradeController(controller);
			}
		}
    }
};

module.exports = roleUpgrader;