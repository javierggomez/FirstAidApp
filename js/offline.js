// Script a ejecutar en modo offline. Obtenido de Firefox OS Boilerplate App
// ( http://robnyman.github.com/Firefox-OS-Boilerplate-App/ )
(function () {
    var appCache = window.applicationCache;
    if (appCache) {
        appCache.onupdateready = function () {
            if (confirm("La aplicación se ha actualizado. Quiere descargar los últimos archivos? \nSi no los descarga ahora, se descargarán la próxima vez que lance la aplicación.")) {
                location.reload(true);
            }
        };

        var displayStatus = document.querySelector("#online-status");
        if (displayStatus) {
            appCache.onerror = function() {
                displayStatus.className = "offline";
                displayStatus.title = "Offline";
            };
            
        }
    }
})();
