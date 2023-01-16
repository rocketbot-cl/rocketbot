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
import os.path

base_path = tmp_global_obj["basepath"]
cur_path = base_path + "modules" + os.sep + "WindowsControl" + os.sep + "libs" + os.sep
sys.path.append(cur_path)

global windowScope, ET

from time import sleep
import time
from uiautomation import uiautomation as auto
import json
import xml.etree.ElementTree as ET
import copy

try:
    # import pywinauto as pw
    """"""
except:
    pass
"""
    Obtengo el modulo que fueron invocados
"""
# global module
module = GetParams("module")

"""
    Resuelvo catpcha tipo reCaptchav2
"""

ProcessTime = time.perf_counter  # this returns nearly 0 when first call it if python version <= 3.6
ProcessTime()
time_delta = 0


def getSelector(Selector):
    command_ = {}
    try:
        if type(Selector) == str:
            Selector = Selector.replace("\\", "\\\\")
            tmp = json.loads(Selector)
        else:
            tmp = Selector

        if "handle_" in tmp and len(tmp) == 1:
            print("Only Handle connection")
            command_["handle"] = tmp["handle_"]
        else:
            if "app" in tmp and len(str(tmp["app"])) > 0:
                command_["path"] = tmp["app"]
            if "title" in tmp and len(str(tmp["title"])) > 0:
                command_["Name"] = tmp["title"]
            if "ctrlId" in tmp and len(str(tmp["ctrlId"])) > 0:
                command_["AutomationId"] = (int(tmp["ctrlId"]) if tmp["ctrlId"].isdigit() else tmp["ctrlId"])
            if "class" in tmp and len(str(tmp["class"])) > 0:
                command_["ClassName"] = tmp["class"]
            if "idx" in tmp and len(str(tmp["idx"])) > 0:
                command_["ctrl_index"] = int(tmp["idx"]) - 1
    except Exception as e:
        PrintException()
        raise Exception("Error on Selector XML or JSON :" + str(e))
    print("command", command_)
    return command_


def create_control(select, timeout=30, wait=False):
    # class_name = select["parent"]["cls"]
    global ProcessTime, time_delta, get_selectors, find_control_by_index
    start = ProcessTime()

    # Creating new scope
    new_scope = None
    if len(select["children"]) > 1 and select["children"][0]["ctrltype"] == "WindowControl":
        s = select["children"][0]
        if "cls" in select["children"][0]:
            s["class"] = select["children"][0]["cls"]
        del s["idx"]
        selector_win = getSelector(s)
        new_scope = windowScope.WindowControl(**selector_win)
        del select["children"][0]

    # if len(select["children"]) > 1 and "idx" in select["children"][-1]:
    #     parent = select["children"][-2]
    #     has_parent = True
    #     position_child = select["children"][-1]["idx"]
    # else:
    #     parent = select["children"][-1]
    #     has_parent = False

    parent = select["children"][0]
    arguments = get_selectors(parent)
    if new_scope:
        parent_control = new_scope.Control(** arguments)
    else:
        parent_control = windowScope.Control(**arguments)

    if len(select["children"]) == 0:
        return parent_control

    if parent_control:
        if wait:
            exist_parent = parent_control.Exists2(timeout, 1)
        else:
            exist_parent = parent_control.Exists(timeout, 1)
        if exist_parent:
            time_delta = start + timeout - ProcessTime()
            print(select)
            return find_control_by_index(parent_control, select["children"][1:])
            # for i, child in enumerate(parent_control.GetChildren()):
            #     if i == position_child:
            #         return child


def find_control_by_index(parent_control, selectors):
    for item in selectors:
        # print(f"Searching by: {get_selectors(item)}")
        children = parent_control.GetChildren()
        for i, child in enumerate(children):
            if i == item["idx"]:
                parent_control = child
    return parent_control
        

