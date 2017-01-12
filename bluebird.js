var _ = require('underscore-node_bbo');
var Promise = require('bluebird');


Promise.map_without_rejection = function(array,mapper) {

	var result_final = {};
	var counter = 0;

	return new Promise((resolve,reject) => {

		var check_final_callback = function() {
			counter++;
			console.log('check_final_callback',counter,_.size(array))
			if (counter == _.size(array)) {
				resolve(result_final);
			}
		}

		_.each(array,(object,index) => {

			mapper(object,index).then(result => {
				result_final[index] = result;
				check_final_callback();			
			}).catch(err => {
				result_final[index] = undefined;
				check_final_callback();
			});

		})


	})


	
}

module.exports = Promise;
