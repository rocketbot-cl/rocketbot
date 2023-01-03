# -*- coding: mbcs -*-
typelib_path = 'oleacc.dll'
_lcid = 0 # change this if required
from ctypes import *
import comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0
from comtypes import GUID
from comtypes.automation import VARIANT
from ctypes import HRESULT
from comtypes import wireHWND
from comtypes import helpstring
from comtypes import COMMETHOD
from comtypes import dispid
WSTRING = c_wchar_p
from comtypes import CoClass
from comtypes.automation import IDispatch
from comtypes import BSTR


class IAccPropServices(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IUnknown):
    _case_insensitive_ = True
    _iid_ = GUID('{6E26E776-04F0-495D-80E4-3330352E3169}')
    _idlflags_ = []
class IAccPropServer(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IUnknown):
    _case_insensitive_ = True
    _iid_ = GUID('{76C0DBBB-15E0-4E7B-B61B-20EEEA2001E0}')
    _idlflags_ = []

# values for enumeration 'AnnoScope'
ANNO_THIS = 0
ANNO_CONTAINER = 1
AnnoScope = c_int # enum
class _RemotableHandle(Structure):
    pass
wireHMENU = POINTER(_RemotableHandle)
IAccPropServices._methods_ = [
    COMMETHOD([], HRESULT, 'SetPropValue',
              ( ['in'], POINTER(c_ubyte), 'pIDString' ),
              ( ['in'], c_ulong, 'dwIDStringLen' ),
              ( ['in'], comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID, 'idProp' ),
              ( ['in'], VARIANT, 'var' )),
    COMMETHOD([], HRESULT, 'SetPropServer',
              ( ['in'], POINTER(c_ubyte), 'pIDString' ),
              ( ['in'], c_ulong, 'dwIDStringLen' ),
              ( ['in'], POINTER(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID), 'paProps' ),
              ( ['in'], c_int, 'cProps' ),
              ( ['in'], POINTER(IAccPropServer), 'pServer' ),
              ( ['in'], AnnoScope, 'AnnoScope' )),
    COMMETHOD([], HRESULT, 'ClearProps',
              ( ['in'], POINTER(c_ubyte), 'pIDString' ),
              ( ['in'], c_ulong, 'dwIDStringLen' ),
              ( ['in'], POINTER(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID), 'paProps' ),
              ( ['in'], c_int, 'cProps' )),
    COMMETHOD([], HRESULT, 'SetHwndProp',
              ( ['in'], wireHWND, 'hwnd' ),
              ( ['in'], c_ulong, 'idObject' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID, 'idProp' ),
              ( ['in'], VARIANT, 'var' )),
    COMMETHOD([], HRESULT, 'SetHwndPropStr',
              ( ['in'], wireHWND, 'hwnd' ),
              ( ['in'], c_ulong, 'idObject' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID, 'idProp' ),
              ( ['in'], WSTRING, 'str' )),
    COMMETHOD([], HRESULT, 'SetHwndPropServer',
              ( ['in'], wireHWND, 'hwnd' ),
              ( ['in'], c_ulong, 'idObject' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], POINTER(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID), 'paProps' ),
              ( ['in'], c_int, 'cProps' ),
              ( ['in'], POINTER(IAccPropServer), 'pServer' ),
              ( ['in'], AnnoScope, 'AnnoScope' )),
    COMMETHOD([], HRESULT, 'ClearHwndProps',
              ( ['in'], wireHWND, 'hwnd' ),
              ( ['in'], c_ulong, 'idObject' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], POINTER(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID), 'paProps' ),
              ( ['in'], c_int, 'cProps' )),
    COMMETHOD([], HRESULT, 'ComposeHwndIdentityString',
              ( ['in'], wireHWND, 'hwnd' ),
              ( ['in'], c_ulong, 'idObject' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['out'], POINTER(POINTER(c_ubyte)), 'ppIDString' ),
              ( ['out'], POINTER(c_ulong), 'pdwIDStringLen' )),
    COMMETHOD([], HRESULT, 'DecomposeHwndIdentityString',
              ( ['in'], POINTER(c_ubyte), 'pIDString' ),
              ( ['in'], c_ulong, 'dwIDStringLen' ),
              ( ['out'], POINTER(wireHWND), 'phwnd' ),
              ( ['out'], POINTER(c_ulong), 'pidObject' ),
              ( ['out'], POINTER(c_ulong), 'pidChild' )),
    COMMETHOD([], HRESULT, 'SetHmenuProp',
              ( ['in'], wireHMENU, 'hmenu' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID, 'idProp' ),
              ( ['in'], VARIANT, 'var' )),
    COMMETHOD([], HRESULT, 'SetHmenuPropStr',
              ( ['in'], wireHMENU, 'hmenu' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID, 'idProp' ),
              ( ['in'], WSTRING, 'str' )),
    COMMETHOD([], HRESULT, 'SetHmenuPropServer',
              ( ['in'], wireHMENU, 'hmenu' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], POINTER(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID), 'paProps' ),
              ( ['in'], c_int, 'cProps' ),
              ( ['in'], POINTER(IAccPropServer), 'pServer' ),
              ( ['in'], AnnoScope, 'AnnoScope' )),
    COMMETHOD([], HRESULT, 'ClearHmenuProps',
              ( ['in'], wireHMENU, 'hmenu' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['in'], POINTER(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID), 'paProps' ),
              ( ['in'], c_int, 'cProps' )),
    COMMETHOD([], HRESULT, 'ComposeHmenuIdentityString',
              ( ['in'], wireHMENU, 'hmenu' ),
              ( ['in'], c_ulong, 'idChild' ),
              ( ['out'], POINTER(POINTER(c_ubyte)), 'ppIDString' ),
              ( ['out'], POINTER(c_ulong), 'pdwIDStringLen' )),
    COMMETHOD([], HRESULT, 'DecomposeHmenuIdentityString',
              ( ['in'], POINTER(c_ubyte), 'pIDString' ),
              ( ['in'], c_ulong, 'dwIDStringLen' ),
              ( ['out'], POINTER(wireHMENU), 'phmenu' ),
              ( ['out'], POINTER(c_ulong), 'pidChild' )),
]
################################################################
## code template for IAccPropServices implementation
##class IAccPropServices_Impl(object):
##    def SetPropValue(self, pIDString, dwIDStringLen, idProp, var):
##        '-no docstring-'
##        #return 
##
##    def SetPropServer(self, pIDString, dwIDStringLen, paProps, cProps, pServer, AnnoScope):
##        '-no docstring-'
##        #return 
##
##    def ClearProps(self, pIDString, dwIDStringLen, paProps, cProps):
##        '-no docstring-'
##        #return 
##
##    def SetHwndProp(self, hwnd, idObject, idChild, idProp, var):
##        '-no docstring-'
##        #return 
##
##    def SetHwndPropStr(self, hwnd, idObject, idChild, idProp, str):
##        '-no docstring-'
##        #return 
##
##    def SetHwndPropServer(self, hwnd, idObject, idChild, paProps, cProps, pServer, AnnoScope):
##        '-no docstring-'
##        #return 
##
##    def ClearHwndProps(self, hwnd, idObject, idChild, paProps, cProps):
##        '-no docstring-'
##        #return 
##
##    def ComposeHwndIdentityString(self, hwnd, idObject, idChild):
##        '-no docstring-'
##        #return ppIDString, pdwIDStringLen
##
##    def DecomposeHwndIdentityString(self, pIDString, dwIDStringLen):
##        '-no docstring-'
##        #return phwnd, pidObject, pidChild
##
##    def SetHmenuProp(self, hmenu, idChild, idProp, var):
##        '-no docstring-'
##        #return 
##
##    def SetHmenuPropStr(self, hmenu, idChild, idProp, str):
##        '-no docstring-'
##        #return 
##
##    def SetHmenuPropServer(self, hmenu, idChild, paProps, cProps, pServer, AnnoScope):
##        '-no docstring-'
##        #return 
##
##    def ClearHmenuProps(self, hmenu, idChild, paProps, cProps):
##        '-no docstring-'
##        #return 
##
##    def ComposeHmenuIdentityString(self, hmenu, idChild):
##        '-no docstring-'
##        #return ppIDString, pdwIDStringLen
##
##    def DecomposeHmenuIdentityString(self, pIDString, dwIDStringLen):
##        '-no docstring-'
##        #return phmenu, pidChild
##

