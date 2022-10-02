require ('colors')

const menu= ()=>{
	return new Promise((resolve)=>{
		console.log('\n\n\t*************************'.green)
		console.log('\t  Seleccione una opción'.red)
		console.log('\t*************************'.green)
		console.log(`\n\t${'1:'.red} ${'Crear tarea'.blue}`)
		console.log(`\n\t${'2:'.red} ${'Listar tareas'.blue}`)
		console.log(`\n\t${'3:'.red} ${'Listar tareas completadas'.blue}`)
		console.log(`\n\t${'4:'.red} ${'Listar tareas pendietnes'.blue}`)
		console.log(`\n\t${'5:'.red} ${'Completar tarea(s)'.blue}`)
		console.log(`\n\t${'6:'.red} ${'Eliminar tarea'.blue}`)
		console.log(`\n\t${'0:'.red} ${'Salir\n\n'.blue}`)
		
		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});
		
		let opcion;
		
		readline.question('Seleccione una opción: ',(opcion)=>{
			readline.close();
			resolve(opcion);
		});
		
	})
}

const pausa = ()=>{
	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	});
	
	readline.question(`Presione ${'ENTER'.red} para continuar `,(carac)=>{
		readline.close();
	});
	
}






module.exports = {
	menu,
	pausa
}