# -*- coding: mbcs -*-
typelib_path = 'C:\\Windows\\SysWOW64\\msscript.ocx'
_lcid = 0 # change this if required
from ctypes import *
import comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0
from comtypes import GUID
from comtypes import dispid
from comtypes import DISPMETHOD, DISPPROPERTY, helpstring
from comtypes import CoClass
from comtypes import IUnknown
from ctypes import HRESULT
from comtypes.automation import VARIANT
from comtypes import helpstring
from comtypes import COMMETHOD
from comtypes import BSTR
from ctypes.wintypes import VARIANT_BOOL
from comtypes.automation import IDispatch
from comtypes.automation import _midlSAFEARRAY
STRING = c_char_p


class DScriptControlSource(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    _iid_ = GUID('{8B167D60-8605-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['hidden']
    _methods_ = []
DScriptControlSource._disp_methods_ = [
    DISPMETHOD([dispid(3000), helpstring('Event fired when any error occurs in the scripting engine')], None, 'Error'),
    DISPMETHOD([dispid(3001), helpstring('Event fired when a script is aborted because of a timeout')], None, 'Timeout'),
]
class ScriptControl(CoClass):
    'Control to host scripting engines that understand the ActiveX Scripting interface'
    _reg_clsid_ = GUID('{0E59F1D5-1FBE-11D0-8FF2-00A0D10038BC}')
    _idlflags_ = ['control']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC}', 1, 0)
class IScriptControl(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Control to host scripting engines that understand the ActiveX Scripting interface'
    _iid_ = GUID('{0E59F1D3-1FBE-11D0-8FF2-00A0D10038BC}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
ScriptControl._com_interfaces_ = [IScriptControl]
ScriptControl._outgoing_interfaces_ = [DScriptControlSource]

class IScriptProcedureCollection(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Collection of procedures'
    _iid_ = GUID('{70841C71-067D-11D0-95D8-00A02463AB28}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
class IScriptProcedure(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Describes a procedure'
    _iid_ = GUID('{70841C73-067D-11D0-95D8-00A02463AB28}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
IScriptProcedureCollection._methods_ = [
    COMMETHOD([dispid(-4), 'hidden', 'propget'], HRESULT, '_NewEnum',
              ( ['out', 'retval'], POINTER(POINTER(IUnknown)), 'ppenumProcedures' )),
    COMMETHOD([dispid(0), helpstring('Get a procedure indexed by position or procedure name'), 'propget'], HRESULT, 'Item',
              ( ['in'], VARIANT, 'Index' ),
              ( ['out', 'retval'], POINTER(POINTER(IScriptProcedure)), 'ppdispProcedure' )),
    COMMETHOD([dispid(1), helpstring('Number of procedures'), 'propget'], HRESULT, 'Count',
              ( ['out', 'retval'], POINTER(c_int), 'plCount' )),
]
################################################################
## code template for IScriptProcedureCollection implementation
##class IScriptProcedureCollection_Impl(object):
##    @property
##    def _NewEnum(self):
##        '-no docstring-'
##        #return ppenumProcedures
##
##    @property
##    def Item(self, Index):
##        'Get a procedure indexed by position or procedure name'
##        #return ppdispProcedure
##
##    @property
##    def Count(self):
##        'Number of procedures'
##        #return plCount
##

class Module(CoClass):
    'Context in which functions can be defined and expressions can be evaluated'
    _reg_clsid_ = GUID('{0E59F1DC-1FBE-11D0-8FF2-00A0D10038BC}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC}', 1, 0)
class IScriptModule(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Context in which functions can be defined and expressions can be evaluated'
    _iid_ = GUID('{70841C70-067D-11D0-95D8-00A02463AB28}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
Module._com_interfaces_ = [IScriptModule]

IScriptProcedure._methods_ = [
    COMMETHOD([dispid(0), helpstring('Name of the procedure'), 'propget'], HRESULT, 'Name',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrName' )),
    COMMETHOD([dispid(100), helpstring('Number of arguments that are expected'), 'propget'], HRESULT, 'NumArgs',
              ( ['out', 'retval'], POINTER(c_int), 'pcArgs' )),
    COMMETHOD([dispid(101), helpstring('True if procedure returns a value'), 'propget'], HRESULT, 'HasReturnValue',
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfHasReturnValue' )),
]
################################################################
## code template for IScriptProcedure implementation
##class IScriptProcedure_Impl(object):
##    @property
##    def Name(self):
##        'Name of the procedure'
##        #return pbstrName
##
##    @property
##    def NumArgs(self):
##        'Number of arguments that are expected'
##        #return pcArgs
##
##    @property
##    def HasReturnValue(self):
##        'True if procedure returns a value'
##        #return pfHasReturnValue
##

IScriptModule._methods_ = [
    COMMETHOD([dispid(0), helpstring('Name of the module'), 'propget'], HRESULT, 'Name',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrName' )),
    COMMETHOD([dispid(1000), helpstring('Object exposed by the scripting engine that contains methods and properties defined in the code added to the module'), 'propget'], HRESULT, 'CodeObject',
              ( ['out', 'retval'], POINTER(POINTER(IDispatch)), 'ppdispObject' )),
    COMMETHOD([dispid(1001), helpstring('Collection of procedures that are defined in the module'), 'propget'], HRESULT, 'Procedures',
              ( ['out', 'retval'], POINTER(POINTER(IScriptProcedureCollection)), 'ppdispProcedures' )),
    COMMETHOD([dispid(2000), helpstring('Add code to the module')], HRESULT, 'AddCode',
              ( ['in'], BSTR, 'Code' )),
    COMMETHOD([dispid(2001), helpstring('Evaluate an expression within the context of the module')], HRESULT, 'Eval',
              ( ['in'], BSTR, 'Expression' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarResult' )),
    COMMETHOD([dispid(2002), helpstring('Execute a statement within the context of the module')], HRESULT, 'ExecuteStatement',
              ( ['in'], BSTR, 'Statement' )),
    COMMETHOD([dispid(2003), helpstring('Call a procedure defined in the module')], HRESULT, 'Run',
              ( ['in'], BSTR, 'ProcedureName' ),
              ( ['in'], POINTER(_midlSAFEARRAY(VARIANT)), 'Parameters' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarResult' )),
]
################################################################
## code template for IScriptModule implementation
##class IScriptModule_Impl(object):
##    @property
##    def Name(self):
##        'Name of the module'
##        #return pbstrName
##
##    @property
##    def CodeObject(self):
##        'Object exposed by the scripting engine that contains methods and properties defined in the code added to the module'
##        #return ppdispObject
##
##    @property
##    def Procedures(self):
##        'Collection of procedures that are defined in the module'
##        #return ppdispProcedures
##
##    def AddCode(self, Code):
##        'Add code to the module'
##        #return 
##
##    def Eval(self, Expression):
##        'Evaluate an expression within the context of the module'
##        #return pvarResult
##
##    def ExecuteStatement(self, Statement):
##        'Execute a statement within the context of the module'
##        #return 
##
##    def Run(self, ProcedureName, Parameters):
##        'Call a procedure defined in the module'
##        #return pvarResult
##

class Error(CoClass):
    'Provides access to scripting error information'
    _reg_clsid_ = GUID('{0E59F1DE-1FBE-11D0-8FF2-00A0D10038BC}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC}', 1, 0)
class IScriptError(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Provides access to scripting error information'
    _iid_ = GUID('{70841C78-067D-11D0-95D8-00A02463AB28}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
Error._com_interfaces_ = [IScriptError]


# values for enumeration 'ScriptControlStates'
Initialized = 0
Connected = 1
ScriptControlStates = c_int # enum
class IScriptModuleCollection(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Collection of modules'
    _iid_ = GUID('{70841C6F-067D-11D0-95D8-00A02463AB28}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
IScriptControl._methods_ = [
    COMMETHOD([dispid(1500), helpstring('Language engine to use'), 'propget'], HRESULT, 'Language',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrLanguage' )),
    COMMETHOD([dispid(1500), helpstring('Language engine to use'), 'propput'], HRESULT, 'Language',
              ( ['in'], BSTR, 'pbstrLanguage' )),
    COMMETHOD([dispid(1501), helpstring('State of the control'), 'nonbrowsable', 'propget'], HRESULT, 'State',
              ( ['out', 'retval'], POINTER(ScriptControlStates), 'pssState' )),
    COMMETHOD([dispid(1501), helpstring('State of the control'), 'nonbrowsable', 'propput'], HRESULT, 'State',
              ( ['in'], ScriptControlStates, 'pssState' )),
    COMMETHOD([dispid(1502), helpstring('hWnd used as a parent for displaying UI'), 'nonbrowsable', 'propput'], HRESULT, 'SitehWnd',
              ( ['in'], c_int, 'phwnd' )),
    COMMETHOD([dispid(1502), helpstring('hWnd used as a parent for displaying UI'), 'nonbrowsable', 'propget'], HRESULT, 'SitehWnd',
              ( ['out', 'retval'], POINTER(c_int), 'phwnd' )),
    COMMETHOD([dispid(1503), helpstring('Length of time in milliseconds that a script can execute before being considered hung'), 'propget'], HRESULT, 'Timeout',
              ( ['out', 'retval'], POINTER(c_int), 'plMilleseconds' )),
    COMMETHOD([dispid(1503), helpstring('Length of time in milliseconds that a script can execute before being considered hung'), 'propput'], HRESULT, 'Timeout',
              ( ['in'], c_int, 'plMilleseconds' )),
    COMMETHOD([dispid(1504), helpstring('Enable or disable display of the UI'), 'propget'], HRESULT, 'AllowUI',
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfAllowUI' )),
    COMMETHOD([dispid(1504), helpstring('Enable or disable display of the UI'), 'propput'], HRESULT, 'AllowUI',
              ( ['in'], VARIANT_BOOL, 'pfAllowUI' )),
    COMMETHOD([dispid(1505), helpstring('Force script to execute in safe mode and disallow potentially harmful actions'), 'propget'], HRESULT, 'UseSafeSubset',
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfUseSafeSubset' )),
    COMMETHOD([dispid(1505), helpstring('Force script to execute in safe mode and disallow potentially harmful actions'), 'propput'], HRESULT, 'UseSafeSubset',
              ( ['in'], VARIANT_BOOL, 'pfUseSafeSubset' )),
    COMMETHOD([dispid(1506), helpstring('Collection of modules for the ScriptControl'), 'nonbrowsable', 'propget'], HRESULT, 'Modules',
              ( ['out', 'retval'], POINTER(POINTER(IScriptModuleCollection)), 'ppmods' )),
    COMMETHOD([dispid(1507), helpstring('The last error reported by the scripting engine'), 'nonbrowsable', 'propget'], HRESULT, 'Error',
              ( ['out', 'retval'], POINTER(POINTER(IScriptError)), 'ppse' )),
    COMMETHOD([dispid(1000), helpstring('Object exposed by the scripting engine that contains methods and properties defined in the code added to the global module'), 'propget'], HRESULT, 'CodeObject',
              ( ['out', 'retval'], POINTER(POINTER(IDispatch)), 'ppdispObject' )),
    COMMETHOD([dispid(1001), helpstring('Collection of procedures that are defined in the global module'), 'propget'], HRESULT, 'Procedures',
              ( ['out', 'retval'], POINTER(POINTER(IScriptProcedureCollection)), 'ppdispProcedures' )),
    COMMETHOD([dispid(-552), 'hidden'], HRESULT, '_AboutBox'),
    COMMETHOD([dispid(2500), helpstring('Add an object to the global namespace of the scripting engine')], HRESULT, 'AddObject',
              ( ['in'], BSTR, 'Name' ),
              ( ['in'], POINTER(IDispatch), 'Object' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'AddMembers', False )),
    COMMETHOD([dispid(2501), helpstring('Reset the scripting engine to a newly created state')], HRESULT, 'Reset'),
    COMMETHOD([dispid(2000), helpstring('Add code to the global module')], HRESULT, 'AddCode',
              ( ['in'], BSTR, 'Code' )),
    COMMETHOD([dispid(2001), helpstring('Evaluate an expression within the context of the global module')], HRESULT, 'Eval',
              ( ['in'], BSTR, 'Expression' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarResult' )),
    COMMETHOD([dispid(2002), helpstring('Execute a statement within the context of the global module')], HRESULT, 'ExecuteStatement',
              ( ['in'], BSTR, 'Statement' )),
    COMMETHOD([dispid(2003), helpstring('Call a procedure defined in the global module')], HRESULT, 'Run',
              ( ['in'], BSTR, 'ProcedureName' ),
              ( ['in'], POINTER(_midlSAFEARRAY(VARIANT)), 'Parameters' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarResult' )),
]
################################################################
## code template for IScriptControl implementation
##class IScriptControl_Impl(object):
##    def _get(self):
##        'Language engine to use'
##        #return pbstrLanguage
##    def _set(self, pbstrLanguage):
##        'Language engine to use'
##    Language = property(_get, _set, doc = _set.__doc__)
##
##    def _get(self):
##        'State of the control'
##        #return pssState
##    def _set(self, pssState):
##        'State of the control'
##    State = property(_get, _set, doc = _set.__doc__)
##
##    def _get(self):
##        'hWnd used as a parent for displaying UI'
##        #return phwnd
##    def _set(self, phwnd):
##        'hWnd used as a parent for displaying UI'
##    SitehWnd = property(_get, _set, doc = _set.__doc__)
##
##    def _get(self):
##        'Length of time in milliseconds that a script can execute before being considered hung'
##        #return plMilleseconds
##    def _set(self, plMilleseconds):
##        'Length of time in milliseconds that a script can execute before being considered hung'
##    Timeout = property(_get, _set, doc = _set.__doc__)
##
##    def _get(self):
##        'Enable or disable display of the UI'
##        #return pfAllowUI
##    def _set(self, pfAllowUI):
##        'Enable or disable display of the UI'
##    AllowUI = property(_get, _set, doc = _set.__doc__)
##
##    def _get(self):
##        'Force script to execute in safe mode and disallow potentially harmful actions'
##        #return pfUseSafeSubset
##    def _set(self, pfUseSafeSubset):
##        'Force script to execute in safe mode and disallow potentially harmful actions'
##    UseSafeSubset = property(_get, _set, doc = _set.__doc__)
##
##    @property
##    def Modules(self):
##        'Collection of modules for the ScriptControl'
##        #return ppmods
##
##    @property
##    def Error(self):
##        'The last error reported by the scripting engine'
##        #return ppse
##
##    @property
##    def CodeObject(self):
##        'Object exposed by the scripting engine that contains methods and properties defined in the code added to the global module'
##        #return ppdispObject
##
##    @property
##    def Procedures(self):
##        'Collection of procedures that are defined in the global module'
##        #return ppdispProcedures
##
##    def _AboutBox(self):
##        '-no docstring-'
##        #return 
##
##    def AddObject(self, Name, Object, AddMembers):
##        'Add an object to the global namespace of the scripting engine'
##        #return 
##
##    def Reset(self):
##        'Reset the scripting engine to a newly created state'
##        #return 
##
##    def AddCode(self, Code):
##        'Add code to the global module'
##        #return 
##
##    def Eval(self, Expression):
##        'Evaluate an expression within the context of the global module'
##        #return pvarResult
##
##    def ExecuteStatement(self, Statement):
##        'Execute a statement within the context of the global module'
##        #return 
##
##    def Run(self, ProcedureName, Parameters):
##        'Call a procedure defined in the global module'
##        #return pvarResult
##

NoTimeout = -1 # Constant c_int
IScriptModuleCollection._methods_ = [
    COMMETHOD([dispid(-4), 'hidden', 'propget'], HRESULT, '_NewEnum',
              ( ['out', 'retval'], POINTER(POINTER(IUnknown)), 'ppenumContexts' )),
    COMMETHOD([dispid(0), helpstring('Get a module indexed by position or module name'), 'propget'], HRESULT, 'Item',
              ( ['in'], VARIANT, 'Index' ),
              ( ['out', 'retval'], POINTER(POINTER(IScriptModule)), 'ppmod' )),
    COMMETHOD([dispid(1), helpstring('Number of modules'), 'propget'], HRESULT, 'Count',
              ( ['out', 'retval'], POINTER(c_int), 'plCount' )),
    COMMETHOD([dispid(2), helpstring('Add a new module')], HRESULT, 'Add',
              ( ['in'], BSTR, 'Name' ),
              ( ['in', 'optional'], POINTER(VARIANT), 'Object' ),
              ( ['out', 'retval'], POINTER(POINTER(IScriptModule)), 'ppmod' )),
]
################################################################
## code template for IScriptModuleCollection implementation
##class IScriptModuleCollection_Impl(object):
##    @property
##    def _NewEnum(self):
##        '-no docstring-'
##        #return ppenumContexts
##
##    @property
##    def Item(self, Index):
##        'Get a module indexed by position or module name'
##        #return ppmod
##
##    @property
##    def Count(self):
##        'Number of modules'
##        #return plCount
##
##    def Add(self, Name, Object):
##        'Add a new module'
##        #return ppmod
##

GlobalModule = 'Global' # Constant STRING
class Procedures(CoClass):
    'Collection of procedures'
    _reg_clsid_ = GUID('{0E59F1DB-1FBE-11D0-8FF2-00A0D10038BC}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC}', 1, 0)
Procedures._com_interfaces_ = [IScriptProcedureCollection]

IScriptError._methods_ = [
    COMMETHOD([dispid(201), helpstring('Error number'), 'propget'], HRESULT, 'Number',
              ( ['out', 'retval'], POINTER(c_int), 'plNumber' )),
    COMMETHOD([dispid(202), helpstring('Source of the error'), 'propget'], HRESULT, 'Source',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrSource' )),
    COMMETHOD([dispid(203), helpstring('Friendly description of error'), 'propget'], HRESULT, 'Description',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrDescription' )),
    COMMETHOD([dispid(204), helpstring('File in which help for the error can be found'), 'propget'], HRESULT, 'HelpFile',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrHelpFile' )),
    COMMETHOD([dispid(205), helpstring('Context ID for the topic with information on the error'), 'propget'], HRESULT, 'HelpContext',
              ( ['out', 'retval'], POINTER(c_int), 'plHelpContext' )),
    COMMETHOD([dispid(-517), helpstring('Line of source code on which the error occurred'), 'propget'], HRESULT, 'Text',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrText' )),
    COMMETHOD([dispid(206), helpstring('Source code line number where the error occurred'), 'propget'], HRESULT, 'Line',
              ( ['out', 'retval'], POINTER(c_int), 'plLine' )),
    COMMETHOD([dispid(-529), helpstring('Source code column position where the error occurred'), 'propget'], HRESULT, 'Column',
              ( ['out', 'retval'], POINTER(c_int), 'plColumn' )),
    COMMETHOD([dispid(208), helpstring('Clear the script error')], HRESULT, 'Clear'),
]
################################################################
## code template for IScriptError implementation
##class IScriptError_Impl(object):
##    @property
##    def Number(self):
##        'Error number'
##        #return plNumber
##
##    @property
##    def Source(self):
##        'Source of the error'
##        #return pbstrSource
##
##    @property
##    def Description(self):
##        'Friendly description of error'
##        #return pbstrDescription
##
##    @property
##    def HelpFile(self):
##        'File in which help for the error can be found'
##        #return pbstrHelpFile
##
##    @property
##    def HelpContext(self):
##        'Context ID for the topic with information on the error'
##        #return plHelpContext
##
##    @property
##    def Text(self):
##        'Line of source code on which the error occurred'
##        #return pbstrText
##
##    @property
##    def Line(self):
##        'Source code line number where the error occurred'
##        #return plLine
##
##    @property
##    def Column(self):
##        'Source code column position where the error occurred'
##        #return plColumn
##
##    def Clear(self):
##        'Clear the script error'
##        #return 
##

class Library(object):
    'Microsoft Script Control 1.0'
    name = 'MSScriptControl'
    _reg_typelib_ = ('{0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC}', 1, 0)

class Modules(CoClass):
    'Collection of modules'
    _reg_clsid_ = GUID('{0E59F1DD-1FBE-11D0-8FF2-00A0D10038BC}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC}', 1, 0)
Modules._com_interfaces_ = [IScriptModuleCollection]

class Procedure(CoClass):
    'Describes a procedure'
    _reg_clsid_ = GUID('{0E59F1DA-1FBE-11D0-8FF2-00A0D10038BC}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{0E59F1D2-1FBE-11D0-8FF2-00A0D10038BC}', 1, 0)
Procedure._com_interfaces_ = [IScriptProcedure]

__all__ = [ 'ScriptControl', 'NoTimeout', 'GlobalModule',
           'IScriptModule', 'Error', 'ScriptControlStates',
           'Initialized', 'Procedure', 'IScriptControl',
           'IScriptProcedureCollection', 'Modules', 'Module',
           'Connected', 'Procedures', 'IScriptProcedure',
           'DScriptControlSource', 'IScriptModuleCollection',
           'IScriptError']
from comtypes import _check_version; _check_version('1.1.10', 1575709772.380631)
