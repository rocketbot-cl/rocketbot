# Zipper
  
Módulo para comprimir y descomprimir archivos encriptados.  

*Read this in other languages: [English](Manual_Zipper.md), [Spanish](Manual_Zipper.es.md).*
  
![banner](imgs/Banner_zipper.png)
## Como instalar este módulo
  
__Descarga__ e __instala__ el contenido en la carpeta 'modules' en la ruta de Rocketbot.  



## Descripción de los comandos

### Encriptar Zip
  
Crea un zip encriptado
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Archivo |Selecciona el archivo a encriptar|//Users/User/Path/to/file|
|Tipo de compresión |Selecciona el tipo de compresión|DEFLATED|
|Número de bits |Selecciona el número de bits|256 bits|
|Clave |Introduce la clave|s3cre7p4ss|
|Path where save zip |Introduce la ruta donde guardar el zip|//Users/User/path/to/newzip|

### Desencriptar Zip
  
Obtiene archivos de un zip encriptado
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Archivo |Archivo zip a desencriptar|//Users/User/Path/to/file|
|Clave |Clave del archivo zip|s3cre7p4ss|
|Ruta donde extraer el zip |Ruta donde extraer el zip|//Users/User/path/to/folder|
