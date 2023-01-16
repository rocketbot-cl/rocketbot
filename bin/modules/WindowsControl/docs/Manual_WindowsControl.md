# MS Windows Controls
  
Module to control MS Windows applications

This module can be used with "Desktop Recorder"
  
*Read this in other languages: [English](Manual_WindowsControl.md), [Portugues](Manual_WindowsControl.pr.md), [Español](Manual_WindowsControl.es.md).* 
  
![banner](imgs/Banner_WindowsControl.png)
## How to install this module
  
__Download__ and __install__ the content in 'modules' folder in Rocketbot path  



## Description of the commands

### WindowScope
  
A container that enables you to attach to an already opened window and perform multiple actions within it. This activity is also automatically generated when using the Desktop recorder.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Timeout in Seconds|Wait time in seconds before the error is generated|30|
|Result|Variable where the result will be stored|result|

### Element screenshot
  
Takes a screenshot of the element and saves it in the specified directory.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Screenshot path|Select the name and location where the screenshot will be saved.|C:/Users/Usuario/Desktop/Screenshot|

### Click
  
Clicks a specified UI element.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Click Type|Specifies the type of mouse click (single, double, up, down) used when simulating the click event. By default, a single click is selected.|CLICK_SIMPLE|
|Mouse Button|The mouse button (left, right, middle) used for the click action. By default, the left mouse button is selected.|BTN_LEFT|
|Smulate Click|If selected, it simulates the click by using the technology of the target application. This input method is the fastest and works in the background. By default, this check box is not selected.The default method is the slowest, it cannot work in the background, but it is compatible with all desktop apps.|False|
|Result|Variable where the result will be stored|result|

### Relative click
  
Clicks with coordinates relative to a specified UI element.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|X Coordinate|X coordinate for where the mouse will move relative to before clicking, from selector ubication|150|
|Y Coordinate|Y coordinate for where the mouse will move relative to before clicking, from selector ubication|100|

### Get Text
  
Extracts a text value from a specified UI element.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Result|Variable where the result is stored|result|

### Set Text
  
Enables you to write a string to the Text attribute of a specified UI element.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Clean|If selected, delete the previous text to write a new one. By default, the text will be written on a new line.|True|
|Text|Texto o variable que se vá a escribir en el atributo Text del objeto.|Text|
|Result|Variable where the result is stored|result|

### Send Keys
  
Enables you to write a string to the Text attribute of a specified UI element.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Text|The string or variable that is to be written to the Text attribute of a UI element.|Text|
|Add delay|Check it if the application write slow|False|
|Result|Variable where the result is stored|result|

### ComboBox
  
Selects an item from a combo box or list box.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Item|Specifies the item to be selected from the combo or list box.|Item|
|Result|Variable where the result is stored|result|

### Wheel
  
Simulate mouse wheel.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Times|Turns that the mouse wheel will make|1|
|Up or Down|Select whether the movement of the wheel will be up or down.|up|
|Result|Variable where the result is stored|result|

### Extract Table
  
Extract cell values of a table from a specified UI element.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Row|Row to be extracted|2|
|Column|Column to be extraxted|3|
|Result|Variable where the result is stored|result|

### Wait object
  
Wait for a object on screen
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Selector to wait|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Timeout in Seconds|Tiempo de espera máximo para el selector|30|
|Wait action|Wait action|-----Select-----|
|Result|Variable where the result is stored|result|

### Get Handle from Open windows
  
return and array with name and handle tuple from Open Window
|Parameters|Description|example|
| --- | --- | --- |
|Filter|Filter to search the handle|*Notepad|
|Variable|Variable where the handle will be saved|Variable|

### Read list
  
Extract cell values of a list from a specified UI element.
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Result|Variable where the result is stored|result|

### Find child selector by
  
Search all child by any property and return selectors
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Data to find|Children data to find|labelClass1|
|Find by|Selection of where to look for the child selector|ctrlid|
|Result|Variable where the result is stored|result|

### Get CheckBox state
  
Get Default Action State from checkbox
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Get Value|Checkbox to check only if default option not working well.|False|
|Result|Variable where the result is stored|result|

### Object is enabled
  
Return True or False if object is enabled
|Parameters|Description|example|
| --- | --- | --- |
|Selector|Text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Result|Variable where the result is stored|result|

### Drag and Drop
  
Drag and drop an object from coordinates or the object selector, both source and destination
|Parameters|Description|example|
| --- | --- | --- |
|You can select the combination of any of the options. Coordinates and/or selector|||
|Source Seletor|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Destination Seletor|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Source coordinate|Coordinates from where it will be dragged|136,200|
|Destination coordinate|Coordinates to where it will be dragged|500,200|
|Result|Variable where the result is stored|result|

### Get Position
  
Returns the coordinates of the specified element. You can choose to move the mouse to the position
|Parameters|Description|example|
| --- | --- | --- |
|Source Seletor|Use selector obtained in DesktopRecorder. This selector is a text property used to find a particular UI element when the activity is executed. It is actually a XML or JSON fragment specifying attributes of the GUI element you are looking for and of some of its parents.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Move mouse to the position|If this checkbox is checked, the mouse will move to the center of the element before returning the position|True|
|Result|Variable where the result is stored|result|
