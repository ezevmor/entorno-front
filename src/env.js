(function (window) {
    window.__env = window.__env || {};
    window.__env.version = 'pro.2.6.20171213.3';
    
    //solo si se quiere usar mocks
    window.__env.mode = 'mock';
    window.__env.apiUrl = 'json/';

    //configuracion del endpoint (cuando no se esta usando mocks o en produccion):
    //window.__env.apiUrl = 'http://myapyurlpath/'; //servidor back

    //solo para produccion
    //window.__env.load = 'js/app.min.js' // fichero minificado
    //window.__env.load = 'js/app.min.mapped.js' // fichero minificado con sourcemaps para facilitar la depuracion
}(this));
