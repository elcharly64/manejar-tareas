
const Tarea = require('./tarea');
const guardar = require('../helpers/guardarArchivo');

class Tareas{
	
	constructor(){
		this._listado = {};
	}
	
	agregarTarea(descr){
		let estaTarea = new Tarea(descr);
		this._listado[estaTarea.id] = estaTarea;
		guardar.guardarData(JSON.stringify(this._listado));
	}
	
	get listados(){
		//retorno un arreglo con las tareas a partir del objeto _listado
		let arreglo =[];
		Object.keys(this._listado).forEach((llaves =>{
			arreglo.push(this._listado[llaves]);
		}))
		return arreglo;
	}

	borrarListado(id=''){
		if(this._listado[id]){
			delete this._listado[id];
		}
		guardar.guardarData(JSON.stringify(this._listado));
	}
	
	convertirArregloAObjeto(arreglo = []){
		//convierto el arreglo de entrada y lo convierto en el objeto _listado
		arreglo.forEach(e =>{
			this._listado[e.id] = e;
		})
	}
	
	listarTareas(){
		console.log();
		let arregloTareas = this.listados;
		arregloTareas.forEach((e,i)=>{
			let completo = e.ccmpletadoEn !== null ? 'Completado'.green : 'Pendiente'.red;
			let idx = `${i+1}`.green;
			console.log(`${ idx } ${ e.descr } :: ${ completo }`);
		})
	}

	listarPorTipo(completadas = true){
		console.log();
		let indice = 1;
		let arregloTareas = this.listados;
		arregloTareas.forEach((e,i)=>{
			let completo = e.ccmpletadoEn !== null ? e.ccmpletadoEn.green : 'Pendiente'.red;
			if((e.ccmpletadoEn !== null) === completadas){
				let idx = `${indice}`.green;
				console.log(`${ idx } ${ e.descr } :: ${ completo }`);
				indice++;
			}
		})
	}

	toggleTareas(ids = []){
		ids.forEach(id =>{
			if(!this._listado[id].ccmpletadoEn){
				this._listado[id].ccmpletadoEn = new Date().toISOString();
			}
		})

		let tareas = this.listados;
		tareas.forEach(tarea =>{
			if(!ids.includes(tarea.id)){
				this._listado[tarea.id].ccmpletadoEn = null;
			}
		})
	}

}

module.exports = {
	Tareas
}