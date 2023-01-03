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

__version__ = '11.1.1'
__author__ = 'Rocketbot <contacto@rocketbot.com>'

import base64
import os
import sys
import shutil
import platform
from io import BytesIO

import time
from bs4 import BeautifulSoup
from selenium.webdriver import ActionChains
from selenium.webdriver import Chrome
base_path = tmp_global_obj["basepath"]
cur_path = base_path + 'modules' + os.sep + 'webpro' + os.sep + 'libs' + os.sep
sys.path.append(cur_path)
print(cur_path)

from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import TimeoutException
from PIL import Image

module = GetParams("module")

def makeTmpDir(name):
    try:
        os.mkdir("tmp")
        os.mkdir("tmp" + os.sep + name)
    except:
        try:
            os.mkdir("tmp" + os.sep + name)
        except:
            pass


def getBoundingClientRect(type_element, selector):
    web_driver = GetGlobals("web")
    if web_driver.driver_actual_id in web_driver.driver_list:
        driver = web_driver.driver_list[web_driver.driver_actual_id]
    
    # driver = webdriver.driver_list[webdriver.driver_actual_id]

    if type_element == "xpath":
        rect = driver.execute_script("""element = document.evaluate('{}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
        return element.getBoundingClientRect()""".format(selector))
    elif type_element == "id":
        rect = driver.execute_script("element = document.getElementById('{}');return element.getBoundingClientRect() ".format(selector))
    elif type_element == "name":
        rect = driver.execute_script("element = document.getElementsByName('{}')[0];return element.getBoundingClientRect()".format(selector))
    elif type_element == "tag name":
        rect = driver.execute_script("element = document.getElementsByTagName('{}')[0];return element.getBoundingClientRect()".format(selector))
    elif type_element == "class name":
        rect = driver.execute_script(
            "element = document.getElementsByClassName('{}')[0];return element.getBoundingClientRect()".format(selector))
    else:
        return Exception("Invalid type")

    return rect

types = {
        "name": By.NAME,
        "id": By.ID,
        "class name": By.CLASS_NAME,
        "xpath": By.XPATH,
        "tag name": By.TAG_NAME
    }

special_keys = {
    "ADD":u'\ue025',
    "ALT":u'\ue00a',
    "ARROW_DOWN":u'\ue015',
    "ARROW_LEFT":u'\ue012',
    "ARROW_RIGHT":u'\ue014',
    "ARROW_UP":u'\ue013',
    "BACKSPACE":u'\ue003',
    "BACK_SPACE":u'\ue003',
    "CANCEL":u'\ue001',
    "CLEAR":u'\ue005',
    "COMMAND":u'\ue03d',
    "CONTROL":u'\ue009',
    "DECIMAL":u'\ue028',
    "DELETE":u'\ue017',
    "DIVIDE":u'\ue029',
    "DOWN":u'\ue015',
    "END":u'\ue010',
    "ENTER":u'\ue007',
    "EQUALS":u'\ue019',
    "ESCAPE":u'\ue00c',
    "F1":u'\ue031',
    "F10":u'\ue03a',
    "F11":u'\ue03b',
    "F12":u'\ue03c',
    "F2":u'\ue032',
    "F3":u'\ue033',
    "F4":u'\ue034',
    "F5":u'\ue035',
    "F6":u'\ue036',
    "F7":u'\ue037',
    "F8":u'\ue038',
    "F9":u'\ue039',
    "HELP":u'\ue002',
    "HOME":u'\ue011',
    "INSERT":u'\ue016',
    "LEFT":u'\ue012',
    "LEFT_ALT":u'\ue00a',
    "LEFT_CONTROL":u'\ue009',
    "LEFT_SHIFT":u'\ue008',
    "META":u'\ue03d',
    "MULTIPLY":u'\ue024',
    "NULL":u'\ue000',
    "NUMPAD0":u'\ue01a',
    "NUMPAD1":u'\ue01b',
    "NUMPAD2":u'\ue01c',
    "NUMPAD3":u'\ue01d',
    "NUMPAD4":u'\ue01e',
    "NUMPAD5":u'\ue01f',
    "NUMPAD6":u'\ue020',
    "NUMPAD7":u'\ue021',
    "NUMPAD8":u'\ue022',
    "NUMPAD9":u'\ue023',
    "PAGE_DOWN":u'\ue00f',
    "PAGE_UP":u'\ue00e',
    "PAUSE":u'\ue00b',
    "RETURN":u'\ue006',
    "RIGHT":u'\ue014',
    "SEMICOLON":u'\ue018',
    "SEPARATOR":u'\ue026',
    "SHIFT":u'\ue008',
    "SPACE":u'\ue00d',
    "SUBTRACT":u'\ue027',
    "TAB":u'\ue004',
    "UP":u'\ue013'
}

