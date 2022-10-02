
const {v4: uuidv4} = require('uuid');

class Tarea{
	
	constructor(descr){
		this.id = uuidv4();
		this.descr = descr;
		this.ccmpletadoEn = null;
	}
	
	
}

module.exports = Tarea;