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
from time import sleep


"""
    Obtengo el modulo que fueron invocados
"""
module = GetParams("module")

"""
    Resuelvo catpcha tipo reCaptchav2
"""

try:
    if module == "ReCaptchaV2":
        key = GetParams("key")
        token = GetParams("token")
        url = GetParams("url")
        var_ = GetParams("result")

        if key and token:
            try:
                # Add these values
                API_KEY = key  # Your 2captcha API KEY
                site_key = token  # site-key, read the 2captcha docs on how to get this
                #url = 'http://somewebsite.com'  # example url
                proxy = None #'127.0.0.1:6969'  # example proxy

                #proxy = {'http': 'http://' + proxy, 'https': 'https://' + proxy}

                s = requests.Session()

                # here we post site key to 2captcha to get captcha ID (and we parse it here too)
                url_captcha  = "http://2captcha.com/in.php?key={}&method=userrecaptcha&googlekey={}&pageurl={}".format(API_KEY, site_key, url)
                
                captcha_id = s.get(url_captcha, proxies=proxy).text.split('|')
                try:
                    captcha_id = captcha_id[1]
                except:
                    raise Exception(captcha_id[0])
                # then we parse gresponse from 2captcha response
                recaptcha_answer = s.get("http://2captcha.com/res.php?key={}&action=get&id={}".format(API_KEY, captcha_id), proxies=proxy).text
                print("solving ref captcha...")
                while 'CAPCHA_NOT_READY' in recaptcha_answer:
                    sleep(5)
                    recaptcha_answer = s.get("http://2captcha.com/res.php?key={}&action=get&id={}".format(API_KEY, captcha_id), proxies=proxy).text
                    print(recaptcha_answer)
                if not 'OK' in recaptcha_answer:
                    raise Exception(recaptcha_answer)
                recaptcha_answer = recaptcha_answer.split('|')[1]

                s.close()

                SetVar(var_, str(recaptcha_answer))
            except Exception as e:
                print("\x1B[" + "31;40m" + str(e) + "\x1B[" + "0m")
                PrintException()
                raise Exception(e)
    """
        Resuelvo captcha tipo imagen
    """

    if module == "captchaimagen":

        key = GetParams("key")
        path_ = GetParams("path")
        var_ = GetParams("result")
        print(var_)
        if key and path_:
            # Add these values
            API_KEY = key  # Your 2captcha API KEY

            #url = 'http://somewebsite.com'  # example url
            proxy = None #'127.0.0.1:6969'  # example proxy

            #proxy = {'http': 'http://' + proxy, 'https': 'https://' + proxy}

            s = requests.Session()

            # here we post site key to 2captcha to get captcha ID (and we parse it here too)
            url = 'http://2captcha.com/in.php'
            file_ = open(path_, 'rb')
            files = {'file': file_}
            data = {'key': key, 'method': 'post', 'regsense': 1}
            res = s.post(url, files=files, data=data).text
            captcha_id = res.split('|')

            if not 'OK' in captcha_id:
                raise Exception(captcha_id[0])
            captcha_id = captcha_id[1]
            # then we parse gresponse from 2captcha response
            recaptcha_answer = s.get("http://2captcha.com/res.php?key={}&action=get&id={}".format(API_KEY, captcha_id), proxies=proxy).text
            print("solving ref captcha...")
            while 'CAPCHA_NOT_READY' in recaptcha_answer:
                sleep(5)
                recaptcha_answer = s.get("http://2captcha.com/res.php?key={}&action=get&id={}".format(API_KEY, captcha_id), proxies=proxy).text
                print(recaptcha_answer)
            if not 'OK' in recaptcha_answer:
                raise Exception(recaptcha_answer)
            recaptcha_answer = recaptcha_answer.split('|')
            recaptcha_answer = recaptcha_answer[1]

            s.close()
            file_.close()

            try:
                SetVar(var_, str(recaptcha_answer))
            except Exception as e:
                print(e)

    if (module == "getCallback"):
        webdriver = GetGlobals("web")
        if webdriver.driver_actual_id in webdriver.driver_list:
            driver = webdriver.driver_list[webdriver.driver_actual_id]
        element = driver.execute_script("""document.getElementById("g-recaptcha-response").innerHTML="03AGdBq26bnos_65ksN0ieiuSbazNvydB6wz-tgS37rFT1cqcUKAoPuO-caF-TkU_4oC5SQuX0ySeuwsIHda9Rkw4hOmqOlY4bQjXwNsQ9oFLLMzKJwnb4waIdbEZv-UfLgZev6kb8no5-DdjpQ0ABclcKQUpr-jLy8ilPfLtZJrjABd86E0nyJiv9YufIZb6t_zM_07B5hawP0VHKgffWmk7HZhuifbTqWTA2DZze5RalhZljaficM84n2lMOzGx0NjqtkvTo-w0psDMZTicfX3ed6eW3kzkhCRpjx-bNLlAwjIPxfTWjDhYzOIPm0wbSHNEf3__y_rIgWKzBxodsy4nQurWCyjns7uVK0_aOAn1f03_yFQeG01sSRxXlOu9ApBQbw3htj5ilMy4oXlEZl2Q34wZRRKf5WjAWH9v-3qFed73cuSD_zJ2dnULmw6tITBBhgvPWIHsOqB944Z0wgNJABrUvY6ptJ98plKl747yV3ldrrAJVilEj7ZbLOBinP7bOaD5YQCoefEfViK_4Knh7uJ9Uwd9KMnQeEu1LBlO2z1C66Rl5lXE";""")
        theScript = """function findRecaptchaClients() {
          // eslint-disable-next-line camelcase
          if (typeof (___grecaptcha_cfg) !== 'undefined') {
            // eslint-disable-next-line camelcase, no-undef
            return Object.entries(___grecaptcha_cfg.clients).map(([cid, client]) => {
              const data = { id: cid, version: cid >= 10000 ? 'V3' : 'V2' };
              const objects = Object.entries(client).filter(([_, value]) => value && typeof value === 'object');
        
              objects.forEach(([toplevelKey, toplevel]) => {
                const found = Object.entries(toplevel).find(([_, value]) => (
                  value && typeof value === 'object' && 'sitekey' in value && 'size' in value
                ));
             
                if (typeof toplevel === 'object' && toplevel instanceof HTMLElement && toplevel['tagName'] === 'DIV'){
                    data.pageurl = toplevel.baseURI;
                }
                
                if (found) {
                  const [sublevelKey, sublevel] = found;
        
                  data.sitekey = sublevel.sitekey;
                  const callbackKey = data.version === 'V2' ? 'callback' : 'promise-callback';
                  const callback = sublevel[callbackKey];
                  if (!callback) {
                    data.callback = null;
                    data.function = null;
                  } else {
                    data.function = callback;
                    const keys = [cid, toplevelKey, sublevelKey, callbackKey].map((key) => `['${key}']`).join('');
                    data.callback = `___grecaptcha_cfg.clients${keys}`;
                  }
                }
              });
              return data;
            });
          }
          return [];
        } return findRecaptchaClients()"""
        # driver.switch_to.default_content()
        # elementLocator = driver.find_element_by_xpath("""//*[@id="layoutContainers"]/div[2]/div[1]/div/div/section/div[2]/div[2]/iframe""")
        # driver.switch_to_frame(elementLocator)
        element2 = driver.execute_script(theScript)
        # driver.switch_to.default_content()
        # print(element2)
    
except Exception as e:
    PrintException()
    raise e