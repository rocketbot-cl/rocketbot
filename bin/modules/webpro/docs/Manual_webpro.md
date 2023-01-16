# WEB Pro
  
Module with extended functionalities for the browser that works as a complement to the commands of the web section  

*Read this in other languages: [English](Manual_webpro.md), [Portugues](Manual_webpro.pr.md), [Español](Manual_webpro.es.md).*
  
![banner](imgs/Banner_webpro.png)
## How to install this module
  
__Download__ and __install__ the content in 'modules' folder in Rocketbot path  


## How to use this module
This module complements the native Web modules and commands that come by default in Rocketbot. In order to use the module you must have a browser opened from Rocketbot with the "Open Browser" command. After that, you will be able to use the commands.
In order to use Edge in Internet Explorer mode, the following settings must be made:
1. Configure the browser based on the following documentation: https://docs.rocketbot.com/?p=169
2. Download the Internet Explorer driver from the link below: https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.3.0/IEDriverServer_Win32_4.3.0.zip and place it in Rocketbot/drivers/win/ie/x86/
3. To be able to access the developer tools, IEChooser.exe must be opened. To do so, press the Windows key + R and type the following: %systemroot%\system32\f12\IEChooser.exe and then press accept. Select the window of your browser, and you will be able to explore the elements of the page.


## Description of the commands

### List of items
  
Gets a list of all elements and their children from a class or name in order to iterate over it.
|Parameters|Description|example|
| --- | --- | --- |
|Type Classes or attribute|In this field we should put the type of class or attribute we will use.|name|
|Classes or attribute|In this field we should put the name of the class or attribute we will use.|class|
|Element Type|In this field we should put the type of element we will use.|div|
|Variable where to store the result|In this field we should put the name of the variable where we will store the result.|Variable|

### Clean input and send text
  
Deletes the contents of an input object and sends the text
|Parameters|Description|example|
| --- | --- | --- |
|Text to send or variable|We put the text or the variable to send.|Text or Variable|
|Data to search|We put the data to search.|Data to search|
|Data type|We select the type of data to search. Either xpath, class, name, tag or id.|Data to search|
|Send with keys|Erase and write with keys.|Text or Variable|

### Save Cookies
  
Saves the cookies of a page so that it can be loaded in another instance
|Parameters|Description|example|
| --- | --- | --- |
|Path to file where cookies will be saved|In this field we indicate the path to the file where the cookies will be saved|C:/tmp/etc|
|Variable where cookies will be stored|In this field we indicate the name of the variable where the cookies will be stored|cookies|

### Load Cookies
  
Loads a file with cookies
|Parameters|Description|example|
| --- | --- | --- |
|Path to the file where cookies are stored|Select the path to the file where cookies are stored|C:/tmp/etc|
|Assign result to variable|Variable where True or False will be stored depending on whether the cookies could be loaded|Variable|

### Reload Page
  
Reload Page
|Parameters|Description|example|
| --- | --- | --- |
| --- | --- | --- |

### Back
  
Back to previous page
|Parameters|Description|example|
| --- | --- | --- |
| --- | --- | --- |

### Double Click
  
Double click on a selected object
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|We put the selector to search|Data|
|Data type|We put the type of data to search|xpath|

### Scroll
  
Scroll to a specific position
|Parameters|Description|example|
| --- | --- | --- |
|Position|Choose the position in pixels|1500|

### Count Elements
  
Delivers the total number of elements
|Parameters|Description|example|
| --- | --- | --- |
|Class Name|Class name of element|Name class|
|Assign result to variable|Name of the variable where the result will be stored|Variable|

### Select Object by Index
  
Select an object by passing it the index
|Parameters|Description|example|
| --- | --- | --- |
|Data to Search|We put the selector to search|form-control|
|Index|We put the index to search|1|
|Data type|We select the type of data to search|name|

### Click Object by Index
  
Click an object by passing it the index
|Parameters|Description|example|
| --- | --- | --- |
|Data to Search|We put the selector of the data to click.|form-control|
|Index|We put the index of the data to click.|1|
|Data type|We put the type of the data to click.|class|

### Export page to PDF
  
Export the page to a PDF file. If the page contains sticky elements, they can be removed with Javascript to get a proper export.
|Parameters|Description|example|
| --- | --- | --- |
|File path and name|Select the path and name of the file to save, without the extension .pdf|path/to/file.pdf|
|Delete sticky header|If the website contains a fixed header, check the box to remove it so it doesn't repeat itself on each capture. The command looks for the header tag, if it doesn't find it it will throw an error, if this doesn't work you have to uncheck it.|True|
|Assign result to variable|Select the name of the variable to which we want to assign the result|Variable|

### Open Chrome headless
  
Open Chrome in headless mode
|Parameters|Description|example|
| --- | --- | --- |
|Server URL|Write the URL of the page to open.|http://www.rocketbot.co|

### Take screenshot from coordinates
  
Take a screenshot to a section of the page by coordinates
|Parameters|Description|example|
| --- | --- | --- |
|Position|Page section coordinates|x,y|
|size|Page section dimensions|width, height|
|Path and name where the image will be saved|Path and name where the image will be saved|/Users/User/folder/image.jpg|

### Get bounding rectangle
  
Obtains x and y coordinates and dimensions of an object
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|We put the selector of the element to get.|Data|
|Data type|We select the type of data to search.|xpath|
|Variable where to store result|Variable name without {}|Variable|

