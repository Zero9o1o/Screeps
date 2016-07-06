var roleMiner = {
	run: function(creep){
	    var sources = creep.room.find(FIND_SOURCES);
	    
	    switch(creep.pos.isNearTo(sources)){
	        case true:{
	            console.log(creep.name + " Is near Source");
	            break;
	        }
	        case false:{
	            console.log(creep.name + " Is not near Source");
		        creep.moveTo(sources[0]);
		        break;
	        }
	        default:{
	            console.log("Default State");
	        }
	    }
	}	
};

module.exports = roleMiner;