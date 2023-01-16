# WEB Pro
  
Modulo con funcionalidades extendidas para el navegador que funciona como complemento a los comandos de la seccion web  

*Read this in other languages: [English](Manual_webpro.md), [Portugues](Manual_webpro.pr.md), [Español](Manual_webpro.es.md).*
  
![banner](imgs/Banner_webpro.png)
## Como instalar este módulo
  
__Descarga__ e __instala__ el contenido en la carpeta 'modules' en la ruta de Rocketbot.  


## Como usar este modulo
Este modulo se complementa con los modulos y comandos nativos Web que ya vienen por defecto en Rocketbot. Para poder usar el modulo debes tener un navegador ya abierto desde Rocketbot con el comando de "Abrir Navegador". Luego de esto ya podremos utilizar los comandos con normalidad.
Para poder utilizar Edge en modo Internet Explorer, deben realizarse las siguientes configuraciones:
1. Configurar el navegador en base a la siguiente documentación: https://docs.rocketbot.com/?p=169
2. Descargar el driver de Internet Explorer del siguiente link: https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.3.0/IEDriverServer_Win32_4.3.0.zip y ubicarlo en Rocketbot/drivers/win/ie/x86/
3. Para poder acceder a las herramientas de desarrollador, se debe abrir IEChooser.exe. Para realizarlo presionar la tecla Windows + R y colocar lo siguiente: %systemroot%\system32\f12\IEChooser.exe  luego apretar aceptar. Seleccione la ventana de su navegador, y podrá explorar los elementos de la página


## Descripción de los comandos

### Lista de elementos
  
Obtiene una lista de todos los elementos y sus hijos a partir de una clase o nombre para poder iterar sobre ella.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Tipo Clases o atributo|En este campo debemos poner el tipo de clase o atributo que usaremos.|name|
|Clases o atributo|En este campo debemos poner el nombre de la clase o atributo que usaremos.|class|
|Tipo de Elemento/Objeto web|En este campo debemos poner el tipo de elemento que usaremos.|div|
|Variable donde almacenar resultado|En este campo debemos poner el nombre de la variable donde almacenaremos el resultado.|Variable|

### Limpia un input y envia el texto
  
Borra el contenido de un objeto tipo input y envia el texto
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Texto a enviar o variable|Colocamos el texto o la variable a enviar.|Texto o Variable|
|Dato a buscar|Colocamos el dato a buscar.|Dato a buscar|
|Tipo de dato|Seleccionamos el tipo de dato a buscar. Ya sea xpath, class, name, tag o id.|Dato a buscar|
|Enviar con teclas|Borra y escribe con teclas directamente.|Texto o Variable|

### Guardar Cookies
  
Guarda las cookies de una página para poder ser cargada en otra instancia
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Ruta al archivo donde se guardarán las cookies|En este campo indicamos la ruta al archivo donde se guardarán las cookies|C:/tmp/etc|
|Variable donde se guardará las cookies|En este campo indicamos el nombre de la variable donde se guardarán las cookies|cookies|

### Cargar Cookies
  
Carga un archivo con las cookies
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Ruta al archivo donde están guardadas las cookies|Seleccionamos la ruta del archivo donde están guardadas las cookies|C:/tmp/etc|
|Asignar resultado a variable|Variable donde se almacenará True o False dependiendo si se pudieron cargar las cookies|Variable|

### Recargar Página
  
Recarga una página
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
| --- | --- | --- |

### Volver atrás
  
Volver a la página anterior
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
| --- | --- | --- |

### Doble Click
  
Hace doble click sobre un objeto seleccionado
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector a buscar|Dato|
|Tipo de dato|Colocamos el tipo de dato a buscar|xpath|

### Scroll
  
Hace scroll hasta una posición determinada
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Posición|Elegimos la posición en píxeles|1500|

### Contar Elementos
  
Entrega el total de elementos
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Nombre de la clase|Nombre de la clase del elemento|Name class|
|Asignar resultado a variable|Nombre de la variable donde se guardará el resultado|Variable|

### Seleccionar Objeto por Index
  
Selecciona un objeto pasándole el index
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a Buscar|Colocamos el selector a buscar|form-control|
|Index|Colocamos el index a buscar|1|
|Tipo de dato|Seleccionamos el tipo de dato a buscar|name|

