from sys import platform as _platform
import os
from PIL import Image
class Notification():
    pass

if _platform == 'darwin':

    class Notification():
        def notify(self, _title, _message, _sound = False, _icon=None):
            os.system("""
              osascript -e 'display notification "{}" with title "{}"'
              """.format(_message, _title))

if _platform.startswith('win'):
    from . import win10toast
    class Notification():
        def notify(self, _title, _message, _sound = False, _icon=None):
            if _icon:
                _icon = str(_icon).replace("\\\\","\\")
                if not _icon.endswith(".ico"):
                    ico_tmp = Image.open(_icon)
                    icon_sizes = [(16,16), (32, 32), (48, 48), (64,64)]
                    ico_tmp.save('logo_notify.ico', sizes=icon_sizes)
                    try:
                        ico_tmp.close()
                    except:
                        pass
                    _icon = "logo_notify.ico"
            b = win10toast.ToastNotifier()
            b.show_toast(_title, _message, icon_path=_icon, duration=5,threaded=True)

if _platform == 'linux':
    try:
        import gi
        gi.require_version('Notify', '0.7')
        from gi.repository import Notify
    

        class Notification():
            def notify(self, _title, _message,  _sound = False, _icon=None):
                # One time initialization of libnotify
                Notify.init("Rocketbot")
                notification = Notify.Notification.new(
                    _title,
                    _message,
                    _icon
                )

                # Actually show on screen
                notification.show()
                Notify.uninit()
    except:
        print("No Gi library for notify")

def notify(title="", message="", sound=False, icon=None):
    try:
        N = Notification()
        N.notify(_title=title, _message=message, _sound=sound, _icon=icon)
    except Exception as e:
        print(e)
