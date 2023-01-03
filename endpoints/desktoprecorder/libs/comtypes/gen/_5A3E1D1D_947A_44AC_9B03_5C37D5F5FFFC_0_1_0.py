# -*- coding: mbcs -*-
typelib_path = 'c:\\Users\\danil\\dev\\master\\endpoints\\desktoprecorder\\libs\\comtypes\\test\\TestComServer.tlb'
_lcid = 0 # change this if required
from ctypes import *
import comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0
from comtypes import GUID
from comtypes import BSTR
from ctypes import HRESULT
from comtypes.automation import VARIANT
from comtypes import helpstring
from comtypes import COMMETHOD
from comtypes import dispid
from decimal import Decimal
import datetime
from comtypes import CoClass


class ITestComServerEvents(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IUnknown):
    _case_insensitive_ = True
    'A custom event interface'
    _iid_ = GUID('{F0A241E2-25D1-4F6D-9461-C67BF262779F}')
    _idlflags_ = ['oleautomation']
ITestComServerEvents._methods_ = [
    COMMETHOD([], HRESULT, 'EvalStarted',
              ( ['in'], BSTR, 'what' )),
    COMMETHOD([], HRESULT, 'EvalCompleted',
              ( ['in'], BSTR, 'what' ),
              ( ['in'], VARIANT, 'result' )),
]
################################################################
## code template for ITestComServerEvents implementation
##class ITestComServerEvents_Impl(object):
##    def EvalStarted(self, what):
##        '-no docstring-'
##        #return 
##
##    def EvalCompleted(self, what, result):
##        '-no docstring-'
##        #return 
##

class MYCOLOR(Structure):
    _recordinfo_ = ('{5A3E1D1D-947A-44AC-9B03-5C37D5F5FFFC}', 1, 0, 0, '{086B7F11-AED0-4DE0-B77A-F1998371DA83}')
MYCOLOR._fields_ = [
    ('red', c_double),
    ('green', c_double),
    ('blue', c_double),
]
assert sizeof(MYCOLOR) == 24, sizeof(MYCOLOR)
assert alignment(MYCOLOR) == 8, alignment(MYCOLOR)
class Library(object):
    'TestComServer 1.0 Type library'
    name = 'TestComServerLib'
    _reg_typelib_ = ('{5A3E1D1D-947A-44AC-9B03-5C37D5F5FFFC}', 1, 0)

class ITestComServer(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'ITestComServer interface'
    _iid_ = GUID('{58955C76-60A9-4EEB-8B8A-8F92E90D0FE7}')
    _idlflags_ = ['oleautomation']
ITestComServer._methods_ = [
    COMMETHOD(['propget', helpstring('returns the id of the server')], HRESULT, 'id',
              ( ['out', 'retval'], POINTER(c_uint), 'pid' )),
    COMMETHOD(['propget', helpstring('the name of the server')], HRESULT, 'name',
              ( ['out', 'retval'], POINTER(BSTR), 'pname' )),
    COMMETHOD(['propput', helpstring('the name of the server')], HRESULT, 'name',
              ( ['in'], BSTR, 'pname' )),
    COMMETHOD([helpstring('a method that receives an BSTR [in] parameter')], HRESULT, 'SetName',
              ( ['in'], BSTR, 'name' )),
    COMMETHOD([helpstring('evaluate an expression and return the result')], HRESULT, 'eval',
              ( ['in'], BSTR, 'what' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'presult' )),
    COMMETHOD([], HRESULT, 'do_cy',
              ( ['in', 'optional'], POINTER(c_longlong), 'value', Decimal('32.78') )),
    COMMETHOD([], HRESULT, 'do_date',
              ( ['in', 'optional'], POINTER(c_double), 'value', datetime.datetime(1900, 1, 31, 0, 0) )),
    COMMETHOD([helpstring('execute a statement')], HRESULT, 'Exec',
              ( ['in'], BSTR, 'what' )),
    COMMETHOD([helpstring('execute a statement')], HRESULT, 'Exec2',
              ( ['in'], BSTR, 'what' )),
    COMMETHOD([helpstring('a method with [in] and [out] args in mixed order')], HRESULT, 'MixedInOut',
              ( ['in'], c_int, 'a' ),
              ( ['out'], POINTER(c_int), 'b' ),
              ( ['in'], c_int, 'c' ),
              ( ['out'], POINTER(c_int), 'd' )),
]
################################################################
## code template for ITestComServer implementation
##class ITestComServer_Impl(object):
##    @property
##    def id(self):
##        'returns the id of the server'
##        #return pid
##
##    def _get(self):
##        'the name of the server'
##        #return pname
##    def _set(self, pname):
##        'the name of the server'
##    name = property(_get, _set, doc = _set.__doc__)
##
##    def SetName(self, name):
##        'a method that receives an BSTR [in] parameter'
##        #return 
##
##    def eval(self, what):
##        'evaluate an expression and return the result'
##        #return presult
##
##    def do_cy(self, value):
##        '-no docstring-'
##        #return 
##
##    def do_date(self, value):
##        '-no docstring-'
##        #return 
##
##    def Exec(self, what):
##        'execute a statement'
##        #return 
##
##    def Exec2(self, what):
##        'execute a statement'
##        #return 
##
##    def MixedInOut(self, a, c):
##        'a method with [in] and [out] args in mixed order'
##        #return b, d
##

class TestComServer(CoClass):
    'TestComServer class object'
    _reg_clsid_ = GUID('{1FCA61D1-A1A6-464C-B3A8-E9508B4AC8F7}')
    _idlflags_ = []
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{5A3E1D1D-947A-44AC-9B03-5C37D5F5FFFC}', 1, 0)
TestComServer._com_interfaces_ = [ITestComServer]
TestComServer._outgoing_interfaces_ = [ITestComServerEvents]

__all__ = [ 'MYCOLOR', 'ITestComServerEvents', 'TestComServer',
           'ITestComServer']
from comtypes import _check_version; _check_version('1.1.10', 0.000000)