webdriver = GetGlobals("web")
if webdriver.driver_actual_id in webdriver.driver_list:
    driver = webdriver.driver_list[webdriver.driver_actual_id]

if module == "webelementlist":
    
    el_ = GetParams("el_")
    type_ = GetParams("type_")
    data_ = GetParams("data_")
    var_ = GetParams("result")

    
    global getChild


    def getChild(el):
        res = []
        if len(el) > 0:
            for c in el:
                tmp = c.attrs
                tmp["text"] = c.text
                tmp["etype"] = c.name
                tmp['value'] = c.get('value')
                res.append(tmp)
                if len(c.findChildren()) > 1:
                    res.append(getChild(c.findChildren()))
        else:
            tmp = el.attrs
            tmp["text"] = el.text
            tmp["etype"] = el.name
            res.append(tmp)

        return res


    html = BeautifulSoup(driver.page_source, 'html.parser')
    objs = html.find_all(el_, attrs={type_: data_})
    re = []
    for element in objs:
        if element.findChildren():
            re.append(getChild(element.findChildren()))
        else:
            re.append(getChild(element))

    SetVar(var_, str(re))

if module == "CleanInputs":
    
    
    search = GetParams('search_data')
    texto = GetParams('texto')
    search_type = GetParams("tipo")
    element = None

    try:
        simulationKey = eval(GetParams("simulationKey"))
    except:
        simulationKey = False

    print(search_type)
    search_type = {"tag": "tag name", "class": "class name"}.get(search_type, search_type)
    
    element = driver.find_element(search_type, search)

    if element is not None and texto is not None:
        element.clear()
        if simulationKey:
            element.send_keys(Keys.SHIFT, Keys.ARROW_UP)
            element.send_keys(Keys.DELETE)
        element.send_keys(texto)

if module == "LoadCookies":
    import pickle

    
    
    file_ = GetParams('file_')
    with open(file_, 'rb') as cookiesfile:
        cookies = pickle.load(cookiesfile)
        print(cookies)
        for cookie in cookies:
            driver.add_cookie(cookie)

if module == "SaveCookies":
    import pickle

    

    file_ = GetParams('file_')
    result = GetParams('result')

    try:
        
        cookies = driver.get_cookies()
        print("--*", cookies)
        with open(file_, 'wb') as filehandler:
            pickle.dump(cookies, filehandler)

        if result:
            SetVar(result, str(cookies))
    except Exception as e:
        PrintException()
        raise e

if module == "reloadPage":
    
    
    driver.refresh()

if module == "back":
    
    
    driver.back()

if module == "DoubleClick":
    
    

    data_ = GetParams("data")
    data_type = GetParams("data_type")

    actionChains = ActionChains(driver)
    elementLocator = driver.find_element(data_type, data_)

    actionChains.double_click(elementLocator).perform()

if module == "Scroll":
    
    

    position = GetParams("position")

    if position == "end":
        last_height = driver.execute_script("return document.body.scrollHeight")
        driver.execute_script("window.scrollTo(0, {})".format(last_height))
    else:
        driver.execute_script("window.scrollTo(0, {})".format(position))