class IAccIdentity(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IUnknown):
    _case_insensitive_ = True
    _iid_ = GUID('{7852B78D-1CFD-41C1-A615-9C0C85960B5F}')
    _idlflags_ = []
IAccIdentity._methods_ = [
    COMMETHOD([], HRESULT, 'GetIdentityString',
              ( ['in'], c_ulong, 'dwIDChild' ),
              ( ['out'], POINTER(POINTER(c_ubyte)), 'ppIDString' ),
              ( ['out'], POINTER(c_ulong), 'pdwIDStringLen' )),
]
################################################################
## code template for IAccIdentity implementation
##class IAccIdentity_Impl(object):
##    def GetIdentityString(self, dwIDChild):
##        '-no docstring-'
##        #return ppIDString, pdwIDStringLen
##

class CAccPropServices(CoClass):
    _reg_clsid_ = GUID('{B5F8350B-0548-48B1-A6EE-88BD00B4A5E7}')
    _idlflags_ = []
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{1EA4DBF0-3C3B-11CF-810C-00AA00389B71}', 1, 1)
CAccPropServices._com_interfaces_ = [IAccPropServices]

class IAccessible(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    _iid_ = GUID('{618736E0-3C3D-11CF-810C-00AA00389B71}')
    _idlflags_ = ['hidden', 'dual', 'oleautomation']
IAccessible._methods_ = [
    COMMETHOD([dispid(-5000), 'hidden', 'propget'], HRESULT, 'accParent',
              ( ['out', 'retval'], POINTER(POINTER(IDispatch)), 'ppdispParent' )),
    COMMETHOD([dispid(-5001), 'hidden', 'propget'], HRESULT, 'accChildCount',
              ( ['out', 'retval'], POINTER(c_int), 'pcountChildren' )),
    COMMETHOD([dispid(-5002), 'hidden', 'propget'], HRESULT, 'accChild',
              ( ['in'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(POINTER(IDispatch)), 'ppdispChild' )),
    COMMETHOD([dispid(-5003), 'hidden', 'propget'], HRESULT, 'accName',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pszName' )),
    COMMETHOD([dispid(-5004), 'hidden', 'propget'], HRESULT, 'accValue',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pszValue' )),
    COMMETHOD([dispid(-5005), 'hidden', 'propget'], HRESULT, 'accDescription',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pszDescription' )),
    COMMETHOD([dispid(-5006), 'hidden', 'propget'], HRESULT, 'accRole',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarRole' )),
    COMMETHOD([dispid(-5007), 'hidden', 'propget'], HRESULT, 'accState',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarState' )),
    COMMETHOD([dispid(-5008), 'hidden', 'propget'], HRESULT, 'accHelp',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pszHelp' )),
    COMMETHOD([dispid(-5009), 'hidden', 'propget'], HRESULT, 'accHelpTopic',
              ( ['out'], POINTER(BSTR), 'pszHelpFile' ),
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(c_int), 'pidTopic' )),
    COMMETHOD([dispid(-5010), 'hidden', 'propget'], HRESULT, 'accKeyboardShortcut',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pszKeyboardShortcut' )),
    COMMETHOD([dispid(-5011), 'hidden', 'propget'], HRESULT, 'accFocus',
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarChild' )),
    COMMETHOD([dispid(-5012), 'hidden', 'propget'], HRESULT, 'accSelection',
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarChildren' )),
    COMMETHOD([dispid(-5013), 'hidden', 'propget'], HRESULT, 'accDefaultAction',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pszDefaultAction' )),
    COMMETHOD([dispid(-5014), 'hidden'], HRESULT, 'accSelect',
              ( ['in'], c_int, 'flagsSelect' ),
              ( ['in', 'optional'], VARIANT, 'varChild' )),
    COMMETHOD([dispid(-5015), 'hidden'], HRESULT, 'accLocation',
              ( ['out'], POINTER(c_int), 'pxLeft' ),
              ( ['out'], POINTER(c_int), 'pyTop' ),
              ( ['out'], POINTER(c_int), 'pcxWidth' ),
              ( ['out'], POINTER(c_int), 'pcyHeight' ),
              ( ['in', 'optional'], VARIANT, 'varChild' )),
    COMMETHOD([dispid(-5016), 'hidden'], HRESULT, 'accNavigate',
              ( ['in'], c_int, 'navDir' ),
              ( ['in', 'optional'], VARIANT, 'varStart' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarEndUpAt' )),
    COMMETHOD([dispid(-5017), 'hidden'], HRESULT, 'accHitTest',
              ( ['in'], c_int, 'xLeft' ),
              ( ['in'], c_int, 'yTop' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarChild' )),
    COMMETHOD([dispid(-5018), 'hidden'], HRESULT, 'accDoDefaultAction',
              ( ['in', 'optional'], VARIANT, 'varChild' )),
    COMMETHOD([dispid(-5003), 'hidden', 'propput'], HRESULT, 'accName',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['in'], BSTR, 'pszName' )),
    COMMETHOD([dispid(-5004), 'hidden', 'propput'], HRESULT, 'accValue',
              ( ['in', 'optional'], VARIANT, 'varChild' ),
              ( ['in'], BSTR, 'pszValue' )),
]
################################################################
## code template for IAccessible implementation
##class IAccessible_Impl(object):
##    @property
##    def accParent(self):
##        '-no docstring-'
##        #return ppdispParent
##
##    @property
##    def accChildCount(self):
##        '-no docstring-'
##        #return pcountChildren
##
##    @property
##    def accChild(self, varChild):
##        '-no docstring-'
##        #return ppdispChild
##
##    def _get(self, varChild):
##        '-no docstring-'
##        #return pszName
##    def _set(self, varChild, pszName):
##        '-no docstring-'
##    accName = property(_get, _set, doc = _set.__doc__)
##
##    def _get(self, varChild):
##        '-no docstring-'
##        #return pszValue
##    def _set(self, varChild, pszValue):
##        '-no docstring-'
##    accValue = property(_get, _set, doc = _set.__doc__)
##
##    @property
##    def accDescription(self, varChild):
##        '-no docstring-'
##        #return pszDescription
##
##    @property
##    def accRole(self, varChild):
##        '-no docstring-'
##        #return pvarRole
##
##    @property
##    def accState(self, varChild):
##        '-no docstring-'
##        #return pvarState
##
##    @property
##    def accHelp(self, varChild):
##        '-no docstring-'
##        #return pszHelp
##
##    @property
##    def accHelpTopic(self, varChild):
##        '-no docstring-'
##        #return pszHelpFile, pidTopic
##
##    @property
##    def accKeyboardShortcut(self, varChild):
##        '-no docstring-'
##        #return pszKeyboardShortcut
##
##    @property
##    def accFocus(self):
##        '-no docstring-'
##        #return pvarChild
##
##    @property
##    def accSelection(self):
##        '-no docstring-'
##        #return pvarChildren
##
##    @property
##    def accDefaultAction(self, varChild):
##        '-no docstring-'
##        #return pszDefaultAction
##
##    def accSelect(self, flagsSelect, varChild):
##        '-no docstring-'
##        #return 
##
##    def accLocation(self, varChild):
##        '-no docstring-'
##        #return pxLeft, pyTop, pcxWidth, pcyHeight
##
##    def accNavigate(self, navDir, varStart):
##        '-no docstring-'
##        #return pvarEndUpAt
##
##    def accHitTest(self, xLeft, yTop):
##        '-no docstring-'
##        #return pvarChild
##
##    def accDoDefaultAction(self, varChild):
##        '-no docstring-'
##        #return 
##

class Library(object):
    name = 'Accessibility'
    _reg_typelib_ = ('{1EA4DBF0-3C3B-11CF-810C-00AA00389B71}', 1, 1)

IAccPropServer._methods_ = [
    COMMETHOD([], HRESULT, 'GetPropValue',
              ( ['in'], POINTER(c_ubyte), 'pIDString' ),
              ( ['in'], c_ulong, 'dwIDStringLen' ),
              ( ['in'], comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.GUID, 'idProp' ),
              ( ['out'], POINTER(VARIANT), 'pvarValue' ),
              ( ['out'], POINTER(c_int), 'pfHasProp' )),
]
################################################################
## code template for IAccPropServer implementation
##class IAccPropServer_Impl(object):
##    def GetPropValue(self, pIDString, dwIDStringLen, idProp):
##        '-no docstring-'
##        #return pvarValue, pfHasProp
##

class __MIDL_IWinTypes_0009(Union):
    pass
__MIDL_IWinTypes_0009._fields_ = [
    ('hInproc', c_int),
    ('hRemote', c_int),
]
assert sizeof(__MIDL_IWinTypes_0009) == 4, sizeof(__MIDL_IWinTypes_0009)
assert alignment(__MIDL_IWinTypes_0009) == 4, alignment(__MIDL_IWinTypes_0009)
class IAccessibleHandler(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IUnknown):
    _case_insensitive_ = True
    _iid_ = GUID('{03022430-ABC4-11D0-BDE2-00AA001A1953}')
    _idlflags_ = ['hidden', 'oleautomation']
IAccessibleHandler._methods_ = [
    COMMETHOD([], HRESULT, 'AccessibleObjectFromID',
              ( ['in'], c_int, 'hwnd' ),
              ( ['in'], c_int, 'lObjectID' ),
              ( ['out'], POINTER(POINTER(IAccessible)), 'pIAccessible' )),
]
################################################################
## code template for IAccessibleHandler implementation
##class IAccessibleHandler_Impl(object):
##    def AccessibleObjectFromID(self, hwnd, lObjectID):
##        '-no docstring-'
##        #return pIAccessible
##

_RemotableHandle._fields_ = [
    ('fContext', c_int),
    ('u', __MIDL_IWinTypes_0009),
]
assert sizeof(_RemotableHandle) == 8, sizeof(_RemotableHandle)
assert alignment(_RemotableHandle) == 4, alignment(_RemotableHandle)
__all__ = [ 'ANNO_CONTAINER', '__MIDL_IWinTypes_0009', 'IAccIdentity',
           'ANNO_THIS', 'IAccessibleHandler', '_RemotableHandle',
           'IAccessible', 'AnnoScope', 'wireHMENU',
           'IAccPropServices', 'IAccPropServer', 'CAccPropServices']
from comtypes import _check_version; _check_version('1.1.10', 1618527748.360503)