### Get location of an object
  
Get x and y coordinates of an object
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|Put the selector of the element to select|Data|
|Data type|Select the type of data to search|xpath|
|Variable where to store result|Variable name without {}|Variable|

### Get size of an object
  
Get size of an object
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|Put the selector of the element to select|Data|
|Data type|Select the type of data to search|xpath|
|Variable where to store result|Variable name without {}|Variable|

### Open Chrome developer mode
  
Open Google Chrome with unsafe mode or debugger mode
|Parameters|Description|example|
| --- | --- | --- |
|Server URL|Server URL to open|http://www.rocketbot.co|
|Mode|Select the mode in which the browser will be opened.|Debugger|

### See Console
  
Get info from console
|Parameters|Description|example|
| --- | --- | --- |
|Variable where to store result|Variable name where to store the result|Variable|
|Level |Level of information to show|Severe|

### WebPage to PNG
  
It takes multiple snapshots of the web page and concatenates them into one. If the page contains fixed elements, they can be removed with Javascript to obtain a correct export.
|Parameters|Description|example|
| --- | --- | --- |
|Name|Name of the image to save|WebImage|
|Download folder|Path where the generated image will be downloaded|C:/Users/user/Desktop|

### Hover Element
  
Move mouse over the element
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|We put the selector of the element to which we will make hover.|Data|
|Data type|We put the type of data we want to search.|xpath|

### Open Edge (Chromium)
  
Open the new Edge based on Chromium
|Parameters|Description|example|
| --- | --- | --- |
|Server URL|Url of the page to open in Edge|http://www.rocketbot.co|
|Start in Internet Explorer mode|Starts the browser in Internet Explorer mode|True|
|Select Edge executable|Select the Edge executable to open in IE mode|C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe|

### Click Pro
  
Click on a selected object waiting that it's clickeable
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|Put the selector of the element to click.|Data|
|Data type|Select the type of data to search.|xpath|
|Wait|Put the time in seconds that we will wait for the element to be clickeable.|5|

### Extract text Pro
  
Get a text object waiting that it's present
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|Put the selector of the element to extract text.|Data|
|Data type|Select the type of data to search.|xpath|
|Wait|Put the time in seconds that we will wait for the element to be available.|5|
|Variable where to store result|Put the name of the variable where we will store the result.|Variable|

### Select object Pro
  
Select an object waiting that it's present
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|Put the selector of the element to select.|Data|
|Data type|Select the type of data to search.|xpath|
|Wait|Put the time in seconds that we will wait for the element to appear.|5|

### Change to iframe Pro
  
Change to iframe waiting that it's present
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|Put the selector of the iframe|Data|
|Data type|Select the type of data|xpath|
|Wait|Put the time of wait|5|

### Send Keys
  
Similar to Send keys web, but low level
|Parameters|Description|example|
| --- | --- | --- |
|Text|Text to send|Text|
|Special Key|Special key to send|SPACE|

### Print to PDF (Chrome)
  
Print the page as a PDF in Chrome. The PDF is generated based on the available content of the page. It does not represent a true copy of the site.
|Parameters|Description|example|
| --- | --- | --- |
|The pdf will be downloaded to the browser's default downloads folder.|||

### Force Download
  
Force Download
|Parameters|Description|example|
| --- | --- | --- |
|Download URL|Put the URL of the download to force|http://www.web.test/file.csv|
|File Name|Put the name of the file to force|file.csv|

### Open New Tab
  
Open new tab with the URL
|Parameters|Description|example|
| --- | --- | --- |
|URL|URL to open in a new tab|http://www.google.com|

### Open Browser
  
Open a browser the URL
|Parameters|Description|example|
| --- | --- | --- |
|URL|URL to open|http://www.google.com|
|Timeout|Timeout in seconds|5|
|Id|Id of the browser|4|
|Profile folder|Profile folder to open the opened browser|C:/folder|
|Download Folder|Download folder for the opened browser|C:/folder|
|Force downloads|Force the downloads to make them automatically|True|
|Options for Chrome|Options for the browser|{'download.default_directory': download_path}|

### Drag and drop
  
Do a drag and drop
|Parameters|Description|example|
| --- | --- | --- |
|Source|Source element|source|
|Target|Target element|target|
|Data type|Data type to search|Data to search|

### Upload files
  
Command to upload one or more files to an input of type file. Just complete a single value depending on how many files you want to upload.
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|We put the selector of the element where the file will be uploaded|Data|
|Data type|Data type to search|xpath|
|Load only a single field of the following. If you want to upload a single file, use the first selector, if you want to upload more than one, load the second selector with the indicated format.|||
|Load a single file|Select the file to upload|C:/Users/user/file1.pdf|
|Load multiple files|Select the file to upload|['C:/Users/user/file1.pdf', 'C:/Users/user/file2.pdf']|

### Send key combination
  
Command to send key combination
|Parameters|Description|example|
| --- | --- | --- |
|First special Key|First special key to combine with a letter/number or with a second special key|SPACE|
|Letter or number|Letter or number to combine with the first key if necessary.|A|
|Second special key|Second special key to combine with the first key if necessary.|SPACE|

### Right Click
  
Right click on a selected object
|Parameters|Description|example|
| --- | --- | --- |
|Data to search|We put the selector to search|Data|
|Data type|We put the type of data to search|xpath|
