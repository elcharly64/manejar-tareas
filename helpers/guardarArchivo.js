
fs = require('fs');

let archivo = './DB/data.json';


const guardarData = async (data) =>{
	fs.writeFileSync(archivo, data);
}

const leerDB = ()=>{
	info = fs.readFileSync(archivo);
	return JSON.parse(info);
}


module.exports ={
	guardarData,
	leerDB
};