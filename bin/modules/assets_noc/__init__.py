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
import requests
import configparser
import traceback
global token
global instance_
global server_

base_path = tmp_global_obj["basepath"]
cur_path = base_path + "modules" + os.sep + "assets_noc" + os.sep + "libs" + os.sep
if cur_path not in sys.path:
    sys.path.append(cur_path)

import traceback
from orchestator import OrchestatorCommon

"""
    Obtengo el modulo que fue invocado
"""
global orchestator_service
global path_ini_assetnoc_
global instance_key_ini

module = GetParams("module")

if module == "loginNOC":
    
    conx =""
    
    try:
        server_ = GetParams("server_url")
        var_ = GetParams('var_')
        iframe = GetParams("iframe")
        iframe = eval(iframe) if iframe is not None else {}
        username = iframe.get("user", "")
        password = iframe.get("password", "")
        apikey = iframe.get("apikey", "")
        path = iframe.get("path_ini", GetParams("ruta_"))
        path_ini_assetnoc_ = path

        if password and username:
            try:
                orchestrator_service = OrchestatorCommon(server=server_, user=username, password=password, ini_path=path, apikey=apikey)
                if server_ is None:
                    server_ = orchestrator_service.server
                token = orchestrator_service.get_authorization_token()
                headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
                res = requests.post(server_ + '/api/assets/list',
                                    headers=headers)
                conx = True
                SetVar(var_, conx)
            except:
                raise Exception("Password o E-mail incorrectos")
            
        elif apikey:
                    
            orchestrator_service = OrchestatorCommon(server=server_, user=username, password=password, ini_path=path, apikey=apikey)
            if server_ is None:
                server_ = orchestrator_service.server
            token = orchestrator_service.get_authorization_token()
            headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
            res = requests.post(server_ + '/api/assets/list',
                                headers=headers)

            if res.status_code != 200:

                raise Exception("El API Key es incorrecto")
            else:
                conx = True
            SetVar(var_, conx)

        elif path:
            try:
                config = configparser.ConfigParser()
                config.read(path)
                instance_key_ini = config['USER']['key']
                orchestrator_service = OrchestatorCommon(server=server_, user=username, password=password, ini_path=path, apikey=apikey)
                if server_ is None:
                    server_ = orchestrator_service.server
                token = orchestrator_service.get_authorization_token()
                headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
                res = requests.post(server_ + '/api/assets/list',
                                    headers=headers)
                conx = True
                SetVar(var_, conx)
            except:
                raise Exception("La direccion del archivo .ini es incorrecta")
            
    except Exception as e:
        PrintException()
        conx = False
        print("Traceback: ", traceback.print_exc())
        SetVar(var_, conx)
        raise (e)

if module == "getData":
    name_ = GetParams("name_")
    var_ = GetParams("var_")
    process_ = GetParams("process_")
    instance_ = GetParams("instance_")
    if not instance_:
        instance_ = instance_key_ini
    try:
        data = {'name': name_, 'instance': instance_}
        if process_:
            data['process'] = process_
        headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
        res = requests.post(server_ + '/api/assets/get', data,
                            headers=headers)
        if res.status_code == 200:
            res = res.json()
            if res['success']:
                
                if 'data' in res:
                    tmp = res['data']['value']
                    if var_:
                        SetVar(var_,tmp)
            else:
                raise Exception(res['message'])
        else:
            raise Exception(res.json()['message'])

    except Exception as e:
        PrintException()
        raise (e)

if module == "getAllData":

    # name_ = GetParams("name_")
    var_ = GetParams("var_")

    try:
        headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
        res = requests.post(server_ + '/api/assets/list',
                            headers=headers)

        if res.status_code == 200:
            res = res.json()
            if res['success']:
                tmp = [{'name':a['name'],'value':a['value']} for a in res['data']]
                for b in tmp:
                    SetVar(b['name'],b['value'])
            else:
                raise Exception(res['message'])
        else:
            raise Exception(res.json()['message'])

    except Exception as e:
        PrintException()
        raise (e)