def get_selectors(parent):
    arguments = {}
    if "ctrlid" in parent and parent["ctrlid"]:
        arguments["AutomationId"] = parent["ctrlid"]
    if "title" in parent and parent["title"]:
        arguments["Name"] = parent["title"]
    if "cls" in parent and parent["cls"]:
        arguments["ClassName"] = parent["cls"]
    if "ctrltype" in parent and parent["ctrltype"]:
        arguments["ControlTypeName"] = parent["ctrltype"]
    return arguments


def getChildren(window, Selector):
    global getSelector, ET
    """ Busca los hijos de la ventana"""
    da = []
    if str(Selector).startswith("<"):
        Selector = "<data>" + Selector + "</data>"
        da = ET.XML(Selector)
        for item in da:
            da.append(item)

    if str(Selector).startswith("{"):
        Selector = "[" + Selector + "]"
    if str(Selector).startswith("["):
        da = json.loads(Selector)
    print("da", da)
    w = window.child_window(**getSelector(da[0])).wait('visible', timeout=20)
    print("DA", da)
    if len(da[1:]) > 0:
        for item in da[1:]:
            try:
                w = w.child_window(**getSelector(item)).wait('visible', timeout=20)
            except Exception as e:
                print("error w", e)
                PrintException()
                raise Exception(e)
    print("w", w)
    return w

windows = GetGlobals("windows")

if module == "WindowScope":
    windowScope = None
    Selector = GetParams("Selector")
    TimoutMS = GetParams("TimeoutMS")
    var_ = GetParams("result")
    timeout_ = 30
    command_ = ""
    app = None

    result = False

    try:
        try:
            if len(str(TimoutMS).strip()) > 0:
                timeout_ = int(TimoutMS)
        except:
            pass

        if windows is not None:
            command_ = windows.create_selector(Selector)
            command_ = command_[0]
            command_ = {"ClassName": command_.get("class_name", ""), "Name": command_.get("title", "")}
        else:
            command_ = getSelector(Selector)
        if len(str(command_)) > 1:
            windowScope = auto.WindowControl(**command_)

            result = windowScope.ExistsWindow(timeout_, 1)
            if result:
                windowScope.SetFocus()
                # windowScope.top_window().print_control_identifiers()
        else:
            raise Exception("No Selector")
        SetVar(var_, result)
    except Exception as e:
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        SetVar(var_, False)
        
        
if module == "Screenshot":
    Selector = GetParams("Selector")
    path_ = GetParams("path_screenshot")
    
    try:
        windowScope.SetFocus()
        selector = eval(Selector)
        control = create_control(selector)
        control.CaptureToImage(path_)
        
    except Exception as e:
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        raise e

if module == "GetValue":
    Selector = GetParams("Selector")
    var_ = GetParams("result")
    # parentControl = GetParams("parentControl")
    # control_by = GetParams("controlBy")
    timeout_ = 30

    try:
        # if not control_by:
        #     control_by = "ctrlid"
        selector = eval(Selector)

        className = selector["parent"]["cls"]
        control = create_control(selector)
        windowScope.SetFocus()
        try:
            if control.ControlTypeName == "DataItemControl":
                currentValue = control.GetLegacyIAccessiblePattern().Value
            else:
                currentValue = control.GetPattern(10002).Value
        except:
            currentValue = control.GetWindowText()
        if currentValue is None:
            currentValue = control.Name

        SetVar(var_, str(currentValue))
    except Exception as e:
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        raise e

if module == "SetValue":
    Selector = GetParams("Selector")
    var_ = GetParams("result")
    Text = GetParams("Text")
    clean = GetParams("Clean")
    timeout_ = 30

    try:
        selector = eval(Selector)
    except Exception as ex:
        PrintException()

    if "mozilla" in selector["parent"]["cls"].lower() or "chrome" in selector["parent"]["cls"].lower():
        className = selector["children"][0]["cls"]
    else:
        className = selector["parent"]["cls"]
    try:
        control = create_control(selector)
        windowScope.SetFocus()
        clean = eval(clean) if clean is not None else False
        if not clean:
            try:
                currentValue = control.GetPattern(10002).Value
                print(currentValue, "--------")
            except:
                print("exception")
                currentValue = control.GetWindowText()

            if currentValue:
                print(currentValue)
                Text = currentValue + Text

        try:
            print(dir(control))
            control.GetPattern(auto.PatternId.ValuePattern).SetValue(Text)
        except:
            print("-----------")
            control.SetWindowText(Text)
    except Exception as e:
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        raise e

