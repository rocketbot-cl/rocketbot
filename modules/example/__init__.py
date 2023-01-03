# coding: utf-8
"""
Base para desarrollo de modulos externos.
Para obtener el modulo/Funcion que se esta llamando:
     GetParams("module")

Para obtener las variables enviadas desde formulario/comando Rocketbot:
    var = GetParams(variable)
    Las "variable" se define en forms del archivo package.json

Para modificar la variable de Rocketbot:
    SetVar(Variable_Rocketbot, "dato")

Para obtener una variable de Rocketbot:
    var = GetVar(Variable_Rocketbot)

Para obtener la Opcion seleccionada:
    opcion = GetParams("option")


Para instalar librerias se debe ingresar por terminal a la carpeta "libs"
    
   sudo pip install <package> -t .

"""


from pymsgbox import *


module = GetParams("module")
if module == "alerta":
    data = GetParams("identifier")
    option = GetParams("option")
    alert("Hola " + str(data) + ", Opcion:" + str(option ))

if module == "example_view":
    textarea = GetParams("iframe")
    print(textarea['input'])

if module == "example_html":
    textarea = GetParams("iframe")
    print(textarea['input'])