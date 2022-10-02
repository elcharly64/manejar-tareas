

const inquirer = require('inquirer');
require('colors');
let menuOpciones = [
	{
		type: "list",
		name: "patito",
		message: "¿Qué desea hacer?",
		choices: [
			{
				value: '1',
				name: `${'1.'.green} Crear tarea`
			},
			{
				value: '2',
				name: `${'2.'.green} Listar tareas`
			},
			{
				value: '3',
				name: `${'3.'.green} Listar tareas completadas`
			},
			{
				value: '4',
				name: `${'4.'.green} Listar tareas pendientes`
			},
			{
				value: '5',
				name: `${'5.'.green} Completar tarea`
			},
			{
				value: '6',
				name: `${'6.'.green} Borrar tarea`
			},
			{
				value: '0',
				name: `${'7.'.green} Salir del sistema`
			}
		]
	}
]

let pausaOpciones = [
	{
		type: "input",
		name: "pausa",
		message: "Presione"+"ENTER".red+" para continuar",
	}
]

const inquireMenu = async ()=>{

//esta vaina dejó de funcionar de repente :(
//	console.clear();
	console.log('\x1Bc');

	console.log('\n\n\t*************************'.green)
	console.log('\t  Seleccione una opción'.white)
	console.log('\t*************************\n\n'.green)

	const {patito} = await inquirer.prompt(
		menuOpciones
	);
	return patito;
}

const listadoBorrar = async (tareas = []) =>{
	console.log('\x1Bc');
	let arregloChoices = [];
	if(tareas.length>0){
		tareas.forEach((e,i) =>{
			let idx = `${i+1}. `.yellow;
			arregloChoices.push({
				value: e.id,
				name: idx+e.descr
			});
		});
	arregloChoices.unshift(
	{
		value: '0',
		name: '0. '.yellow+'Retornar'.blue,
	});

	}
	
	let opciones = 	{
		type: "list",
		name: "opcBorrar",
		message: "Seleccione tarea a borrar",
		choices: arregloChoices
	}
		
	let {opcBorrar} = await inquirer.prompt(opciones);
	return opcBorrar;
}


const inquirePausa = async ()=>{
	console.log('\n');
	await inquirer.prompt(
		pausaOpciones
	)
}


const leerInput = async (mensaje)=>{
	let question = {
		type: 'input',
		message: mensaje,
		name: 'descr',
		validate(value){
			if(value.length==0) return "Ingrese un texto, por favor";
			return true;
		}
	}
	
	const {descr} = await inquirer.prompt(question);
	return descr;
}

const confirmar = async (mensaje)=>{
	const preguntas = {
		type: 'confirm',
		message: mensaje,
		name: 'ok'
	}
	const {ok} = await inquirer.prompt(preguntas);
	return ok;
}

const listadoCheckList = async (tareas = []) =>{
	console.log('\x1Bc');
	let arregloChoices = [];
	if(tareas.length>0){
		tareas.forEach((e,i) =>{
			let idx = `${i+1}. `.yellow;
			let completadas = e.ccmpletadoEn !== null ? true: false;
			arregloChoices.push({
				value: e.id,
				name: idx+e.descr,
				checked: completadas
			});
		});

	}
	
	let opciones = 	{
		type: "checkbox",
		name: "ids",
		message: "Seleccione tarea(s)",
		choices: arregloChoices
	}
		
	let {ids} = await inquirer.prompt(opciones);
	return ids;
}

module.exports = {
	inquireMenu,
	inquirePausa,
	leerInput,
	listadoBorrar,
	confirmar,
	listadoCheckList
}