if module == "length_":

    
    
    search = GetParams('search_data')
    var_ = GetParams("var_")

    try:
        element = driver.execute_script(" return document.getElementsByClassName('"+search+"').length")
        print(element)
    except:
        PrintException()

    SetVar(var_, element)

if module == "selectElement":

    
    
    option_ = GetParams('option_')
    search = GetParams('search_data')
    index_ = GetParams("index_")
    print(option_,index_)
    element = None
    index_ = eval(index_)
    res = False

    try:

        if option_ is None:
            raise Exception('Debe seleccionar una opcion')

        if option_ == 'name':
            element = driver.find_elements_by_name(search)[index_]
        if option_ == 'class':
            elements = driver.find_elements_by_xpath(f'//*[contains(@class,"{search}")]')[index_]
            webdriver._object_selected = elements

    except Exception as e:
        PrintException()
        raise e

if module == "clickElement":

    
    
    option_ = GetParams('option_')
    search = GetParams('search_data')
    index_ = GetParams("index_")
    print(option_,index_)
    element = None
    index_ = eval(index_)
    res = False
    cont_ = 0

    try:

        if option_ is None:
            raise Exception('Debe seleccionar una opcion')

        if option_ == 'name':
            element = driver.find_elements_by_name(search)

            for ele in element:
                if cont_ == index_:
                    ele.click()
                    webdriver._object_selected = ele
                    break
                else:
                    cont_ += 1

        if option_ == 'class':
            elements = driver.find_elements_by_xpath(f'//*[contains(@class,"{search}")]')[index_]
            elements.click()
            webdriver._object_selected = elements

    except Exception as e:
        PrintException()
        raise e

if module == "html2pdf":

    
    
    name_ = GetParams("name_")
    var_ = GetParams("var_")

    lk1 = cur_path+'html2canvas.js'
    lk2 = cur_path+'jspdf.debug.js'

    try:
        read_ = open(lk1, "r").read()
        read2_ = open(lk2, "r").read()
        driver.execute_script(read_)
        driver.execute_script(read2_)

        element = driver.execute_script("let doc = new jsPDF('p','pt','a4'); doc.addHTML(document.body,function() {"
                                       "doc.save('"+name_+".pdf');});")

        res = True

    except Exception as e:
        PrintException()
        raise e

    SetVar(var_,res)

if module == "chromeHeadless":

    url = GetParams("url")
    print(url)
    try:
        base_path = tmp_global_obj["basepath"]

        web = GetGlobals("web")

        platform_ = platform.system()

        if platform_.endswith('dows'):
            chrome_driver = os.path.join(base_path, os.path.normpath(r"drivers\win\chrome"), "chromedriver.exe")
        else:
            chrome_driver = os.path.join(base_path, os.path.normpath(r"drivers/mac/chrome"), "chromedriver")

        chrome_options = Options()

        chrome_options.add_argument('headless')
        web.driver_list[web.driver_actual_id] = Chrome(chrome_options=chrome_options, executable_path=chrome_driver)
        if url:
            web.driver_list[web.driver_actual_id].get(url)

    except Exception as e:
        PrintException()
        raise e

if module == "Edge_":

    url = GetParams("url")
    platform_ = platform.system()

    try:
        base_path = tmp_global_obj["basepath"]

        web = GetGlobals("web")

        if platform_.lower() == "windows":
            edge_driver = os.path.join(cur_path, os.path.normpath(r"drivers\edge"), "msedgedriver.exe")
        else:
            edge_driver = os.path.join(cur_path, os.path.normpath(r"drivers/edge"), "msedgedriver")

        driver = webdriver.Edge(edge_driver, {})

        web.driver_list[web.driver_actual_id] = driver
        if url:
            web.driver_list[web.driver_actual_id].get(url)

    except Exception as e:
        PrintException()
        raise e


