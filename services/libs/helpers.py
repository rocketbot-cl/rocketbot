# coding: utf-8
from selenium.webdriver.common.keys import Keys
import sys
import linecache
from time import sleep, time
#from definitions import ROOT_DIR
import os
from PIL import Image
import base64
import re
import json
#import logging
import datetime
LOGGER_ID = "Rocketbot"

#logging.basicConfig(filename='app.log', filemode='a',format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

def getKeys(k):
    _key = None
    if k.upper() == "ADD": _key = Keys.ADD
    if k.upper() == "ALT": _key = Keys.ALT
    if k.upper() == "ARROW_DOWN": _key = Keys.ARROW_DOWN
    if k.upper() == "ARROW_LEFT": _key = Keys.ARROW_LEFT
    if k.upper() == "ARROW_RIGHT": _key = Keys.ARROW_RIGHT
    if k.upper() == "ARROW_UP": _key = Keys.ARROW_UP
    if k.upper() == "BACKSPACE": _key = Keys.BACKSPACE
    if k.upper() == "BACK_SPACE": _key = Keys.BACK_SPACE
    if k.upper() == "CANCEL": _key = Keys.CANCEL
    if k.upper() == "CLEAR": _key = Keys.CLEAR
    if k.upper() == "COMMAND": _key = Keys.COMMAND
    if k.upper() == "CONTROL": _key = Keys.CONTROL
    if k.upper() == "DECIMAL": _key = Keys.DECIMAL
    if k.upper() == "DELETE": _key = Keys.DELETE
    if k.upper() == "DIVIDE": _key = Keys.DIVIDE
    if k.upper() == "DOWN": _key = Keys.DOWN
    if k.upper() == "END": _key = Keys.END
    if k.upper() == "ENTER": _key = Keys.ENTER
    if k.upper() == "EQUALS": _key = Keys.EQUALS
    if k.upper() == "ESCAPE": _key = Keys.ESCAPE
    if k.upper() == "F1": _key = Keys.F1
    if k.upper() == "F10": _key = Keys.F10
    if k.upper() == "F11": _key = Keys.F11
    if k.upper() == "F12": _key = Keys.F12
    if k.upper() == "F2": _key = Keys.F2
    if k.upper() == "F3": _key = Keys.F3
    if k.upper() == "F4": _key = Keys.F4
    if k.upper() == "F5": _key = Keys.F5
    if k.upper() == "F6": _key = Keys.F6
    if k.upper() == "F7": _key = Keys.F7
    if k.upper() == "F8": _key = Keys.F8
    if k.upper() == "F9": _key = Keys.F9
    if k.upper() == "HELP": _key = Keys.HELP
    if k.upper() == "HOME": _key = Keys.HOME
    if k.upper() == "INSERT": _key = Keys.INSERT
    if k.upper() == "LEFT": _key = Keys.LEFT
    if k.upper() == "LEFT_ALT": _key = Keys.LEFT_ALT
    if k.upper() == "LEFT_CONTROL": _key = Keys.LEFT_CONTROL
    if k.upper() == "LEFT_SHIFT": _key = Keys.LEFT_SHIFT
    if k.upper() == "META": _key = Keys.META
    if k.upper() == "MULTIPLY": _key = Keys.MULTIPLY
    if k.upper() == "NULL": _key = Keys.NULL
    if k.upper() == "NUMPAD0": _key = Keys.NUMPAD0
    if k.upper() == "NUMPAD1": _key = Keys.NUMPAD1
    if k.upper() == "NUMPAD2": _key = Keys.NUMPAD2
    if k.upper() == "NUMPAD3": _key = Keys.NUMPAD3
    if k.upper() == "NUMPAD4": _key = Keys.NUMPAD4
    if k.upper() == "NUMPAD5": _key = Keys.NUMPAD5
    if k.upper() == "NUMPAD6": _key = Keys.NUMPAD6
    if k.upper() == "NUMPAD7": _key = Keys.NUMPAD7
    if k.upper() == "NUMPAD8": _key = Keys.NUMPAD8
    if k.upper() == "NUMPAD9": _key = Keys.NUMPAD9
    if k.upper() == "PAGE_DOWN": _key = Keys.PAGE_DOWN
    if k.upper() == "PAGE_UP": _key = Keys.PAGE_UP
    if k.upper() == "PAUSE": _key = Keys.PAUSE
    if k.upper() == "RETURN": _key = Keys.RETURN
    if k.upper() == "RIGHT": _key = Keys.RIGHT
    if k.upper() == "SEMICOLON": _key = Keys.SEMICOLON
    if k.upper() == "SEPARATOR": _key = Keys.SEPARATOR
    if k.upper() == "SHIFT": _key = Keys.SHIFT
    if k.upper() == "SPACE": _key = Keys.SPACE
    if k.upper() == "SUBTRACT": _key = Keys.SUBTRACT
    if k.upper() == "TAB": _key = Keys.TAB
    if k.upper() == "UP": _key = Keys.UP
    return _key


