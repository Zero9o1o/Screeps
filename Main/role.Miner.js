var roleMiner = {
	run: function(creep){
	    var sources = creep.pos.findClosestByRange(FIND_SOURCES);
	    creep.memory.sourceId = sources.id;
		
		var source = Game.getObjectById(creep.memory.sourceId);
		
	    if(creep.pos.isNearTo(source)){
			//console.log(creep.name + " Is near Source");
			//console.log(source);
		}
		else if(creep.pos.isNearTo(source) != true){
			//console.log(creep.name + " Is not near Source");
		    creep.moveTo(source);
		}
		else{
			console.log("Error: [" + creep.name + "] Something went wrong with isNearTo if and else if statements. Running else statement!")
		}
	}	
};

module.exports = roleMiner;