if module == "screenshot":
    path = GetParams("path")
    location = GetParams("location")
    size = GetParams("size")

    
    

    tmp_path = "tmp/webpro/screenshot.png"
    try:
        element = driver.find_element("xpath", "/html/body")

        makeTmpDir("webpro")
        driver.save_screenshot(tmp_path)

        print(location, size)

        location = eval(location)
        size = eval(size)

        x = location[0]
        y = location[1]
        w = size[0]
        h = size[1]
        try:
            if _platform == "darwin":
                if subprocess.call("system_profiler SPDisplaysDataType | grep 'Retina'", shell=True) == 0:
                    x = x * 2
                    y = y * 2
                    w = w * 2
                    h = h * 2
        except:
            pass
        width = x + w
        height = y + h

        im = Image.open(tmp_path)
        im = im.crop((int(x), int(y), int(width), int(height)))
        im = im.convert("RGB")
        im.save(path)

    except Exception as e:
        PrintException()
        raise e

if module == "getBoundingClientRect":
    data = GetParams("data")
    type_ = GetParams("data_type")
    result = GetParams("result")

    
    

    try:
        rect = getBoundingClientRect(type_, data)
        if result:
            SetVar(result, rect)

    except Exception as e:
        PrintException()
        raise e

if module == "getLocation":
    data = GetParams("data")
    type_ = GetParams("data_type")
    result = GetParams("result")

    
    

    try:
        rect = getBoundingClientRect(type_, data)
        location = {"x": rect["x"], "y": rect["y"]}
        if result:
            SetVar(result, location)

    except Exception as e:
        PrintException()
        raise e

if module == "getSize":
    data = GetParams("data")
    type_ = GetParams("data_type")
    result = GetParams("result")

    
    

    try:
        rect = getBoundingClientRect(type_, data)
        size = {"width": rect["width"], "height": rect["height"]}
        if result:
            SetVar(result, size)

    except Exception as e:
        PrintException()
        raise e

if module == "chromeMode":
    url = GetParams("url")
    mode = GetParams("mode")
    base_path = tmp_global_obj["basepath"]

    web = GetGlobals("web")
    platform_ = platform.system()
    try:
        if platform_.endswith('dows'):
            chrome_driver = os.path.join(base_path, os.path.normpath(r"drivers\win\chrome"), "chromedriver.exe")
        else:
            chrome_driver = os.path.join(base_path, os.path.normpath(r"drivers/mac/chrome"), "chromedriver")

        if mode == "unsafe":
            chrome_options = Options()
            chrome_options.add_experimental_option("prefs", {'safebrowsing.enabled': 'false',
                                                             'profile.default_content_setting_values.automatic_downloads': 1})
            web.driver_list[web.driver_actual_id] = Chrome(desired_capabilities=chrome_options.to_capabilities(),
                                                           executable_path=chrome_driver)
        elif mode == "debugger":
            d = DesiredCapabilities.CHROME
            d['loggingPrefs'] = {'browser': 'ALL'}
            web.driver_list[web.driver_actual_id] = Chrome(desired_capabilities=d, executable_path=chrome_driver)

        if url:
            web.driver_list[web.driver_actual_id].get(url)

    except Exception as e:
        PrintException()
        raise e

if module == "debugger":
    result = GetParams("result")
    level = GetParams("level")
    web = GetGlobals('web')
    try:
        driver = web.driver_list[web.driver_actual_id]
        # print messages
        logs = driver.get_log('browser')
        r = []
        if level != "ALL":
            for entry in logs:
                if entry['level'] == level:
                    r.append(entry)
        else:
            r = logs

        if result:
            SetVar(result, r)

    except Exception as e:
        PrintException()
        raise e

