// Controla los botones de la pantalla principal

$(document).ready(function() {
    $("#sos-call").click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $.getJSON('http://ws.geonames.org/countryCode', {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                type: 'JSON'
                }, function(result) {
                    var phone;
                    switch (result.countryCode) {
                    case 'US':
                        phone='911';
                        break;
                    case 'ES':
                        phone='112';
                        break;
                    case 'CN':
                        phone='120';
                        break;
                    default:
                        phone='112';
                }
                var call = new MozActivity({
                    name: "dial",
                    data: {
                        number: phone
                    }
                });
        });
    });
    }
    });
    $("#hospitals").click(function() {
        window.location.href="hospitals.html";
    });
    $("#first-aid-guide").click(function() {
    	window.open('http://www.madrid.es/UnidadesDescentralizadas/Emergencias/Samur-PCivil/Samur/Apartados-secciones/6-%20Descargas%20y%20Publicaciones/Ficheros/Guia_PrimerosAuxilios_SAMUR.pdf', '_blank').focus();
    });
    $("#add-hospital").click(function() {
        window.location.href="add-hospital.html";
    });
    $("#remove-hospital").click(function() {
        window.location.href="remove-hospital.html";
    });
});
