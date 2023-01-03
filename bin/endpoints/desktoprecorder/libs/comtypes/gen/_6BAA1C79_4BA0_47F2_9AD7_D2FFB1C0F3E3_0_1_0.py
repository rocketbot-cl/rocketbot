# -*- coding: mbcs -*-
typelib_path = 'c:\\Users\\danil\\dev\\master\\endpoints\\desktoprecorder\\libs\\comtypes\\test\\TestDispServer.tlb'
_lcid = 0 # change this if required
from ctypes import *
import comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0
from comtypes import GUID
from comtypes import BSTR
from comtypes.automation import VARIANT
from comtypes import dispid
from comtypes import DISPMETHOD, DISPPROPERTY, helpstring
from decimal import Decimal
import datetime
from comtypes import CoClass


class DTestDispServer(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'DTestDispServer interface'
    _iid_ = GUID('{D44D11BA-AA1F-4E93-8F5A-8FA0A4715241}')
    _idlflags_ = []
    _methods_ = []
DTestDispServer._disp_methods_ = [
    DISPPROPERTY([dispid(10), helpstring('the id of the server'), 'readonly'], c_uint, 'id'),
    DISPPROPERTY([dispid(11), helpstring('the name of the server')], BSTR, 'name'),
    DISPMETHOD([dispid(12), helpstring('a method that receives an BSTR [in] parameter')], None, 'SetName',
               ( ['in'], BSTR, 'name' )),
    DISPMETHOD([dispid(13), helpstring('evaluate an expression and return the result')], VARIANT, 'eval',
               ( ['in'], BSTR, 'what' )),
    DISPMETHOD([dispid(14), helpstring('evaluate an expression and return the result')], VARIANT, 'eval2',
               ( ['in'], BSTR, 'what' )),
    DISPMETHOD([dispid(16), helpstring('execute a statement')], None, 'Exec',
               ( ['in'], BSTR, 'what' )),
    DISPMETHOD([dispid(17), helpstring('execute a statement')], None, 'Exec2',
               ( ['in'], BSTR, 'what' )),
    DISPMETHOD([dispid(100)], None, 'do_cy',
               ( ['in', 'optional'], POINTER(c_longlong), 'value', Decimal('32.78') )),
    DISPMETHOD([dispid(101)], None, 'do_date',
               ( ['in', 'optional'], POINTER(c_double), 'value', datetime.datetime(1900, 1, 31, 0, 0) )),
]
class DTestDispServerEvents(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'A custom event interface'
    _iid_ = GUID('{3B3B2A10-7FEF-4BCC-90FE-43A221162B1B}')
    _idlflags_ = []
    _methods_ = []
DTestDispServerEvents._disp_methods_ = [
    DISPMETHOD([dispid(10)], None, 'EvalStarted',
               ( ['in'], BSTR, 'what' )),
    DISPMETHOD([dispid(11)], None, 'EvalCompleted',
               ( ['in'], BSTR, 'what' ),
               ( ['in'], VARIANT, 'result' )),
]
class TestDispServer(CoClass):
    'TestDispServer class object'
    _reg_clsid_ = GUID('{BB2ABA53-9D42-435B-ACC3-AE2C274517B0}')
    _idlflags_ = []
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{6BAA1C79-4BA0-47F2-9AD7-D2FFB1C0F3E3}', 1, 0)
TestDispServer._com_interfaces_ = [DTestDispServer]
TestDispServer._outgoing_interfaces_ = [DTestDispServerEvents]

class Library(object):
    'TestDispServer 1.0 Type library'
    name = 'TestDispServerLib'
    _reg_typelib_ = ('{6BAA1C79-4BA0-47F2-9AD7-D2FFB1C0F3E3}', 1, 0)

__all__ = [ 'DTestDispServer', 'DTestDispServerEvents',
           'TestDispServer']
from comtypes import _check_version; _check_version('1.1.10', 0.000000)
