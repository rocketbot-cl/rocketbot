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
    
    pip install <package> -t .

"""
import os
import sys
base_path  = tmp_global_obj["basepath"]
cur_path = base_path + 'modules' + os.sep + 'credentials_' + os.sep
sys.path.append(cur_path + 'libs')
#print(cur_path)

import keyring


"""
    Obtengo el modulo que fue invocado
"""
module = GetParams("module")


if module == "getCredentials":

    try:

        name_ = GetParams('name_')
        user_ = GetParams('user_')
        var_ = GetParams('var_')

        if name_ is None:
            name_ = ""

        pass_ = keyring.get_password(name_, user_)

    except:
        PrintException()

    SetVar(var_,pass_)


if module == "setCredentials":

    name_ = GetParams('name_')
    user_ = GetParams('user_')
    pass_ = GetParams('pass_')

    keyring.set_password(name_, user_, pass_)