### Clickear Objeto por Index
  
Clickea un objeto pasándole el index
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a Buscar|Colocamos el selector del dato a clickear.|form-control|
|Index|Colocamos el index del dato a clickear.|1|
|Tipo de dato|Colocamos el tipo de dato a clickear.|class|

### Exportar página a PDF
  
Exporta la página a un archivo PDF. Si la página contiene elementos fijos, pueden eliminarse con Javascript para obtener una correcta exportación.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Ruta y nombre del Archivo|Seleccionamos la ruta y el nombre del archivo a guardar, sin la extension .pdf|path/to/file.pdf|
|Borrar cabecera fija|Si el sitio web contiene una cabecera fija, marca la casilla para eliminarla y que no se repita en cada captura. El comando busca la etiqueta header, si no la encuentra arrojará un error, en caso de que no funcione hay que desmarcarla.|True|
|Asignar resultado a variable|Seleccionamos el nombre de la variable a la que queremos asignar el resultado|Variable|

### Abrir Chrome en modo headless
  
Abre Chrome en modo Headless
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Url de Servidor|Escribimos la URL de la pagina a abrir.|http://www.rocketbot.co|

### Tomar captura por coordenadas
  
Toma una captura de pantalla a una sección de la página mediante coordenadas
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Posición|Coordenadas de la sección de la página|x,y|
|Dimensiones|Dimensiones de la sección de la página|ancho, alto|
|Ruta y nombre donde se guardará la imagen|Ruta y nombre donde se guardará la imagen|/Users/User/folder/image.jpg|

### Obtener rectangulo delimitador
  
Obtiene coordenadas x e y, y dimensiones de un objeto
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del elemento a obtener.|Data|
|Tipo de dato|Seleccionamos el tipo de dato a buscar.|xpath|
|Variable donde almacenar resultado|Nombre de variable sin {}|Variable|

### Obtener coordenadas de un objeto
  
Obtiene coordenadas x e y de un objeto
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del elemento a seleccionar|Data|
|Tipo de dato|Seleccionamos el tipo de dato a buscar|xpath|
|Variable donde almacenar resultado|Nombre de variable sin {}|Variable|

### Obtener dimensiones de un objeto
  
Obtiene dimensiones de un objeto
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del elemento a seleccionar|Data|
|Tipo de dato|Seleccionamos el tipo de dato a buscar|xpath|
|Variable donde almacenar resultado|Nombre de variable sin {}|Variable|

### Abrir Chrome modo desarrollador 
  
Abre Google Chrome en modo seguro o modo debugger
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Url de Servidor|Url de la pagina a abrir|http://www.rocketbot.co|
|Modo|Seleccionamos el modo en que se va abrir el navegador.|Debugger|

### Ver Consola
  
Obtiene información desde la consola
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Variable donde almacenar resultado|Nombre de la variable donde almacenar el resultado|Variable|
|Nivel |Nivel de información a mostrar|Severe|

### Convertir página a PNG
  
Toma multiples capturas de la página web y las concatena en una sola. Si la página contiene elementos fijos, pueden eliminarse con Javascript para obtener una correcta exportación.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Nombre|Nombre de la imagen a guardar|imagenWeb|
|Carpeta de descarga|Ruta donde se descargará la imagen generada|C:/Users/user/Desktop|

### Mover encima
  
Mueve el mouse encima de un elemento
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selecto del elemento al cual le haremos hover.|Data|
|Tipo de dato|Colocamos el tipo de dato que queremos buscar.|xpath|

### Abrir Edge (Chromium)
  
Abre el nuevo Edge basado en Chromium
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Url de Servidor|Url de la pagina a abrir en Edge|http://www.rocketbot.co|
|Iniciar en modo Internet Explorer|Inicia el navegador en modo Internet Explorer|True|
|Seleccionar ejecutable de Edge|Selecciona el ejecutable de Edge para abrir en modo IE|C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe|

### Click Pro
  
Hace click sobre un objeto seleccionado esperando que se encuentre cliqueable
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del elemento a hacer click.|Data|
|Tipo de dato|Seleccionamos el tipo de dato a buscar.|xpath|
|Esperar|Colocamos el tiempo en segundos que esperaremos a que el elemento se encuentre clickeable.|5|

