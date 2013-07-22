// Muestra los hospitales más cercanos

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

	// Se ejecuta si hay un cambio de versión de la base de datos
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

	

	// Obtiene la distancia entre un hospital y un punto arbitrario
    function getDistance(hospital, latlon) {
    	var latlonH=new google.maps.LatLng(hospital.lat, hospital.lon);
    	var distance=google.maps.geometry.spherical.computeDistanceBetween(latlon, latlonH);
		if (isNaN(distance)) distance=0;
		return distance;
    }
	request.onsuccess=function(result) {
		// Obtención de los hospitales de la lista
		db_hospitals=request.result;
		var hospitalList=[];
		var objectStore_hospitals=db_hospitals.transaction(DB_HOSPITALS_HEADER).objectStore(DB_HOSPITALS_HEADER);
		objectStore_hospitals.openCursor().onsuccess=function(event) {
			var hospitals_cursor=event.target.result;
			if (hospitals_cursor) {
				hospitalList.push(hospitals_cursor.value);
				hospitals_cursor.continue();
			} else {
				// Mostrar los más cercanos
				navigator.geolocation.getCurrentPosition(function (position) {
					var latlon=new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					var distances=new Array();
					for (var i in hospitalList) {
						hospitalList[i].distance=getDistance(hospitalList[i], latlon);
					}
					hospitalList.sort(function(a,b) {
						return (a.distance - b.distance);
					});
					var htmlList="";
					for (var i=0; i<HOSPITALS_SHOWN&&i<hospitalList.length; i++) {
						htmlList+=('<li><a target="_blank" href="'+hospitalList[i].web+'""><p>'+hospitalList[i].name+'</p><p class="italic">'
							+hospitalList[i].address+'  ('+hospitalList[i].distance.toFixed(0)+' m)</p></a></li>');
					}
					$('#hospitals-list').html(htmlList);
                },
                function (error) {
                    alert("No se pudo obtener la posición");
                    window.location.href="index.html";
                });
			}
		}
	}	
});