if module == "fullScreenshot":
    name = GetParams("name")
    web = GetGlobals('web')

    try:
        time.sleep(2)
        name += ".png"
        driver = web.driver_list[web.driver_actual_id]

        lk1 = cur_path + 'html2canvas.js'

        read_ = open(lk1, "r", encoding="utf-8").read()
        print(len(read_))
        driver.execute_script(read_)

        driver.execute_script("""
        html2canvas(document.body, { allowTaint : false, useCORS: true,
            onrendered: function(canvas) {
                img = canvas.toDataURL(); 
                a = document.createElement("a")
                a.href = img
                a.download = "%s"
                a.click()
                console.log(img)
            }
        })"""  % name)

        time.sleep(6)

    except Exception as e:
        PrintException()
        raise e

if module == "Hover":
    
    

    data_ = GetParams("data")
    data_type = GetParams("data_type")

    actionChains = ActionChains(driver)
    elementLocator = driver.find_element(data_type, data_)
    actionChains.move_to_element(elementLocator).perform()

if module == "clickPro":
    
    

    data_ = GetParams("data")
    wait_ = GetParams("wait")
    data_type = GetParams("data_type")

    try:
        if not wait_:
            wait_ = 5
        actionChains = ActionChains(driver)
        wait = WebDriverWait(driver, int(wait_))
        try:
            elementLocator = wait.until(EC.element_to_be_clickable((types[data_type], data_)))
            webdriver._object_selected = elementLocator
            actionChains.click(elementLocator).perform()
        except TimeoutException:
            raise Exception("The item is not available to be clicked")

    except Exception as e:
        print("\x1B[" + "31;40mEXCEPTION \x1B[" + "0m")
        PrintException()
        raise e

if module == "getText":
    
    data_ = GetParams("data")
    wait_ = GetParams("wait")
    data_type = GetParams("data_type")
    result = GetParams("result")
    try:
        if not wait_:
            wait_ = 5
        actionChains = ActionChains(driver)
        wait = WebDriverWait(driver, int(wait_))
        try:
            elementLocator = wait.until(EC.visibility_of_element_located((types[data_type], data_)))
            SetVar(result, elementLocator.text)
        except TimeoutException:
            raise Exception("The item is not available to be selected")

    except Exception as e:
        print("\x1B[" + "31;40mEXCEPTION \x1B[" + "0m")
        PrintException()
        raise e

if module == "selectPro":
    
    data_ = GetParams("data")
    wait_ = GetParams("wait")
    data_type = GetParams("data_type")

    try:
        if not wait_:
            wait_ = 5
        actionChains = ActionChains(driver)
        wait = WebDriverWait(driver, int(wait_))
        try:
            elementLocator = wait.until(EC.visibility_of_element_located((types[data_type], data_)))
            webdriver._object_selected = elementLocator
        except TimeoutException:
            raise Exception("The item is not available to be selected")

    except Exception as e:
        print("\x1B[" + "31;40mEXCEPTION \x1B[" + "0m")
        PrintException()
        raise e

if module == "changeIframePro":
    
    

    data_ = GetParams("data")
    wait_ = GetParams("wait")
    data_type = GetParams("data_type")

    try:
        if not wait_:
            wait_ = 5
        actionChains = ActionChains(driver)
        wait = WebDriverWait(driver, int(wait_))
        try:
            elementLocator = wait.until(EC.presence_of_element_located((types[data_type], data_)))
            driver.switch_to_frame(elementLocator)
        except TimeoutException:
            raise Exception("The item is not available to be clicked")

    except Exception as e:
        print("\x1B[" + "31;40mEXCEPTION \x1B[" + "0m")
        PrintException()
        raise e

if module == "sendkeys":

    text = GetParams("text")
    special = GetParams("special")
    if special is None:
        special = ""

    try:
        web_driver = GetGlobals("web")
        driver = web_driver.driver_list[web_driver.driver_actual_id]
        actions = ActionChains(driver)
        if len(special) > 0:
            actions.send_keys(special_keys[special])
        else:
            actions.send_keys(text)
        actions.perform()
    except Exception as e:
        print("\x1B[" + "31;40mEXCEPTION \x1B[" + "0m")
        PrintException()
        raise e


