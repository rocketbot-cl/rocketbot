



# Rocketbot Xperience
  
Module for Rocketbot Forms  
  
![banner](imgs/Banner_Forms.jpg)
## Como instalar este módulo
  
__Descarga__ e __instala__ el contenido en la carpeta 'modules' en la ruta de rocketbot.  



## Descripción de los comandos

### Login NOC
  
Inicie sesión en NOC utilizando unda de las opciones, API Key, archivo noc.ini o credenciales.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|URL Servidor|URL del servidor a donde se conecta|https://roc.myrb.io/|
|Seleccione un metodo para conectarse al Orquestador|Opciones para iniciar sesión en R.O.C, se puede usar las credenciales del usuario, API Key o seleccionando archivo noc.ini||
|Asignar resultado a Variable|Variable donde se almacenara el estado de la conexion, devuelve True si es exitosa o False en el caso contrario|Variable|

### Obtener cola de trabajo de Forms
  
Obtiene las colas de trabajo
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Form Token|Form Token|8YWUW8AXAV3UPNKY|
|Asignar a variable|Variable donde guardar resultado sin {}|var|

### Obtener datos de Forms
  
Obtener datos de formulario de la cola de trabajo
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|ID cola de trabajo|ID de la cola de trabajo|1|
|Form Token|Token del formulario|8YWUW8AXAV3UPNKY|
|Asignar a variable|Variable donde guardar resultado sin {}|var|

### Descarga archivo
  
Descarga un archivo subido a un formulario
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|ID cola de trabajo|ID de la cola de trabajo|1|
|Archivo|Variable que tiene la ruta del archivo del formulario||
|Guardar archivo en|Ruta donde se guardará el archivo|C:\Rocketbot\file.ini|

### Actualizar estado de la cola Form
  
Cambia el estado de la cola
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Estado|Seleccione el estado de la cola||
|ID cola de trabajo|Ingrese el ID de la cola de trabajo|1|
|Asignar a variable|Nombre de variable sin {} donde se guardara el resultado||

### Devolver Mensaje a Xperience
  
Devuelve un mensaje al formulario Xperience
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Token Xperience|Token de Xperience|{xperience}|
|Mensaje a devolver|Mensaje a devolver||