if module == "SelectItem":
    Selector = GetParams("Selector")
    var_ = GetParams("result")
    Item = GetParams("Item")
    timeout_ = 30
    result_ = False
    try:
        selector = eval(Selector)
    except Exception as ex:
        PrintException()


    try:
        if str(Item).isnumeric():
            Item = int(Item)

        control = create_control(selector)
        windowScope.SetFocus()

        print(dir(control))
        control.GetLegacyIAccessiblePattern().SetValue(Item)
        # control.GetPattern().SetValue(Item)
        SetVar(var_, str(result_))
    except Exception as e:
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        raise e

if module == "Click":
    timeout_ = 30
    command_ = ""
    result_ = False
    simulateclick_ = False
    mousebutton_ = "left"
    double_ = False
    button_down = True
    button_up = True
    var_ = GetParams("result")
    Selector = GetParams("Selector")
    TimoutMS = GetParams("TimeoutMs")
    SimulateClick = GetParams("SimulateClick")
    MouseButton = GetParams("MouseButton")
    ClickType = GetParams("ClickType")

    try:
        # print(Selector, type(json.loads(Selector)))
        

        if not SimulateClick is None:
            simulateclick_ = SimulateClick

        if not ClickType == None:
            if ClickType == "CLICK_DOUBLE":
                double_ = True
            if ClickType == "CLICK_DOWN":
                button_up = False
            if ClickType == "CLICK_UP":
                button_down = False

        if len(str(Selector)) > 1:
            try:
                if windows is not None:
                    command_ = windows.create_selector(Selector)
                    command_ = command_[0]
                    selector = {"ClassName": command_.get("class_name", ""), "Name": command_.get("title", "")}
                else:
                    selector = eval(Selector)

                control = create_control(selector)
                windowScope.SetFocus()
                
                if ClickType != "CLICK_DOUBLE":
                    if MouseButton == "BTN_LEFT":
                        control.Click(simulateMove=simulateclick_, waitTime=0.5)
                    if MouseButton == "BTN_RIGHT":
                        control.RightClick(simulateMove=simulateclick_)
                    if MouseButton == "BTN_MIDDLE":
                        control.MiddleClick(simulateMove=simulateclick_)
                else:
                    control.DoubleClick(simulateMove=simulateclick_, waitTime=0.5)
                result_ = True
            except Exception as e:
                SetVar(var_, False)
                PrintException()
                raise e

            SetVar(var_, True)
    except Exception as e:
        SetVar(var_, False)
        PrintException()
        raise e
    
if module == "Relative_click":
    Selector = GetParams("Selector")
    x_coord = int(GetParams("x_coord"))
    y_coord = int(GetParams("y_coord"))


    
    try:
        selector = eval(Selector)
    except Exception as ex:
        PrintException() 
        
        
        
    if len(str(Selector)) > 1:
            try:
                control = create_control(selector)
                windowScope.SetFocus()

                # control.MoveCursorToInnerPos(x=x_coord, y=y_coord)
                x, y = control.MoveCursorToMyCenter()
                
                x_coord += x
                y_coord += y
                
                auto.Click(x=x_coord, y=y_coord, waitTime=0.5)
                
                
            except Exception as e:
                PrintException()
                raise e    


if module == "waitObject":
    Selector = GetParams("Selector")
    var_ = GetParams("result")
    type_ = GetParams("type")
    timeout_ = GetParams("TimeoutMS")
    result_ = False
    try:
        selector = eval(Selector)
    except Exception as ex:
        PrintException()

    try:

        if timeout_:
            timeout_ = float(timeout_)
        else:
            timeout_ = float(30)
        auto.TIME_OUT_SECOND = 10

        if type_ == "disappears":
            control = create_control(selector, 5)
            if time_delta != 0:
                timeout_ = timeout_ + time_delta - 5
            if control:
                print(control, time_delta)
                result_ = control.Disappears(timeout_, 1)
            else:
                result_ = True
        else:
            control = create_control(selector, timeout_, wait=True)
            if time_delta != 0:
                timeout_ = time_delta
            result_ = control.Exists2(timeout_, 1)

        if var_:
            SetVar(var_, result_)

    except Exception as e:
        SetVar(var_, result_)
        PrintException()

