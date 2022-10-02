
require('colors')

const {
	inquireMenu, 
	inquirePausa, 
	leerInput,
	listadoBorrar,
	confirmar,
	borrarListado,
	listadoCheckList
	} = require ('./helpers/inquirer')
const Tarea = require('./models/tarea');

const {
	Tareas
}	= require('./models/tareas');

const {guardarArchivo, leerDB} = require ('./helpers/guardarArchivo.js');

const main = async()=>{

	let opcion = '';
	let tareas = new Tareas();
	let data = leerDB();
	//data es ya un objeto que puede usarse como el _listado
	
	if(data){
		tareas._listado = data;
	}

	while(opcion !=='0'){
		opcion = await inquireMenu();
		switch(opcion){
			case '1':
				let input1 = await leerInput('Ingresa el numbre de la tarea');
				
				await tareas.agregarTarea(input1);
				console.log('Tarea agregada');
				inquirePausa();
			break;
			case '2':
				console.log('Listado de todas las tareas');
				tareas.listarTareas(true);
				await inquirePausa();
//				
			break;
			case '3':
				console.log('Listado de lareas completadas');
				tareas.listarPorTipo();
				await inquirePausa();
			break;

			case '4':
				console.log('Listado de lareas pendientes');
				tareas.listarPorTipo(false);
				await inquirePausa();
			break;

			case '5':
				console.log('Listado de lareas a seleccionar');
				const ids = await listadoCheckList(tareas.listados);
				tareas.toggleTareas(ids);
				await inquirePausa();
			break;

			case '6':
				console.log('Borrar tarea');
				id = await listadoBorrar(tareas.listados);
//				console.log(`Borrar id ${ id }`);
				if(id!=='0'){
					const siono = await confirmar('Presione '+'y'.red+' para confirmar');
					if(siono){
						tareas.borrarListado(id);
						guardarArchivo
					}
					else console.log('Tarea no borrada');
				}
				await inquirePausa();
			break;
			
		}
		
//		guardarArchivo(JSON.stringify(tareas.listados));
	}


/*
let unatarea = new Tarea('Comprar comida');
console.log(unatarea);
otratarea = new Tarea('Lavar el carro');
let lastareas = new Tareas();
lastareas._listado[unatarea.id] = unatarea;
lastareas._listado[otratarea.id] = otratarea;

console.log(lastareas);
*/
}



main();







