// Constantes para toda la aplicación

// Hospitales por defecto en la base de datos
var defaultHospitalList= [
	{ name: "Virgen de la Paloma", lat: 40.445012, lon: -3.715859, address: "Calle de la Loma, 1", web: "http://www.hospitalvpaloma.com/"},
	{ name: "Fundación Jiménez Díaz", lat: 40.438586,lon: -3.718879, address: "Avda. Reyes Católicos, 2", web: "http://www.fjd.es/"},
	{ name: "Cruz Roja San José", lat: 40.44747, lon: -3.707678, address:"Av de la Reina Victoria, 22-24", web: "http://www.madrid.org/cs/Satellite?language=es&pagename=HospitalCruzRojaSanJoseSantaAdela/Page/HCRU_home"},
	{ name: "H. Clínico Universitario San Carlos", lat: 40.43986, lon: -3.718875, address: "Calle Profesor Martín Lagos, 2", web: "http://www.madrid.org/cs/Satellite?language=es&pagename=HospitalClinicoSanCarlos/Page/HCLN_home"},
	{ name: "Clínica Moncloa", lat: 40.433266, lon: -3.733974, address: "Av. de Valladolid, 83", web: "https://plus.google.com/118445226416247331755/about?gl=es&hl=en"}
];
// Nombre del ObjectStore que contiene los hospitales en la base de datos IndexedDB
var DB_HOSPITALS_HEADER="hospitals";
// Versión de la base de datos. Incrementar en 1 si se modifica la estructura o los valores por defecto de la base de datos
var DB_VERSION=8;
// Número de hospitales cercanos mostrados
var HOSPITALS_SHOWN=3;