if module == "SendKeys":
    Selector = GetParams("Selector")
    var_ = GetParams("result")
    delay = GetParams("delay")
    Text = GetParams("Text")
    timeout_ = 30

    try:
        try:
            selector = eval(Selector)
        except Exception as ex:
            PrintException()

        if "mozilla" in selector["parent"]["cls"].lower() or "chrome" in selector["parent"]["cls"].lower():
            className = selector["children"][0]["cls"]
        else:
            className = selector["parent"]["cls"]
        control = create_control(selector)
        control.SetFocus()
        sleep(1)
        control.SendKeys(Text)
        if delay:
            sleep(int(len(Text) / 4))
        SetVar(var_, True)
    except Exception as e:
        PrintException()
        SetVar(var_, False)
        raise e

if module == "Wheel":
    Selector = GetParams("Selector")
    times = GetParams("times")
    type_ = GetParams("type")
    var_ = GetParams("result")
    timeout_ = 30

    try:
        try:
            selector = eval(Selector)
        except Exception as ex:
            PrintException()

        if not times:
            times = 1
        else:
            times = int(times)

        if "mozilla" in selector["parent"]["cls"].lower() or "chrome" in selector["parent"]["cls"].lower():
            className = selector["children"][0]["cls"]
        else:
            className = selector["parent"]["cls"]
        control = create_control(selector)
        windowScope.SetFocus()
        if type_ == "up":
            control.WheelUp(wheelTimes=times)
        else:
            control.WheelDown(wheelTimes=times)
        SetVar(var_, True)
    except Exception as e:
        PrintException()
        SetVar(var_, False)
        raise e

if module == "ExtractTable":
    Selector = GetParams("Selector")
    var_ = GetParams("result")
    row_index = GetParams("row_index")
    col_index = GetParams("col_index")
    timeout_ = 30
    try:

        selector = eval(Selector)

        className = selector["parent"]["cls"]
        control = create_control(selector)
        windowScope.SetFocus()
        if control.ControlTypeName in ("TableControl", "PaneControl"):
            currentValue = []
            for row in control.GetChildren():
                rows = []
                for cell in row.GetChildren():
                    rows.append(cell.GetLegacyIAccessiblePattern().Value)

                currentValue.append(rows)
        if row_index:
            currentValue = currentValue[row_index]
            if col_index:
                currentValue = currentValue[col_index]
            SetVar(var_, currentValue)
        else:
            raise Exception("Control type must be TableControl")

    except Exception as e:
        PrintException()
        raise e

if module == "GetHandle":
    import win32gui

    result = GetParams("var")
    filter_ = GetParams("filter")

    try:
        handleInfo = []


        def winEnumHandler(hwnd, ctx):
            global handleInfo
            if win32gui.IsWindowVisible(hwnd):
                handleInfo.append((hwnd, win32gui.GetWindowText(hwnd)))


        win32gui.EnumWindows(winEnumHandler, None)

        handle_info = []
        for h in handleInfo:
            if filter_.startswith("*") and filter_.endswith("*") and filter_[1:-1] in h[1]:
                handle_info.append(h)
            elif filter_.startswith("*") and h[1].endswith(filter_[1:]):
                handle_info.append(h)
            elif filter_.endswith("*") and h[1].startswith(filter_[:-1]):
                handle_info.append(h)
            elif not filter_:
                handle_info.append(h)

        SetVar(result, handle_info)
    except Exception as e:
        print("\x1B[" + "31;40mError\x1B[" + "0m")
        PrintException()
        raise e

