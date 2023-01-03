# WEB Pro
  
Modulo con funcionalidades extendidas para el navegador que funciona como complemento a los comandos de la seccion web  

*Read this in other languages: [English](README.md), [Portugues](README.pr.md), [Español](README.es.md).*

## Como instalar este módulo
  
__Descarga__ e __instala__ el contenido en la carpeta 'modules' en la ruta de Rocketbot.  


## Como usar este modulo
Este modulo se complementa con los modulos y comandos nativos Web que ya vienen por defecto en Rocketbot. Para poder usar el modulo debes tener un navegador ya abierto desde Rocketbot con el comando de "Abrir Navegador". Luego de esto ya podremos utilizar los comandos con normalidad.


## Overview


1. Lista de elementos  
Obtiene una lista de todos los elementos y sus hijos a partir de una clase o nombre para poder iterar sobre ella.

2. Limpia un input y envia el texto  
Borra el contenido de un objeto tipo input y envia el texto

3. Guardar Cookies  
Guarda las cookies de una página para poder ser cargada en otra instancia

4. Cargar Cookies  
Carga un archivo con las cookies

5. Recargar Página  
Recarga una página

6. Volver atrás  
Volver a la página anterior

7. Doble Click  
Hace doble click sobre un objeto seleccionado

8. Scroll  
Hace scroll hasta una posición determinada

9. Contar Elementos  
Entrega el total de elementos

10. Seleccionar Objeto por Index  
Selecciona un objeto pasándole el index

11. Clickear Objeto por Index  
Clickea un objeto pasándole el index

12. Exportar página a PDF  
Exporta la página a un archivo PDF. Si la página contiene elementos fijos, pueden eliminarse con Javascript para obtener una correcta exportación.

13. Abrir Chrome en modo headless  
Abre Chrome en modo Headless

14. Tomar captura por coordenadas  
Toma una captura de pantalla a una sección de la página mediante coordenadas

15. Obtener rectangulo delimitador  
Obtiene coordenadas x e y, y dimensiones de un objeto

16. Obtener coordenadas de un objeto  
Obtiene coordenadas x e y de un objeto

17. Obtener dimensiones de un objeto  
Obtiene dimensiones de un objeto

18. Abrir Chrome modo desarrollador   
Abre Google Chrome en modo seguro o modo debugger

19. Ver Consola  
Obtiene información desde la consola

20. Convertir página a PNG  
Toma multiples capturas de la página web y las concatena en una sola. Si la página contiene elementos fijos, pueden eliminarse con Javascript para obtener una correcta exportación.

21. Mover encima  
Mueve el mouse encima de un elemento

22. Abrir Edge (Chromium)  
Abre el nuevo Edge basado en Chromium

23. Click Pro  
Hace click sobre un objeto seleccionado esperando que se encuentre cliqueable

24. Extraer texto Pro  
Obtiene el texto de un objeto esperando que este se encuentre disponible

25. Seleccionar objeto Pro  
Selecciona un objeto esperando que se encuentre presente

26. Cambiar a iframe Pro  
Cambia a un iframe esperando que se encuentre presente

27. Enviar Teclas  
Similar a Enviar texto web, pero a más bajo nivel

28. Imprimir como PDF (Chrome)  
Imprimir la página como PDF en Chrome. El PDF se genera en base al contenido disponible de la página. No representa una copia fiel del sitio.

29. Forzar Descarga  
Forzar una descarga

30. Abrir Nueva Pestaña  
Abre una nueva pestaña indicando la URL

31. Abrir navegador  
Abre el navegador indicando la URL

32. Drag and drop  
Realiza un drag and drop

33. Subir Archivo  
Comando para subir uno o más archivos a un input de tipo file. Solo completar un unico valor según cuántos archivos se deseen subir.

34. Enviar combinacion de teclas  
Comando para enviar combinacion de dos teclas

35. Click Derecho  
Hace click derecho sobre un objeto seleccionado  



### Changes
Mon May 2 16:53:22 2022  Merge from QA - Merge pull request from rocketbot-cl
Thu Aug 19 13:24:01 2021  Merge branch master of github.com:rocketbot-cl/webpro
Fri Apr 24 16:28:55 2020  Merge branch master of https://github.com/rocketbot-cl/webpro
Wed Mar 11 14:24:59 2020  Merge branch master of https://github.com/rocketbot-cl/webpro

----
### OS

- windows
- mac
- linux
- docker

### Dependencies
- [**beautifulsoup4**](https://pypi.org/project/beautifulsoup4/)- [**requests**](https://pypi.org/project/requests/)
### License
  
![MIT](https://camo.githubusercontent.com/107590fac8cbd65071396bb4d04040f76cde5bde/687474703a2f2f696d672e736869656c64732e696f2f3a6c6963656e73652d6d69742d626c75652e7376673f7374796c653d666c61742d737175617265)  
[MIT](http://opensource.org/licenses/mit-license.ph)