### Extraer texto Pro
  
Obtiene el texto de un objeto esperando que este se encuentre disponible
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del elemento a extraer text.|Data|
|Tipo de dato|Seleccionamos el tipo de dato a buscar.|xpath|
|Esperar|Colocamos el tiempo en segundos que esperaremos a que el elemento este disponible.|5|
|Variable donde almacenar resultado|Colocamos el nombre de la variable donde almacenaremos el resultado.|Variable|

### Seleccionar objeto Pro
  
Selecciona un objeto esperando que se encuentre presente
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del elemento a seleccionar.|Data|
|Tipo de dato|Seleccionamos el tipo de dato a buscar.|xpath|
|Esperar|Colocamos el tiempo en segundos que esperaremos a que el elemento aparezca.|5|

### Cambiar a iframe Pro
  
Cambia a un iframe esperando que se encuentre presente
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del iframe|Data|
|Tipo de dato|Seleccionamos el tipo de dato|xpath|
|Esperar|Colocamos el tiempo de espera|5|

### Enviar Teclas
  
Similar a Enviar texto web, pero a más bajo nivel
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Texto|Texto a enviar|Texto|
|Tecla especial|Tecla especial a enviar|SPACE|

### Imprimir como PDF (Chrome)
  
Imprimir la página como PDF en Chrome. El PDF se genera en base al contenido disponible de la página. No representa una copia fiel del sitio.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|El pdf se descargará en la carpeta de descargas por defecto del navegador.|||

### Forzar Descarga
  
Forzar una descarga
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|URL Descarga|Colocamos la URL de descarga a forzar|http://www.web.test/file.csv|
|Nombre de archivo|Colocamos el nombre del archivo a forzar|file.csv|

### Abrir Nueva Pestaña
  
Abre una nueva pestaña indicando la URL
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|URL|URL a abrir en una nueva pestaña|http://www.google.com|

### Abrir navegador
  
Abre el navegador indicando la URL
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|URL|URL a abrir|http://www.google.com|
|Tiempo de espera|Tiempo de espera en segundos|5|
|Id|Id del navegador|4|
|Carpeta de perfil|Ruta de la carpeta de perfil de usuario para abrir el navegador|C:/folder|
|Carpeta de descargas|Ruta de la carpeta de descargas para el navegador abierto|C:/folder|
|Forzar descargas|Fuerza las descargas para hacerlas automaticas|True|
|Opciones para Chrome|Opciones para el navegador|{'download.default_directory': download_path}|

### Drag and drop
  
Realiza un drag and drop
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Origen|Origen del elemento|source|
|Destino|Destino del elemento|target|
|Tipo de dato|Tipo de dato a buscar|Dato a buscar|

### Subir Archivo
  
Comando para subir uno o más archivos a un input de tipo file. Solo completar un unico valor según cuántos archivos se deseen subir.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector del elemento donde se subira el archivo|Data|
|Tipo de dato|Tipo de dato a buscar|xpath|
|Cargar solo un único campo de los siguientes. Si se desea subir un solo archivo, utilizar el primer selector, si se desean cargar más de uno, cargar el segundo selector con el formato indicado.|||
|Cargar un solo archivo|Seleccionamos los archivos a subir|C:/Users/user/file1.pdf|
|Cargar múltiples archivos|Seleccionamos los archivos a subir|['C:/Users/user/file1.pdf', 'C:/Users/user/file2.pdf']|

### Enviar combinacion de teclas
  
Comando para enviar combinacion de dos teclas
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Primera tecla especial|Primer tecla especial a combinar con una letra/numero o con una segunda tecla especial|SPACE|
|Letra o numero|Letra o numero a combinar con la primera tecla de ser necesario.|A|
|Segunda tecla especial|Segunda tecla especial a combinar con la primera tecla de ser necesario.|SPACE|

### Click Derecho
  
Hace click derecho sobre un objeto seleccionado
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Dato a buscar|Colocamos el selector a buscar|Dato|
|Tipo de dato|Colocamos el tipo de dato a buscar|xpath|