if module == "printPDF":
    import json
    from selenium import webdriver as wd
    chrome_options = wd.ChromeOptions()
    settings = {
       "recentDestinations": [{
            "id": "Save as PDF",
            "origin": "local",
            "account": "",
        }],
        "selectedDestinationId": "Save as PDF",
        "version": 2
        }
    prefs = {'printing.print_preview_sticky_settings.appState': json.dumps(settings)}
    chrome_options.add_experimental_option('prefs', prefs)
    chrome_options.add_argument('--kiosk-printing')

    driver.execute_script('window.print();')


if module == "forceDownload":
    url_file = GetParams("url_file")
    name_file = GetParams("name_file")

    try:
        from json import dumps
        web_driver = GetGlobals("web")
        driver = web_driver.driver_list[web_driver.driver_actual_id]

        driver.execute_script("""
            var url_file = arguments[0]
            var name_file = arguments[1]
            var link = document.createElement("a");
            link.download = name_file
            link.href = url_file;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;
            """, url_file, name_file)
    except Exception as e:
        PrintException()
        raise e

if module == "new_tab":
    url_ = GetParams("url_")
    # open tab
    driver.execute_script(f'''window.open("{url_}","_blank");''')
    driver.switch_to.window(driver.window_handles[-1])

if module == "open_browser":
    
    timeout = GetParams("timeout")
    url_ = GetParams("url_")
    newId = GetParams("newId")
    try:
        platform_ = platform.system()
        if platform_.endswith('dows'):
            chrome_driver = os.path.join(base_path, os.path.normpath(r"drivers\win\chrome"), "chromedriver.exe")
        else:
            chrome_driver = os.path.join(base_path, os.path.normpath(r"drivers/mac/chrome"), "chromedriver")
        browser_driver = Chrome(executable_path=chrome_driver)

        if not (newId):
            newId = "default"
        webdriver.driver_actual_id = newId

        webdriver.driver_list[webdriver.driver_actual_id] = browser_driver
        
        webdriver.driver_list[webdriver.driver_actual_id].set_page_load_timeout(int(timeout))
        webdriver.driver_list[webdriver.driver_actual_id].get(url_)        
    except Exception as e:
        PrintException()
        raise e
try:
    if module == "drag_and_drop":
        source = GetParams("source")
        target = GetParams("target")
        tipo = GetParams("tipo")
    
        script_js = """
            path1="{path1}",path2="{path2}",option="{tipo}","xpath"==option&&(source=document.evaluate(path1,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,target=document.evaluate(path2,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue),"id"==option&&(source=document.querySelector("#"+path1),target=document.querySelector("#"+path2)),"class"==option&&(source=document.querySelector("."+path1),target=document.querySelector("."+path2)),"tag"==option&&(source=document.querySelector(path1),target=document.querySelector(path2)),target.appendChild(source);
        """.format(path1=source, path2=target, tipo=tipo)
        driver.execute_script(script_js)

    if module == "uploadFiles":
        data_ = GetParams("data")
        data_type = GetParams("data_type")
        files = GetParams("files")
        element = driver.find_element(data_type, data_)
        if files.startswith("["):
            files = eval(files)
            files = " \n ".join(files)
        element.send_keys(files)

    if module == "sendKeyCombination":
        first_special_key = GetParams("first_special_key")    
        text = GetParams("text")
        second_special_key = GetParams("second_special_key")    
        try:
            web_driver = GetGlobals("web")
            driver = web_driver.driver_list[web_driver.driver_actual_id]
            from selenium.webdriver import ActionChains
            actions = ActionChains(driver)
            if not text:
                actions.key_down(special_keys[first_special_key]).send_keys(special_keys[second_special_key]).key_up(special_keys[first_special_key]).perform()
            if text:
                actions.key_down(special_keys[first_special_key]).send_keys(text).key_up(special_keys[first_special_key]).perform()
        except Exception as e:
            print("\x1B[" + "31;40mEXCEPTION \x1B[" + "0m")
            PrintException()
            raise e

except Exception as e:
    PrintException()
    raise e