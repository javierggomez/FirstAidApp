// Permite añadir un hospital a la base de datos
$(document).ready(function() {
	// Acceso a la base de datos IndexedDB de hospitales

	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	var request=window.indexedDB.open("firstaidapp-hospitals", DB_VERSION);
	var db_hospitals;
	request.onerror=function(event) {
		alert("Error abriendo la base de datos");
	}

	// Se ejecuta si hay un cambio de versión de la base de datos.
	request.onupgradeneeded=function(event) {
		var db_hospitals=event.target.result;
		db_hospitals.onerror=function(event) {
			alert("Error en el acceso a la base de datos: "+event.target.errorCode);
		}
		if (event.oldVersion>=1) {
			db_hospitals.deleteObjectStore(DB_HOSPITALS_HEADER);
		}
		var objectStore_hospitals=db_hospitals.createObjectStore(DB_HOSPITALS_HEADER, {keyPath: "id", autoIncrement: true});
		objectStore_hospitals.createIndex("id", "id", {unique: true});
		objectStore_hospitals.createIndex("name", "name", {unique: false});
		for (var i in defaultHospitalList) {
			objectStore_hospitals.add(defaultHospitalList[i]);
		}
	}

	request.onsuccess=function(result) {
		db_hospitals=request.result;
		$('#button-add-hospital').click(function() {
			// Comprobar campos
			var h_name=$('#hospital-name').val();
			if (!h_name) {
				alert("Introduzca el nombre del hospital");
				return;
			}
			var h_lat=parseFloat($('#hospital-lat').val());
			if (!h_lat || h_lat>90.0 || h_lat<-90.0) {
				alert("La latitud del hospital debe ser un número entre -90 y 90");
				return;
			}
			var h_lon=parseFloat($('#hospital-lon').val());
			if (!h_lon || h_lon<-180.0 || h_lon>180.0) {
				alert("La longitud del hospital debe ser un número entre -180 y 180");
				return;
			}
			var h_address=$('#hospital-address').val();
			if (!h_address) {
				alert("Introduzca la dirección del hospital");
				return;
			}
			var h_web=$('#hospital-web').val();
			// Crear nuevo hospital y añadirlo a la base de datos
			var hospital={ name: h_name, lat: h_lat, lon: h_lon, address: h_address, web: h_web };
			var transaction=db_hospitals.transaction([DB_HOSPITALS_HEADER], "readwrite");
			transaction.onabort=function(event) {
				alert("Error añadiendo el hospital: "+event.target.errorCode);
			}
			var store=transaction.objectStore(DB_HOSPITALS_HEADER);
			var request_add=store.put(hospital);
			request_add.onsuccess=function(event) {
				history.back();
			};
		});              
	};	
});