if module == "ReadList":
    Selector = GetParams("Selector")
    var_ = GetParams("result")
    timeout_ = 30
    try:

        selector = eval(Selector)

        className = selector["parent"]["cls"]
        control = create_control(selector)
        windowScope.SetFocus()
        if control.ControlTypeName == "ListControl":
            currentValue = []
            for row in control.GetChildren():
                rows = []
                for cell in row.GetChildren():
                    rows.append(cell.GetLegacyIAccessiblePattern().Name)

                currentValue.append(rows)
            SetVar(var_, currentValue)
        else:
            raise Exception("Control type must be ListControl")

    except Exception as e:
        PrintException()
        raise e

if module == "findChildren":
    Selector = GetParams("Selector")
    data = GetParams("data")
    find_by = GetParams("findBy")
    result = GetParams("result")

    try:
        selector = eval(Selector)

        control = create_control(selector)
        windowScope.SetFocus()

        children = []
        for i, child in enumerate(control.GetChildren()):
            if getattr(child, find_by) == data:
                # {"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}
                child_selector = {}
                if child.AutomationId:
                    child_selector["ctrlid"] = child.AutomationId
                if child.ClassName:
                    child_selector["cls"] = child.ClassName
                if child.Name:
                    child_selector["title"] = child.Name
                if child.ControlTypeName:
                    child_selector["ctrltype"] = child.ControlTypeName
                child_selector["idx"] = i
                children.append(child_selector)

        SetVar(result, children)

    except Exception as e:
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        raise e

if module == "readCheckbox":

    Selector = GetParams("Selector")
    result = GetParams("result")
    variant = GetParams("variant")

    try:
        selector = eval(Selector)
        if variant is not None:
            variant = eval(variant)

        control = create_control(selector)
        windowScope.SetFocus()
        if control.ControlTypeName != "CheckBoxControl":
            raise Exception("Object is not CheckBoxControl")

        if not variant:
            default_action = control.GetLegacyIAccessiblePattern().DefaultAction
        else:
            default_action = control.GetLegacyIAccessiblePattern().Value
        
        if result:
            SetVar(result, default_action)
    except Exception as e:
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        raise e

try: 

    def get_position(control, ratioX: float = 0.5, ratioY: float = 0.5):
        rect = control.BoundingRectangle
        x = rect.left + int(rect.width() * ratioX)
        y = rect.top + int(rect.height() * ratioY)
        return x,y

    if module == "isEnable":
        Selector = GetParams("Selector")
        result = GetParams("result")

        selector = eval(Selector)
        control = create_control(selector)
        windowScope.SetFocus()

        isEnabled = control.IsEnabled
        print("result", result, isEnabled)
        if result:
            SetVar(result, bool(isEnabled))

    
    if module == "DragAndDrop":
        source_selector = GetParams("source_selector")
        destination_selector = GetParams("destination_selector")
        source_coordinates = GetParams("source_coordinates")
        destination_coordinates = GetParams("destination_coordinates")
        result = GetParams("result")
        SetVar(result, False)

        source_control = destination_control = None

        if source_coordinates:
            x1,y1 = eval(source_coordinates)

        if destination_coordinates:
            x2,y2 = eval(destination_coordinates)

        if source_selector:
            source_selector = json.loads(source_selector)
            source_control = create_control(source_selector)
            x1, y1 = get_position(source_control)

        if destination_selector:
            destination_selector = json.loads(destination_selector)
            destination_control = create_control(destination_selector)
            x2, y2 = get_position(destination_control)


        windowScope.SetFocus()
        auto.DragDrop(x1, y1, x2, y2)
        SetVar(result, True)

    if module == "GetPosition":
        selector = GetParams("Selector")
        move = GetParams("move")
        result = GetParams("result")

        selector = json.loads("selector")
        control = create_control(selector)
        if move and move == "True":
            x, y  = control.MoveCursorToMyCenter(simulateMove=True)
        else:
            x, y = get_position(control)

        
        SetVar(result, (x,y))

except Exception as e:
    print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
    PrintException()
    raise e