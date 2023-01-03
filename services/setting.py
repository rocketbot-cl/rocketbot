from PIL import Image, ImageDraw
import pyautogui
import os
placeholder_path = 'services' + os.sep + \
    'img' + os.sep + 'placeholders' + os.sep


class mouse_setting():
    def __init__(self):
        pass
    duration_mouse_move = 0.5
    screenshot_x = 300
    screenshot_y = 300
    cursor_color = (0,255,0,50)
    cursor_click_color = (255,0,0,50)

    cursor_radius = 10
    
    def mouseScreenShot( self, path, x,y, type_click=0, crop = False):
        #Mouse screenshot
        self = mouse_setting
        tmp_ax = int(self.screenshot_x / 2)
        tmp_ay = int(self.screenshot_y / 2)
        tmp_nx = 1 if (x - tmp_ax ) < 1  else x - tmp_ax
        tmp_ny = 1 if (y - tmp_ay) < 1 else y -tmp_ay
        region = (tmp_nx, tmp_ny,tmp_nx + self.screenshot_x, tmp_ny + self.screenshot_y)
        pyautogui.screenshot(imageFilename=path)
        #add cursor
        image = Image.open(path)
        draw = ImageDraw.Draw(image, 'RGBA')
        width, height = image.size
        draw.ellipse(
            (x-self.cursor_radius, y-self.cursor_radius, x+self.cursor_radius, y+self.cursor_radius),
             fill=mouse_setting.cursor_color if type_click == 0 else mouse_setting.cursor_click_color)
        if crop:
            image = image.crop(box=region)
        image.save(path)


class path_tesseract:
    def __init__(self):
        pass
        
    mac = 'drivers'+os.sep + 'mac'+ os.sep +'tesseract' +os.sep + "tesseract"
    #win = os.getcwd() + os.sep + 'drivers'+os.sep+'win'+os.sep+'tesseract',
    win = "drivers\\win\\tesseract\\tesseract.exe"
    config = '--tessdata-dir "drivers'+os.sep+'tesseract'+os.sep+'tessdata" --user-words  "drivers'+os.sep+'tesseract" --user-patterns "drivers'+os.sep+'tesseract" --oem 3  --psm'
    
    

class path_webdriver:
    """
    Devuelve el path donde se encuentra el webdriver para Selenium
    """

    def __init__(self):
        pass

    class mac:
        chrome = 'drivers/mac/chrome/chromedriver'
        firefox = 'drivers/mac/firefox/geckodriver'
        
    class linux:
        chrome = 'drivers/linux/chrome/chromedriver'
        firefox = 'drivers/linux/firefox/geckodriver'

    class win:
        chrome = 'drivers\\win\\chrome\\chromedriver.exe'

        class firefox:
            x64 = 'drivers\\win\\firefox\\x64\\geckodriver.exe'
            x86 = 'drivers\\win\\firefox\\x86\\geckodriver.exe'

        class ie:
            x64 = 'drivers\\win\\ie\\x64\\IEDriverServer.exe'
            x86 = 'drivers\\win\\ie\\x86\\IEDriverServer.exe'
