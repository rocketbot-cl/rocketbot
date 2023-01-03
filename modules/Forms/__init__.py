__version__ = '11.1.1'
__author__ = 'Rocketbot <contacto@rocketbot.com>'

import configparser
import json
import platform
import requests
import os

base_path = tmp_global_obj["basepath"]
cur_path = base_path + 'modules' + os.sep + 'Forms' + os.sep + 'libs' + os.sep
if cur_path not in sys.path:
    sys.path.append(cur_path)

from configurationObject import ConfigObject
from orchestator import OrchestatorCommon

global configFormObject
global path_ini_assetnoc_

module = GetParams('module')

if module == 'Login':
    server_ = GetParams("server_url")
    var_ = GetParams('var_')
    iframe = GetParams("iframe")
    iframe = eval(iframe) if iframe is not None else {}
    username = iframe.get("user", "")
    password = iframe.get("password", "")
    api_key = iframe.get("apikey", "")
    path = iframe.get("path_ini", GetParams("ruta_"))
    path_ini_assetnoc_ = path
    # proxies = GetParams("proxies")

    if password and username:
        try:
            orchestrator_service = OrchestatorCommon(server=server_, user=username, password=password, ini_path=path, apikey=api_key)
            if server_ is None:
                    server_ = orchestrator_service.server
            token = orchestrator_service.get_authorization_token()
            headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
            res = requests.post(server_ + '/api/assets/list',
                                headers=headers)
            configFormObject = ConfigObject(token, orchestrator_service.server, orchestrator_service.user, orchestrator_service.password, api_key, None)
            conx = True
            SetVar(var_, conx) #type: ignore

        except:
            raise Exception("Password o E-mail incorrectos")

    elif api_key:
                    
        orchestrator_service = OrchestatorCommon(server=server_, user=username, password=password, ini_path=path, apikey=api_key)
        if server_ is None:
            server_ = orchestrator_service.server
        token = orchestrator_service.get_authorization_token()
        headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
        res = requests.post(server_ + '/api/assets/list',
                            headers=headers)
        configFormObject = ConfigObject(token, orchestrator_service.server, orchestrator_service.user, orchestrator_service.password, api_key, None)
        if res.status_code != 200:
            raise Exception("El API Key es incorrecto")
        else:
            conx = True
        SetVar(var_, conx)

    elif path:
        try:
            orchestrator_service = OrchestatorCommon(server=server_, user=username, password=password, ini_path=path, apikey=api_key)
            if server_ is None:
                server_ = orchestrator_service.server
            token = orchestrator_service.get_authorization_token()
            headers = {'content-type': 'application/x-www-form-urlencoded','Authorization': 'Bearer {token}'.format(token=token)}
            res = requests.post(server_ + '/api/assets/list',
                                headers=headers)
            configFormObject = ConfigObject(token, orchestrator_service.server, orchestrator_service.user, orchestrator_service.password, api_key, None)
            conx = True
            SetVar(var_, conx)
        except:
            raise Exception("La direccion del archivo .ini es incorrecta")

if module == 'GetForm':
    token_ = GetParams('token')
    var_ = GetParams('result')

    try:
        res = requests.post(configFormObject.server_ + '/api/formData/get/' + token_,
                            headers={'Authorization': "Bearer " + configFormObject.token}, proxies=None)
        if res.status_code == 200:
            tmp = []
            res = res.json()
            if 'data' in res:
                for data in res['data']:
                    aa = {'id': data['id']}
                    tmp.append(aa)
            SetVar(var_, tmp)
        else:
            raise Exception(res.json())

    except Exception as e:
        PrintException()
        print(res.json())
        raise e

if module == 'GetFormData':
    id_ = GetParams('id_')
    token_ = GetParams('token_')

    try:
        res = requests.post(configFormObject.server_ + '/api/formData/getQueue/' + id_ + '/' + token_,
                            headers={'Authorization': "Bearer " + configFormObject.token}, proxies=configFormObject.proxies)
        if res.status_code == 200:
            tmp = []
            res = res.json()

            if 'data' in res:
                if 'user_form_email' in res['data']:
                    SetVar('user_form_email', res['data']['user_form_email'])

                if 'xperience' in res['data']:
                    SetVar('xperience', res['data']['xperience'])
                data = json.loads(res['data']['data'])
                for attr, value in data.items():
                    if attr == 'file':
                        value = value.split("/")[-1]
                    SetVar(attr, value)
        else:
            raise Exception(res.json()['message'])

    except Exception as e:
        PrintException()
        raise e

if module == 'SetStatus':
    status_ = GetParams('status_')
    id_ = GetParams('id_')
    _var = GetParams('result_')

    if not id_:
        raise Exception("No form data loaded")
    try:
        s = 0
        lock = 0
        if status_ == 'done':
            s = 1
        elif status_ == 'undone':
            s = 0

        if status_ == 'lock':
            lock = 1
        data = {'status': s, 'locked': lock}
        res = requests.post(configFormObject.server_ + '/api/formData/setStatus/' + str(id_), data=data,
                            headers={'Authorization': "Bearer " + configFormObject.token}, proxies=configFormObject.proxies)

        res = res.json()
        if _var:
            SetVar(_var, res['success'])
        if not res['success']:
            raise Exception(res['message'])
    except Exception as e:
        PrintException()
        raise e

if module == "DownloadFile":
    id_ = GetParams('id_')
    download_ = GetParams('download_')
    save_ = GetParams('save_')

    try:
        if not id_:
            raise Exception("No queue ID provided")
        if not download_:
            raise Exception("No file to download provided")
        if not save_:
            raise Exception("No path to save file provided")

        data = {'file': download_}
        
        if "/" in download_:
            filename = download_.split("/")[-1]
        if download_ in save_:
            save_ = save_.replace(download_, filename)
        
        myDirs = save_.split("/")[:-1]
        if (platform.system() == 'Windows'):
            myDirs[0] = myDirs[0] + "\\"
        myDirs = os.path.join(*myDirs)

        os.makedirs(myDirs, exist_ok=True)

        res = requests.post(configFormObject.server_ + '/api/formData/download/' + str(id_), data=data,
                            headers={'Authorization': "Bearer " + configFormObject.token}, proxies=configFormObject.proxies)
        if res.status_code == 200:
            with open(save_, 'wb') as ff:
                ff.write(res.content)
        else:
            raise Exception("Error ocurred while download file")
    except Exception as e:
        PrintException()
        raise e

if module == "setXperience":

    try:
        xperience = GetParams('xperience')
        extradata = GetParams('extradata')

        data = {'xperience': xperience, 'data': extradata}

        res = requests.post(configFormObject.server_ + '/api/form/extra', data=data,
                            headers={'Authorization': "Bearer " + configFormObject.token}, proxies=configFormObject.proxies)

        if res.status_code != 200:
            raise Exception('An error has occurred')

    except Exception as e:
        PrintException()
        raise e
