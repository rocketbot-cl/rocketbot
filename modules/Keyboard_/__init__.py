# coding: utf-8
"""Base para desarrollo de modulos externos.

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

__author__ = "Marcela Vergara"
__updated_by__ = "Caleb Cipra"
__version__ = "2.0.1"

tmp_global_obj = tmp_global_obj #type: ignore
GetParams = GetParams #type: ignore
PrintException = PrintException #type: ignore
SetVar = SetVar #type: ignore

import os
import sys

base_path = tmp_global_obj["basepath"]
cur_path = os.path.join(base_path, "modules", "Keyboard_", "libs")
if cur_path not in sys.path:
    sys.path.append(cur_path)

import keyboard
from pywinauto.keyboard import send_keys



module = GetParams("module") #Obtengo el modulo que fue invocado

if module == "sendKey":
    key_ = GetParams('key_')

    if key_:

        if key_ == "alt_tab":
            send_keys('%{TAB}')

        if key_ == "win":
            send_keys('{VK_LWIN down}{VK_LWIN up}')

        if key_ == "wind":
            send_keys('{VK_LWIN down}D{VK_LWIN up}')

        if key_ == "winr":
            send_keys('{VK_LWIN down}R{VK_LWIN up}')

        if key_ == "wine":
            send_keys('{VK_LWIN down}E{VK_LWIN up}')

        if key_ == "ctrlc":
            send_keys('{VK_CONTROL down}C{VK_CONTROL up}')

        if key_ == "ctrlv":
            send_keys('{VK_CONTROL down}V{VK_CONTROL up}')

        if key_ == "ctrl_press":
            send_keys('{VK_CONTROL down}')

        if key_ == "ctrl_release":
            send_keys('{VK_CONTROL up}')

        if key_ == "shift_press":
            send_keys('{VK_SHIFT down}')

        if key_ == "shift_release":
            send_keys('{VK_SHIFT up}')

        if key_ == "ctrla":
            send_keys('{VK_CONTROL down}A{VK_CONTROL up}')

        if key_ == "ctrle":
            send_keys('{VK_CONTROL down}E{VK_CONTROL up}')

        if key_ == "ctrlb":
            send_keys('{VK_CONTROL down}B{VK_CONTROL up}')

        if key_ == "contextual":
            send_keys('{VK_APPS}')
        
        if key_ == "ctrlg":
            send_keys('{VK_CONTROL down}G{VK_CONTROL up}')

    else:
        raise Exception('Debe seleccionar una opcion')

if module == "repeat_key":

    key_ = GetParams('key_')
    repeat = GetParams('repeat')

    if repeat is not None:
        repeat = str(repeat)
    #print(repeat)

    if key_ == "add":
        if repeat is not None:
            send_keys('{VK_ADD ' + repeat + '}')
        else:
            send_keys('{VK_ADD}')

    if key_ == "alt":
        if repeat is not None:
            send_keys('{VK_MENU ' + repeat + '}')
        else:
            send_keys('{VK_MENU}')

    if key_ == "alt_tab":
        if repeat is not None:
            send_keys('{VK_MENU down}{TAB ' + repeat + '} {VK_MENU up}')
        else:
            send_keys('{VK_MENU down}{TAB}{VK_MENU up}')


    if key_ == "backspace":
        if repeat is not None:
            send_keys('{BACKSPACE ' + repeat + '}')
        else:
            send_keys('{BACKSPACE}')

    if key_ == "cancel":
        if repeat is not None:
            send_keys('{VK_CANCEL ' + repeat + '}')
        else:
            send_keys('{VK_CANCEL}')

    if key_ == "clear":
        if repeat is not None:
            send_keys('{VK_CLEAR ' + repeat + '}')
        else:
            send_keys('{VK_CLEAR}')

    if key_ == "control":
        if repeat is not None:
            send_keys('{VK_CONTROL ' + repeat + '}')
        else:
            send_keys('{VK_CONTROL}')

    if key_ == "decimal":
        if repeat is not None:
            send_keys('{VK_DECIMAL ' + repeat + '}')
        else:
            send_keys('{VK_DECIMAL}')

    if key_ == "delete":
        if repeat is not None:
            send_keys('{VK_DELETE ' + repeat + '}')
        else:
            send_keys('{VK_DELETE}')

    if key_ == "divide":
        if repeat is not None:
            send_keys('{VK_DIVIDE ' + repeat + '}')
        else:
            send_keys('{VK_DIVIDE}')

    if key_ == "down":
        if repeat is not None:
            send_keys('{VK_DOWN ' + repeat + '}')
        else:
            send_keys('{VK_DOWN}')

    if key_ == "end":
        if repeat is not None:
            send_keys('{VK_END ' + repeat + '}')
        else:
            send_keys('{VK_END}')

    if key_ == "enter":
        if repeat is not None:
            send_keys('{ENTER ' + repeat + '}')
        else:
            send_keys('{ENTER}')

    if key_ == "escape":
        if repeat is not None:
            send_keys('{VK_ESCAPE ' + repeat + '}')
        else:
            send_keys('{VK_ESCAPE}')

    if key_ == "f1":
        if repeat is not None:
            send_keys('{VK_F1 ' + repeat + '}')
        else:
            send_keys('{VK_F1}')

    if key_ == "f2":
        if repeat is not None:
            send_keys('{VK_F2 ' + repeat + '}')
        else:
            send_keys('{VK_F2}')

    if key_ == "f3":
        if repeat is not None:
            send_keys('{VK_F3 ' + repeat + '}')
        else:
            send_keys('{VK_F3}')

    if key_ == "f4":
        if repeat is not None:
            send_keys('{VK_F4 ' + repeat + '}')
        else:
            send_keys('{VK_F4}')

    if key_ == "f5":
        if repeat is not None:
            send_keys('{VK_F5 ' + repeat + '}')
        else:
            send_keys('{VK_F5}')

    if key_ == "f6":
        if repeat is not None:
            send_keys('{VK_F6 ' + repeat + '}')
        else:
            send_keys('{VK_F6}')

    if key_ == "f7":
        if repeat is not None:
            send_keys('{VK_F7 ' + repeat + '}')
        else:
            send_keys('{VK_F7}')

    if key_ == "f8":
        if repeat is not None:
            send_keys('{VK_F8 ' + repeat + '}')
        else:
            send_keys('{VK_F8}')

    if key_ == "f9":
        if repeat is not None:
            send_keys('{VK_F9 ' + repeat + '}')
        else:
            send_keys('{VK_F9}')

    if key_ == "help":
        if repeat is not None:
            send_keys('{VK_HELP ' + repeat + '}')
        else:
            send_keys('{VK_HELP}')

    if key_ == "home":
        if repeat is not None:
            send_keys('{VK_HOME ' + repeat + '}')
        else:
            send_keys('{VK_HOME}')

    if key_ == "insert":
        if repeat is not None:
            send_keys('{VK_INSERT ' + repeat + '}')
        else:
            send_keys('{VK_INSERT}')

    if key_ == "left":
        if repeat is not None:
            send_keys('{VK_LEFT ' + repeat + '}')
        else:
            send_keys('{VK_LEFT}')

    if key_ == "left_control":
        if repeat is not None:
            send_keys('{VK_LCONTROL ' + repeat + '}')
        else:
            send_keys('{VK_LCONTROL}')

    if key_ == "left_shift":
        if repeat is not None:
            send_keys('{VK_LSHIFT ' + repeat + '}')
        else:
            send_keys('{VK_LSHIFT}')

    if key_ == "numpad0":
        if repeat is not None:
            send_keys('{VK_NUMPAD0 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD0}')

    if key_ == "numpad1":
        if repeat is not None:
            send_keys('{VK_NUMPAD1 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD1}')

    if key_ == "numpad2":
        if repeat is not None:
            send_keys('{VK_NUMPAD2 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD2}')

    if key_ == "numpad3":
        if repeat is not None:
            send_keys('{VK_NUMPAD3 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD3}')

    if key_ == "numpad4":
        if repeat is not None:
            send_keys('{VK_NUMPAD4 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD4}')

    if key_ == "numpad5":
        if repeat is not None:
            send_keys('{VK_NUMPAD5 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD5}')

    if key_ == "numpad6":
        if repeat is not None:
            send_keys('{VK_NUMPAD6 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD6}')

    if key_ == "numpad7":
        if repeat is not None:
            send_keys('{VK_NUMPAD7 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD7}')

    if key_ == "numpad8":
        if repeat is not None:
            send_keys('{VK_NUMPAD8 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD8}')

    if key_ == "numpad9":
        if repeat is not None:
            send_keys('{VK_NUMPAD9 ' + repeat + '}')
        else:
            send_keys('{VK_NUMPAD9}')

    if key_ == "pause":
        if repeat is not None:
            send_keys('{VK_PAUSE ' + repeat + '}')
        else:
            send_keys('{VK_PAUSE}')

    if key_ == "return":
        if repeat is not None:
            send_keys('{VK_RETURN ' + repeat + '}')
        else:
            send_keys('{VK_RETURN}')

    if key_ == "right":
        if repeat is not None:
            send_keys('{VK_RIGHT ' + repeat + '}')
        else:
            send_keys('{VK_RIGHT}')

    if key_ == "right_shift":
        if repeat is not None:
            send_keys('{VK_RSHIFT ' + repeat + '}')
        else:
            send_keys('{VK_RSHIFT}')

    if key_ == "right_control":
        if repeat is not None:
            send_keys('{VK_RCONTROL ' + repeat + '}')
        else:
            send_keys('{VK_RCONTROL}')

    if key_ == "separator":
        if repeat is not None:
            send_keys('{VK_SEPARATOR ' + repeat + '}')
        else:
            send_keys('{VK_SEPARATOR}')

    if key_ == "shift":
        if repeat is not None:
            send_keys('{VK_SHIFT ' + repeat + '}')
        else:
            send_keys('{VK_SHIFT}')

    if key_ == "space":
        if repeat is not None:
            send_keys('{VK_SPACE ' + repeat + '}')
        else:
            send_keys('{VK_SPACE}')

    if key_ == "subtract":
        if repeat is not None:
            send_keys('{VK_SUBTRACT ' + repeat + '}')
        else:
            send_keys('{VK_SUBTRACT}')

    if key_ == "tab":
        if repeat is not None:
            send_keys('{VK_TAB ' + repeat + '}')
        else:
            send_keys('{VK_TAB}')

    if key_ == "up":
        if repeat is not None:
            send_keys('{VK_UP ' + repeat + '}')
        else:
            send_keys('{VK_UP}')

if module == "get":
    try:
        timeout = GetParams('timeout')
        result = GetParams("result")
        keys = []
        hot_key = None
        while True:
            key = keyboard.read_event()

            if key.event_type == "down":
                keys.insert(0, key.name)

            if key.event_type == "up":
                hot_key = keyboard.get_hotkey_name(keys)

            if hot_key:
                break

        if result:
            SetVar(result, hot_key)
    except Exception as e:
        PrintException()
        raise e

if module == "send":
    text = GetParams("text")
    key_ = GetParams("key_")
    wait = GetParams("sleep")
    from time import sleep
    try:
        if not wait:
            wait = 1
        if not text:
            sleep(int(wait))
            keyboard.press_and_release(key_)
        else:
            for i in text:
                if i.isupper():
                    i = i.lower()
                    keyboard.press_and_release(f"shift+{i}")
                else:
                    keyboard.press_and_release(i)
                sleep(int(wait))
    except Exception as e:
        PrintException()
        raise e