def return_info(response, status, robot = "", index = -1, img_default = '', var=[], ifs = [], extra=[]):
    img64 = ''
    buffered = None
    res = {}
    vars_ = []
    ifs_ = []
    if var:
        vars_ = var
    if ifs:
        ifs_ = ifs
    """    
    try:
        from io import BytesIO
        buffered = BytesIO()
    except:
        import cStringIO
        buffered = cStringIO.StringIO()

    if not index == -1 or img_default:
        basewidth = 300
        try:
            if  img_default:
                img = Image.open(img_default)
            else:
                img = Image.open("robots" + os.sep + str(robot) + os.sep +
                            str(robot) + "_" + str(index) + ".jpg")
            wpercent = (basewidth/float(img.size[0]))
            hsize = int((float(img.size[1])*float(wpercent)))
            img = img.resize((basewidth, hsize), Image.ANTIALIAS)
            img.save(buffered, format="PNG")
            img64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        except:
            #PrintException()
            pass
    """
    try:
        response = response.decode('utf-8')
    except:
        pass
    try:
        
        res = {
        'status': ''+str(status) + '',
        'message':response,
        'img': img64,
        'vars': vars_,
        'ifs': ifs_,
        'extra': extra
        }
    except Exception as e:
        print(e)
    return res





def getVar(datas, name):
    
    for data in datas:
        if str(data['name']) == str(name) and not data.get('disabled', False):
            return data['data']
    return "ERROR_NOT_VAR"


def getIf(datas, name):
    for data in datas:
        if str(data['id']) == str(name):
            if str(data['status']) == "null" or data['status'] == True or data['status'] == None:
                return False
            return True
    return False

def setVar(datas, name, data):
    for data_ in datas:
        if str(data_['name']) == str(name).replace("}","").replace("{",""):
            try:
                data_['data'] = str(data)
            except Exception as e:
                print("set data:", e)
    return datas


def setIf(ifs, id, status):
    for data_ in ifs:
        if str(data_['id']) == str(id):
            try:
                data_['status'] = status
            except Exception as e:
                print("set data:", e)
    return ifs

def replaceByVar(vars_, command, system = [], ignore_python=False):
    '''
    Remplaza nombres de variable por contenido en un texto
        vars_ : Lista de variables
        command: Comando donde se reemplazará la información 
    '''
    try:
        rc = re.compile('\{([^\{\}]*)\}')
        tmp_a = rc.findall(command)
        if tmp_a:
            for v in tmp_a:
                tmp = str(getVar(vars_, v))
                if not str(tmp).strip() == "ERROR_NOT_VAR":
                    command = command.replace("{"+str(v)+"}", tmp)
    except Exception as e:
        print("helpers.py", e)
    
    try:
        rc = re.compile('\%([^\%\%]*)\%')
        tmp_a = rc.findall(command)
        if tmp_a:
            for v in tmp_a:
                if v in system:
                    command = command.replace("%"+str(v)+"%", json.dumps(system[v]))
    except Exception as e:
        print("helpers.py", e)

    if ignore_python:
        return command
    return replace_python_response(command)

def replace_python_response(command):
    """Replace python syntax in [] and evaluate the result."""
    try:
        if command is None:
            return command
        command = command.strip()
        if command.startswith("![") and command.endswith("]"):
            command = command[2:-1]
            return str(eval(command))
    except Exception as e:
        print("helpers.py", e)

    return command


def getImgFile64(imgBase64):
    file_ = r'services' + os.sep + 'img' + os.sep + 'imgTemp.png'
    try:
        with open(file_, "wb") as fh:
            fh.write(base64.b64decode(imgBase64.split('base64,')[1]))
            fh.close()
    except Exception as e:
        print("helpers.py", e)
    return file_

def PilImgToBase64(img):
    try:
        from io import BytesIO
        buffered = BytesIO()
    except:
        import cStringIO
        buffered = cStringIO.StringIO()

    img.save(buffered, format="PNG")
    img64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img64
