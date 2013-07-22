// Permite eliminar un hospital de la base de datos

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
		// Obtener lista de hospitales
		db_hospitals=request.result;
		var hospitalList=[];
		var objectStore_hospitals=db_hospitals.transaction(DB_HOSPITALS_HEADER).objectStore(DB_HOSPITALS_HEADER);
		objectStore_hospitals.openCursor().onsuccess=function(event) {
			var hospitals_cursor=event.target.result;
			if (hospitals_cursor) {
				hospitalList.push(hospitals_cursor.value);
				hospitals_cursor.continue();
			} else {
				// Mostrar lista de hospitales
				var htmlList="";
				for (var i=0; i<hospitalList.length; i++) {
					htmlList+=('<li><a target="_blank" class="hospital-rm" id="hospital-'+hospitalList[i].id+'"><p>'+hospitalList[i].name+'</p><p class="italic">'
						+hospitalList[i].address+'</p></a></li>');
				}
				$('#hospitals-list').html(htmlList);
				$('.hospital-rm').click(function() {
					// Borrar hospital
					var id=this.id.split('-');
					var request_delete=db_hospitals.transaction([DB_HOSPITALS_HEADER], "readwrite").objectStore(DB_HOSPITALS_HEADER).delete(parseInt(id[1]));
					request_delete.onsuccess=function(event) {
						location.reload();
					}
				});   
			}
		}
	}	
});
