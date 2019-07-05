# Entorno de desarrollo front
Este es un entorno que incluye las principales tareas para el desarrollo front


## Prerrequisitos
 - Installar node: https://nodejs.org/es/
 - Installar bower mediante node:

    Abrir la linea de comandos y ejecutar
    ```
    npm install -g bower
    ```
 - clonar este repositorio:

   ```
   git clone https://github.com/ezevmor/front-environment.git
   ```

## Instalación
Abrir la carpeta del proyecto e instalar las dependencias desde la linea de comandos:

```
npm install & bower install
```



## Ejecución
Para abrir la aplicación en el navegador y habilitar la recarga automatica al modificar el codigo, ejecutar en la linea de comandos:

```
gulp
```



## Creación de distribución para producción
Para crear una version minificada y ofuscada del código ejecutar en linea de comandos:

```
gulp prod
```

Esto creará una nueva compilación para desarrollo en la carpeta **dist/**.



## Configuración de las variables de entorno
Las variables de entorno estan definidas en el archivo **env.js** dentro de la carpeta **src/** (en desarrollo) o en la carpeta de la compilacion (en produccion)

```
(function (window) {

    // pro = produccion, beta = prueba, 2.6 version farmatools,
    // añomesdia, parche en el dia.
    window.__env.version = 'pro.2.6.20171213.3';

    // direccion del servidor back
    window.__env.apiUrl = 'http://myapyurlpath/';

    // ruta del archivo minificado y ofuscado de la aplicacion
    window.__env.load = 'js/app.min.js'

}(this));
```


Para cambiar de llamada a servicios back a llamada a archivos json se debe cambiar el valor de la variable **window.__env.apiUrl** y agregar la variable **window.__env.mode**:

```
window.__env.apiUrl = 'json/';
window.__env.mode = 'mock';
```

La variable **window.__env.load** solo afecta en produccion y se puede habilitar la depuración de la parte front desde el navegador cambiando su valor a:

```
window.__env.load = 'js/app.min.mapped.js'
```