# -*- coding: mbcs -*-
typelib_path = 'scrrun.dll'
_lcid = 0 # change this if required
from ctypes import *
import comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0
from comtypes import GUID
from ctypes import HRESULT
from comtypes import BSTR
from ctypes.wintypes import VARIANT_BOOL
from comtypes import helpstring
from comtypes import COMMETHOD
from comtypes import dispid
from comtypes.automation import VARIANT
from comtypes import IUnknown
from comtypes import CoClass


class IFileSystem(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'FileSystemObject'
    _iid_ = GUID('{0AB5A3D0-E5B6-11D0-ABF5-00A0C90FFFC0}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
class IFileSystem3(IFileSystem):
    _case_insensitive_ = True
    'FileSystemObject'
    _iid_ = GUID('{2A0B9D10-4B87-11D3-A97A-00104B365C9F}')
    _idlflags_ = ['dual', 'nonextensible', 'oleautomation']
class IDriveCollection(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Drive Collection Interface'
    _iid_ = GUID('{C7C3F5A1-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
class IDrive(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Drive Interface'
    _iid_ = GUID('{C7C3F5A0-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
class IFile(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'File Interface'
    _iid_ = GUID('{C7C3F5A4-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
class IFolder(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Folder Interface'
    _iid_ = GUID('{C7C3F5A2-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']

# values for enumeration '__MIDL___MIDL_itf_scrrun_0001_0001_0002'
WindowsFolder = 0
SystemFolder = 1
TemporaryFolder = 2
__MIDL___MIDL_itf_scrrun_0001_0001_0002 = c_int # enum
SpecialFolderConst = __MIDL___MIDL_itf_scrrun_0001_0001_0002
class ITextStream(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Scripting.TextStream Interface'
    _iid_ = GUID('{53BAD8C1-E718-11CF-893D-00A0C9054228}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']

# values for enumeration 'IOMode'
ForReading = 1
ForWriting = 2
ForAppending = 8
IOMode = c_int # enum

# values for enumeration 'Tristate'
TristateTrue = -1
TristateFalse = 0
TristateUseDefault = -2
TristateMixed = -2
Tristate = c_int # enum
IFileSystem._methods_ = [
    COMMETHOD([dispid(10010), helpstring('Get drives collection'), 'propget'], HRESULT, 'Drives',
              ( ['out', 'retval'], POINTER(POINTER(IDriveCollection)), 'ppdrives' )),
    COMMETHOD([dispid(10000), helpstring('Generate a path from an existing path and a name')], HRESULT, 'BuildPath',
              ( ['in'], BSTR, 'Path' ),
              ( ['in'], BSTR, 'Name' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10004), helpstring('Return drive from a path')], HRESULT, 'GetDriveName',
              ( ['in'], BSTR, 'Path' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10005), helpstring('Return path to the parent folder')], HRESULT, 'GetParentFolderName',
              ( ['in'], BSTR, 'Path' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10006), helpstring('Return the file name from a path')], HRESULT, 'GetFileName',
              ( ['in'], BSTR, 'Path' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10007), helpstring('Return base name from a path')], HRESULT, 'GetBaseName',
              ( ['in'], BSTR, 'Path' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10008), helpstring('Return extension from path')], HRESULT, 'GetExtensionName',
              ( ['in'], BSTR, 'Path' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10002), helpstring('Return the canonical representation of the path')], HRESULT, 'GetAbsolutePathName',
              ( ['in'], BSTR, 'Path' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10003), helpstring('Generate name that can be used to name a temporary file')], HRESULT, 'GetTempName',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrResult' )),
    COMMETHOD([dispid(10015), helpstring('Check if a drive or a share exists')], HRESULT, 'DriveExists',
              ( ['in'], BSTR, 'DriveSpec' ),
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfExists' )),
    COMMETHOD([dispid(10016), helpstring('Check if a file exists')], HRESULT, 'FileExists',
              ( ['in'], BSTR, 'FileSpec' ),
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfExists' )),
    COMMETHOD([dispid(10017), helpstring('Check if a path exists')], HRESULT, 'FolderExists',
              ( ['in'], BSTR, 'FolderSpec' ),
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfExists' )),
    COMMETHOD([dispid(10011), helpstring('Get drive or UNC share')], HRESULT, 'GetDrive',
              ( ['in'], BSTR, 'DriveSpec' ),
              ( ['out', 'retval'], POINTER(POINTER(IDrive)), 'ppdrive' )),
    COMMETHOD([dispid(10012), helpstring('Get file')], HRESULT, 'GetFile',
              ( ['in'], BSTR, 'FilePath' ),
              ( ['out', 'retval'], POINTER(POINTER(IFile)), 'ppfile' )),
    COMMETHOD([dispid(10013), helpstring('Get folder')], HRESULT, 'GetFolder',
              ( ['in'], BSTR, 'FolderPath' ),
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(10014), helpstring('Get location of various system folders')], HRESULT, 'GetSpecialFolder',
              ( ['in'], SpecialFolderConst, 'SpecialFolder' ),
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(1200), helpstring('Delete a file')], HRESULT, 'DeleteFile',
              ( ['in'], BSTR, 'FileSpec' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Force', False )),
    COMMETHOD([dispid(1201), helpstring('Delete a folder')], HRESULT, 'DeleteFolder',
              ( ['in'], BSTR, 'FolderSpec' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Force', False )),
    COMMETHOD([dispid(1204), helpstring('Move a file')], HRESULT, 'MoveFile',
              ( ['in'], BSTR, 'Source' ),
              ( ['in'], BSTR, 'Destination' )),
    COMMETHOD([dispid(1205), helpstring('Move a folder')], HRESULT, 'MoveFolder',
              ( ['in'], BSTR, 'Source' ),
              ( ['in'], BSTR, 'Destination' )),
    COMMETHOD([dispid(1202), helpstring('Copy a file')], HRESULT, 'CopyFile',
              ( ['in'], BSTR, 'Source' ),
              ( ['in'], BSTR, 'Destination' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'OverWriteFiles', True )),
    COMMETHOD([dispid(1203), helpstring('Copy a folder')], HRESULT, 'CopyFolder',
              ( ['in'], BSTR, 'Source' ),
              ( ['in'], BSTR, 'Destination' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'OverWriteFiles', True )),
    COMMETHOD([dispid(1120), helpstring('Create a folder')], HRESULT, 'CreateFolder',
              ( ['in'], BSTR, 'Path' ),
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(1101), helpstring('Create a file as a TextStream')], HRESULT, 'CreateTextFile',
              ( ['in'], BSTR, 'FileName' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Overwrite', True ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Unicode', False ),
              ( ['out', 'retval'], POINTER(POINTER(ITextStream)), 'ppts' )),
    COMMETHOD([dispid(1100), helpstring('Open a file as a TextStream')], HRESULT, 'OpenTextFile',
              ( ['in'], BSTR, 'FileName' ),
              ( ['in', 'optional'], IOMode, 'IOMode', 1 ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Create', False ),
              ( ['in', 'optional'], Tristate, 'Format', 0 ),
              ( ['out', 'retval'], POINTER(POINTER(ITextStream)), 'ppts' )),
]
################################################################
## code template for IFileSystem implementation
##class IFileSystem_Impl(object):
##    @property
##    def Drives(self):
##        'Get drives collection'
##        #return ppdrives
##
##    def BuildPath(self, Path, Name):
##        'Generate a path from an existing path and a name'
##        #return pbstrResult
##
##    def GetDriveName(self, Path):
##        'Return drive from a path'
##        #return pbstrResult
##
##    def GetParentFolderName(self, Path):
##        'Return path to the parent folder'
##        #return pbstrResult
##
##    def GetFileName(self, Path):
##        'Return the file name from a path'
##        #return pbstrResult
##
##    def GetBaseName(self, Path):
##        'Return base name from a path'
##        #return pbstrResult
##
##    def GetExtensionName(self, Path):
##        'Return extension from path'
##        #return pbstrResult
##
##    def GetAbsolutePathName(self, Path):
##        'Return the canonical representation of the path'
##        #return pbstrResult
##
##    def GetTempName(self):
##        'Generate name that can be used to name a temporary file'
##        #return pbstrResult
##
##    def DriveExists(self, DriveSpec):
##        'Check if a drive or a share exists'
##        #return pfExists
##
##    def FileExists(self, FileSpec):
##        'Check if a file exists'
##        #return pfExists
##
##    def FolderExists(self, FolderSpec):
##        'Check if a path exists'
##        #return pfExists
##
##    def GetDrive(self, DriveSpec):
##        'Get drive or UNC share'
##        #return ppdrive
##
##    def GetFile(self, FilePath):
##        'Get file'
##        #return ppfile
##
##    def GetFolder(self, FolderPath):
##        'Get folder'
##        #return ppfolder
##
##    def GetSpecialFolder(self, SpecialFolder):
##        'Get location of various system folders'
##        #return ppfolder
##
##    def DeleteFile(self, FileSpec, Force):
##        'Delete a file'
##        #return 
##
##    def DeleteFolder(self, FolderSpec, Force):
##        'Delete a folder'
##        #return 
##
##    def MoveFile(self, Source, Destination):
##        'Move a file'
##        #return 
##
##    def MoveFolder(self, Source, Destination):
##        'Move a folder'
##        #return 
##
##    def CopyFile(self, Source, Destination, OverWriteFiles):
##        'Copy a file'
##        #return 
##
##    def CopyFolder(self, Source, Destination, OverWriteFiles):
##        'Copy a folder'
##        #return 
##
##    def CreateFolder(self, Path):
##        'Create a folder'
##        #return ppfolder
##
##    def CreateTextFile(self, FileName, Overwrite, Unicode):
##        'Create a file as a TextStream'
##        #return ppts
##
##    def OpenTextFile(self, FileName, IOMode, Create, Format):
##        'Open a file as a TextStream'
##        #return ppts
##


# values for enumeration '__MIDL___MIDL_itf_scrrun_0001_0001_0003'
StdIn = 0
StdOut = 1
StdErr = 2
__MIDL___MIDL_itf_scrrun_0001_0001_0003 = c_int # enum
StandardStreamTypes = __MIDL___MIDL_itf_scrrun_0001_0001_0003
IFileSystem3._methods_ = [
    COMMETHOD([dispid(20000), helpstring('Retrieve the standard input, output or error stream')], HRESULT, 'GetStandardStream',
              ( ['in'], StandardStreamTypes, 'StandardStreamType' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Unicode', False ),
              ( ['out', 'retval'], POINTER(POINTER(ITextStream)), 'ppts' )),
    COMMETHOD([dispid(20010), helpstring('Retrieve the file version of the specified file into a string')], HRESULT, 'GetFileVersion',
              ( ['in'], BSTR, 'FileName' ),
              ( ['out', 'retval'], POINTER(BSTR), 'FileVersion' )),
]
################################################################
## code template for IFileSystem3 implementation
##class IFileSystem3_Impl(object):
##    def GetStandardStream(self, StandardStreamType, Unicode):
##        'Retrieve the standard input, output or error stream'
##        #return ppts
##
##    def GetFileVersion(self, FileName):
##        'Retrieve the file version of the specified file into a string'
##        #return FileVersion
##

IDriveCollection._methods_ = [
    COMMETHOD([dispid(0), helpstring('Get drive'), 'propget'], HRESULT, 'Item',
              ( ['in'], VARIANT, 'Key' ),
              ( ['out', 'retval'], POINTER(POINTER(IDrive)), 'ppdrive' )),
    COMMETHOD([dispid(-4), 'restricted', 'hidden', 'propget'], HRESULT, '_NewEnum',
              ( ['out', 'retval'], POINTER(POINTER(IUnknown)), 'ppenum' )),
    COMMETHOD([dispid(1), helpstring('Number of drives'), 'propget'], HRESULT, 'Count',
              ( ['out', 'retval'], POINTER(c_int), 'plCount' )),
]
################################################################
## code template for IDriveCollection implementation
##class IDriveCollection_Impl(object):
##    @property
##    def Item(self, Key):
##        'Get drive'
##        #return ppdrive
##
##    @property
##    def _NewEnum(self):
##        '-no docstring-'
##        #return ppenum
##
##    @property
##    def Count(self):
##        'Number of drives'
##        #return plCount
##

class Drive(CoClass):
    'Drive Object'
    _reg_clsid_ = GUID('{C7C3F5B1-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
Drive._com_interfaces_ = [IDrive]

class Drives(CoClass):
    'Collection of drives associated with drive letters'
    _reg_clsid_ = GUID('{C7C3F5B2-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
Drives._com_interfaces_ = [IDriveCollection]

class Folder(CoClass):
    'Folder object'
    _reg_clsid_ = GUID('{C7C3F5B3-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
Folder._com_interfaces_ = [IFolder]

class IFileCollection(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'File Collection Interface'
    _iid_ = GUID('{C7C3F5A5-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
IFileCollection._methods_ = [
    COMMETHOD([dispid(0), helpstring('Get file'), 'propget'], HRESULT, 'Item',
              ( ['in'], VARIANT, 'Key' ),
              ( ['out', 'retval'], POINTER(POINTER(IFile)), 'ppfile' )),
    COMMETHOD([dispid(-4), 'restricted', 'hidden', 'propget'], HRESULT, '_NewEnum',
              ( ['out', 'retval'], POINTER(POINTER(IUnknown)), 'ppenum' )),
    COMMETHOD([dispid(1), helpstring('Number of folders'), 'propget'], HRESULT, 'Count',
              ( ['out', 'retval'], POINTER(c_int), 'plCount' )),
]
################################################################
## code template for IFileCollection implementation
##class IFileCollection_Impl(object):
##    @property
##    def Item(self, Key):
##        'Get file'
##        #return ppfile
##
##    @property
##    def _NewEnum(self):
##        '-no docstring-'
##        #return ppenum
##
##    @property
##    def Count(self):
##        'Number of folders'
##        #return plCount
##


# values for enumeration '__MIDL___MIDL_itf_scrrun_0001_0001_0001'
UnknownType = 0
Removable = 1
Fixed = 2
Remote = 3
CDRom = 4
RamDisk = 5
__MIDL___MIDL_itf_scrrun_0001_0001_0001 = c_int # enum
DriveTypeConst = __MIDL___MIDL_itf_scrrun_0001_0001_0001
IDrive._methods_ = [
    COMMETHOD([dispid(0), helpstring('Path'), 'propget'], HRESULT, 'Path',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrPath' )),
    COMMETHOD([dispid(10000), helpstring('Drive letter'), 'propget'], HRESULT, 'DriveLetter',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrLetter' )),
    COMMETHOD([dispid(10001), helpstring('Share name'), 'propget'], HRESULT, 'ShareName',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrShareName' )),
    COMMETHOD([dispid(10002), helpstring('Drive type'), 'propget'], HRESULT, 'DriveType',
              ( ['out', 'retval'], POINTER(DriveTypeConst), 'pdt' )),
    COMMETHOD([dispid(10003), helpstring('Root folder'), 'propget'], HRESULT, 'RootFolder',
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(10005), helpstring('Get available space'), 'propget'], HRESULT, 'AvailableSpace',
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarAvail' )),
    COMMETHOD([dispid(10004), helpstring('Get drive free space'), 'propget'], HRESULT, 'FreeSpace',
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarFree' )),
    COMMETHOD([dispid(10006), helpstring('Get total drive size'), 'propget'], HRESULT, 'TotalSize',
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarTotal' )),
    COMMETHOD([dispid(10007), helpstring('Name of volume'), 'propget'], HRESULT, 'VolumeName',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrName' )),
    COMMETHOD([dispid(10007), helpstring('Name of volume'), 'propput'], HRESULT, 'VolumeName',
              ( ['in'], BSTR, 'pbstrName' )),
    COMMETHOD([dispid(10008), helpstring('Filesystem type'), 'propget'], HRESULT, 'FileSystem',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrFileSystem' )),
    COMMETHOD([dispid(10009), helpstring('Serial number'), 'propget'], HRESULT, 'SerialNumber',
              ( ['out', 'retval'], POINTER(c_int), 'pulSerialNumber' )),
    COMMETHOD([dispid(10010), helpstring('Check if disk is available'), 'propget'], HRESULT, 'IsReady',
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfReady' )),
]
################################################################
## code template for IDrive implementation
##class IDrive_Impl(object):
##    @property
##    def Path(self):
##        'Path'
##        #return pbstrPath
##
##    @property
##    def DriveLetter(self):
##        'Drive letter'
##        #return pbstrLetter
##
##    @property
##    def ShareName(self):
##        'Share name'
##        #return pbstrShareName
##
##    @property
##    def DriveType(self):
##        'Drive type'
##        #return pdt
##
##    @property
##    def RootFolder(self):
##        'Root folder'
##        #return ppfolder
##
##    @property
##    def AvailableSpace(self):
##        'Get available space'
##        #return pvarAvail
##
##    @property
##    def FreeSpace(self):
##        'Get drive free space'
##        #return pvarFree
##
##    @property
##    def TotalSize(self):
##        'Get total drive size'
##        #return pvarTotal
##
##    def _get(self):
##        'Name of volume'
##        #return pbstrName
##    def _set(self, pbstrName):
##        'Name of volume'
##    VolumeName = property(_get, _set, doc = _set.__doc__)
##
##    @property
##    def FileSystem(self):
##        'Filesystem type'
##        #return pbstrFileSystem
##
##    @property
##    def SerialNumber(self):
##        'Serial number'
##        #return pulSerialNumber
##
##    @property
##    def IsReady(self):
##        'Check if disk is available'
##        #return pfReady
##

class Folders(CoClass):
    'Collection of subfolders in a folder'
    _reg_clsid_ = GUID('{C7C3F5B4-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
class IFolderCollection(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Folder Collection Interface'
    _iid_ = GUID('{C7C3F5A3-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['hidden', 'dual', 'nonextensible', 'oleautomation']
Folders._com_interfaces_ = [IFolderCollection]


# values for enumeration 'CompareMethod'
BinaryCompare = 0
TextCompare = 1
DatabaseCompare = 2
CompareMethod = c_int # enum
class Library(object):
    'Microsoft Scripting Runtime'
    name = 'Scripting'
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)


# values for enumeration '__MIDL___MIDL_itf_scrrun_0000_0000_0001'
Normal = 0
ReadOnly = 1
Hidden = 2
System = 4
Volume = 8
Directory = 16
Archive = 32
Alias = 1024
Compressed = 2048
__MIDL___MIDL_itf_scrrun_0000_0000_0001 = c_int # enum
FileAttribute = __MIDL___MIDL_itf_scrrun_0000_0000_0001
class File(CoClass):
    'File object'
    _reg_clsid_ = GUID('{C7C3F5B5-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
File._com_interfaces_ = [IFile]

class TextStream(CoClass):
    'TextStream object'
    _reg_clsid_ = GUID('{0BB02EC0-EF49-11CF-8940-00A0C9054228}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
TextStream._com_interfaces_ = [ITextStream]

class IDictionary(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Scripting.Dictionary Interface'
    _iid_ = GUID('{42C642C1-97E1-11CF-978F-00A02463E06F}')
    _idlflags_ = ['hidden', 'dual', 'oleautomation']
IDictionary._methods_ = [
    COMMETHOD([dispid(0), helpstring('Set or get the item for a given key'), 'propputref'], HRESULT, 'Item',
              ( ['in'], POINTER(VARIANT), 'Key' ),
              ( ['in'], POINTER(VARIANT), 'pRetItem' )),
    COMMETHOD([dispid(0), helpstring('Set or get the item for a given key'), 'propput'], HRESULT, 'Item',
              ( ['in'], POINTER(VARIANT), 'Key' ),
              ( ['in'], POINTER(VARIANT), 'pRetItem' )),
    COMMETHOD([dispid(0), helpstring('Set or get the item for a given key'), 'propget'], HRESULT, 'Item',
              ( ['in'], POINTER(VARIANT), 'Key' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'pRetItem' )),
    COMMETHOD([dispid(1), helpstring('Add a new key and item to the dictionary.')], HRESULT, 'Add',
              ( ['in'], POINTER(VARIANT), 'Key' ),
              ( ['in'], POINTER(VARIANT), 'Item' )),
    COMMETHOD([dispid(2), helpstring('Get the number of items in the dictionary.'), 'propget'], HRESULT, 'Count',
              ( ['out', 'retval'], POINTER(c_int), 'pCount' )),
    COMMETHOD([dispid(3), helpstring('Determine if a given key is in the dictionary.')], HRESULT, 'Exists',
              ( ['in'], POINTER(VARIANT), 'Key' ),
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pExists' )),
    COMMETHOD([dispid(4), helpstring('Get an array containing all items in the dictionary.')], HRESULT, 'Items',
              ( ['out', 'retval'], POINTER(VARIANT), 'pItemsArray' )),
    COMMETHOD([dispid(5), helpstring('Change a key to a different key.'), 'propput'], HRESULT, 'Key',
              ( ['in'], POINTER(VARIANT), 'Key' ),
              ( ['in'], POINTER(VARIANT), 'rhs' )),
    COMMETHOD([dispid(6), helpstring('Get an array containing all keys in the dictionary.')], HRESULT, 'Keys',
              ( ['out', 'retval'], POINTER(VARIANT), 'pKeysArray' )),
    COMMETHOD([dispid(7), helpstring('Remove a given key from the dictionary.')], HRESULT, 'Remove',
              ( ['in'], POINTER(VARIANT), 'Key' )),
    COMMETHOD([dispid(8), helpstring('Remove all information from the dictionary.')], HRESULT, 'RemoveAll'),
    COMMETHOD([dispid(9), helpstring('Set or get the string comparison method.'), 'propput'], HRESULT, 'CompareMode',
              ( ['in'], CompareMethod, 'pcomp' )),
    COMMETHOD([dispid(9), helpstring('Set or get the string comparison method.'), 'propget'], HRESULT, 'CompareMode',
              ( ['out', 'retval'], POINTER(CompareMethod), 'pcomp' )),
    COMMETHOD([dispid(-4), 'restricted'], HRESULT, '_NewEnum',
              ( ['out', 'retval'], POINTER(POINTER(IUnknown)), 'ppunk' )),
    COMMETHOD([dispid(10), 'hidden', 'propget'], HRESULT, 'HashVal',
              ( ['in'], POINTER(VARIANT), 'Key' ),
              ( ['out', 'retval'], POINTER(VARIANT), 'HashVal' )),
]
################################################################
## code template for IDictionary implementation
##class IDictionary_Impl(object):
##    def _get(self, Key, pRetItem):
##        'Set or get the item for a given key'
##        #return 
##    def _set(self, Key, pRetItem):
##        'Set or get the item for a given key'
##    Item = property(_get, _set, doc = _set.__doc__)
##
##    def Add(self, Key, Item):
##        'Add a new key and item to the dictionary.'
##        #return 
##
##    @property
##    def Count(self):
##        'Get the number of items in the dictionary.'
##        #return pCount
##
##    def Exists(self, Key):
##        'Determine if a given key is in the dictionary.'
##        #return pExists
##
##    def Items(self):
##        'Get an array containing all items in the dictionary.'
##        #return pItemsArray
##
##    def _set(self, Key, rhs):
##        'Change a key to a different key.'
##    Key = property(fset = _set, doc = _set.__doc__)
##
##    def Keys(self):
##        'Get an array containing all keys in the dictionary.'
##        #return pKeysArray
##
##    def Remove(self, Key):
##        'Remove a given key from the dictionary.'
##        #return 
##
##    def RemoveAll(self):
##        'Remove all information from the dictionary.'
##        #return 
##
##    def _get(self):
##        'Set or get the string comparison method.'
##        #return pcomp
##    def _set(self, pcomp):
##        'Set or get the string comparison method.'
##    CompareMode = property(_get, _set, doc = _set.__doc__)
##
##    def _NewEnum(self):
##        '-no docstring-'
##        #return ppunk
##
##    @property
##    def HashVal(self, Key):
##        '-no docstring-'
##        #return HashVal
##

class Files(CoClass):
    'Collection of files in a folder'
    _reg_clsid_ = GUID('{C7C3F5B6-88A3-11D0-ABCB-00A0C90FFFC0}')
    _idlflags_ = ['noncreatable']
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
Files._com_interfaces_ = [IFileCollection]

class IScriptEncoder(comtypes.gen._00020430_0000_0000_C000_000000000046_0_2_0.IDispatch):
    _case_insensitive_ = True
    'Script Encoder Interface'
    _iid_ = GUID('{AADC65F6-CFF1-11D1-B747-00C04FC2B085}')
    _idlflags_ = ['dual', 'oleautomation']
IScriptEncoder._methods_ = [
    COMMETHOD([dispid(0), helpstring('Call the Encoder determined by szExt, passing bstrStreamIn and optional arguments')], HRESULT, 'EncodeScriptFile',
              ( ['in'], BSTR, 'szExt' ),
              ( ['in'], BSTR, 'bstrStreamIn' ),
              ( ['in'], c_int, 'cFlags' ),
              ( ['in'], BSTR, 'bstrDefaultLang' ),
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrStreamOut' )),
]
################################################################
## code template for IScriptEncoder implementation
##class IScriptEncoder_Impl(object):
##    def EncodeScriptFile(self, szExt, bstrStreamIn, cFlags, bstrDefaultLang):
##        'Call the Encoder determined by szExt, passing bstrStreamIn and optional arguments'
##        #return pbstrStreamOut
##

IFile._methods_ = [
    COMMETHOD([dispid(0), helpstring('Path to the file'), 'propget'], HRESULT, 'Path',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrPath' )),
    COMMETHOD([dispid(1000), helpstring('Get name of file'), 'propget'], HRESULT, 'Name',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrName' )),
    COMMETHOD([dispid(1000), helpstring('Get name of file'), 'propput'], HRESULT, 'Name',
              ( ['in'], BSTR, 'pbstrName' )),
    COMMETHOD([dispid(1002), helpstring('Short path'), 'propget'], HRESULT, 'ShortPath',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrPath' )),
    COMMETHOD([dispid(1001), helpstring('Short name'), 'propget'], HRESULT, 'ShortName',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrName' )),
    COMMETHOD([dispid(1004), helpstring('Get drive that contains file'), 'propget'], HRESULT, 'Drive',
              ( ['out', 'retval'], POINTER(POINTER(IDrive)), 'ppdrive' )),
    COMMETHOD([dispid(1005), helpstring('Get folder that contains file'), 'propget'], HRESULT, 'ParentFolder',
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(1003), helpstring('File attributes'), 'propget'], HRESULT, 'Attributes',
              ( ['out', 'retval'], POINTER(FileAttribute), 'pfa' )),
    COMMETHOD([dispid(1003), helpstring('File attributes'), 'propput'], HRESULT, 'Attributes',
              ( ['in'], FileAttribute, 'pfa' )),
    COMMETHOD([dispid(1006), helpstring('Date file was created'), 'propget'], HRESULT, 'DateCreated',
              ( ['out', 'retval'], POINTER(c_double), 'pdate' )),
    COMMETHOD([dispid(1007), helpstring('Date file was last modified'), 'propget'], HRESULT, 'DateLastModified',
              ( ['out', 'retval'], POINTER(c_double), 'pdate' )),
    COMMETHOD([dispid(1008), helpstring('Date file was last accessed'), 'propget'], HRESULT, 'DateLastAccessed',
              ( ['out', 'retval'], POINTER(c_double), 'pdate' )),
    COMMETHOD([dispid(1009), helpstring('File size'), 'propget'], HRESULT, 'Size',
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarSize' )),
    COMMETHOD([dispid(1010), helpstring('Type description'), 'propget'], HRESULT, 'Type',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrType' )),
    COMMETHOD([dispid(1200), helpstring('Delete this file')], HRESULT, 'Delete',
              ( ['in', 'optional'], VARIANT_BOOL, 'Force', False )),
    COMMETHOD([dispid(1202), helpstring('Copy this file')], HRESULT, 'Copy',
              ( ['in'], BSTR, 'Destination' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'OverWriteFiles', True )),
    COMMETHOD([dispid(1204), helpstring('Move this file')], HRESULT, 'Move',
              ( ['in'], BSTR, 'Destination' )),
    COMMETHOD([dispid(1100), helpstring('Open a file as a TextStream')], HRESULT, 'OpenAsTextStream',
              ( ['in', 'optional'], IOMode, 'IOMode', 1 ),
              ( ['in', 'optional'], Tristate, 'Format', 0 ),
              ( ['out', 'retval'], POINTER(POINTER(ITextStream)), 'ppts' )),
]
################################################################
## code template for IFile implementation
##class IFile_Impl(object):
##    @property
##    def Path(self):
##        'Path to the file'
##        #return pbstrPath
##
##    def _get(self):
##        'Get name of file'
##        #return pbstrName
##    def _set(self, pbstrName):
##        'Get name of file'
##    Name = property(_get, _set, doc = _set.__doc__)
##
##    @property
##    def ShortPath(self):
##        'Short path'
##        #return pbstrPath
##
##    @property
##    def ShortName(self):
##        'Short name'
##        #return pbstrName
##
##    @property
##    def Drive(self):
##        'Get drive that contains file'
##        #return ppdrive
##
##    @property
##    def ParentFolder(self):
##        'Get folder that contains file'
##        #return ppfolder
##
##    def _get(self):
##        'File attributes'
##        #return pfa
##    def _set(self, pfa):
##        'File attributes'
##    Attributes = property(_get, _set, doc = _set.__doc__)
##
##    @property
##    def DateCreated(self):
##        'Date file was created'
##        #return pdate
##
##    @property
##    def DateLastModified(self):
##        'Date file was last modified'
##        #return pdate
##
##    @property
##    def DateLastAccessed(self):
##        'Date file was last accessed'
##        #return pdate
##
##    @property
##    def Size(self):
##        'File size'
##        #return pvarSize
##
##    @property
##    def Type(self):
##        'Type description'
##        #return pbstrType
##
##    def Delete(self, Force):
##        'Delete this file'
##        #return 
##
##    def Copy(self, Destination, OverWriteFiles):
##        'Copy this file'
##        #return 
##
##    def Move(self, Destination):
##        'Move this file'
##        #return 
##
##    def OpenAsTextStream(self, IOMode, Format):
##        'Open a file as a TextStream'
##        #return ppts
##

ITextStream._methods_ = [
    COMMETHOD([dispid(10000), helpstring('Current line number'), 'propget'], HRESULT, 'Line',
              ( ['out', 'retval'], POINTER(c_int), 'Line' )),
    COMMETHOD([dispid(-529), helpstring('Current column number'), 'propget'], HRESULT, 'Column',
              ( ['out', 'retval'], POINTER(c_int), 'Column' )),
    COMMETHOD([dispid(10002), helpstring('Is the current position at the end of the stream?'), 'propget'], HRESULT, 'AtEndOfStream',
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'EOS' )),
    COMMETHOD([dispid(10003), helpstring('Is the current position at the end of a line?'), 'propget'], HRESULT, 'AtEndOfLine',
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'EOL' )),
    COMMETHOD([dispid(10004), helpstring('Read a specific number of characters into a string')], HRESULT, 'Read',
              ( ['in'], c_int, 'Characters' ),
              ( ['out', 'retval'], POINTER(BSTR), 'Text' )),
    COMMETHOD([dispid(10005), helpstring('Read an entire line into a string')], HRESULT, 'ReadLine',
              ( ['out', 'retval'], POINTER(BSTR), 'Text' )),
    COMMETHOD([dispid(10006), helpstring('Read the entire stream into a string')], HRESULT, 'ReadAll',
              ( ['out', 'retval'], POINTER(BSTR), 'Text' )),
    COMMETHOD([dispid(10007), helpstring('Write a string to the stream')], HRESULT, 'Write',
              ( ['in'], BSTR, 'Text' )),
    COMMETHOD([dispid(10008), helpstring('Write a string and an end of line to the stream')], HRESULT, 'WriteLine',
              ( ['in', 'optional'], BSTR, 'Text', '' )),
    COMMETHOD([dispid(10009), helpstring('Write a number of blank lines to the stream')], HRESULT, 'WriteBlankLines',
              ( ['in'], c_int, 'Lines' )),
    COMMETHOD([dispid(10010), helpstring('Skip a specific number of characters')], HRESULT, 'Skip',
              ( ['in'], c_int, 'Characters' )),
    COMMETHOD([dispid(10011), helpstring('Skip a line')], HRESULT, 'SkipLine'),
    COMMETHOD([dispid(10012), helpstring('Close a text stream')], HRESULT, 'Close'),
]
################################################################
## code template for ITextStream implementation
##class ITextStream_Impl(object):
##    @property
##    def Line(self):
##        'Current line number'
##        #return Line
##
##    @property
##    def Column(self):
##        'Current column number'
##        #return Column
##
##    @property
##    def AtEndOfStream(self):
##        'Is the current position at the end of the stream?'
##        #return EOS
##
##    @property
##    def AtEndOfLine(self):
##        'Is the current position at the end of a line?'
##        #return EOL
##
##    def Read(self, Characters):
##        'Read a specific number of characters into a string'
##        #return Text
##
##    def ReadLine(self):
##        'Read an entire line into a string'
##        #return Text
##
##    def ReadAll(self):
##        'Read the entire stream into a string'
##        #return Text
##
##    def Write(self, Text):
##        'Write a string to the stream'
##        #return 
##
##    def WriteLine(self, Text):
##        'Write a string and an end of line to the stream'
##        #return 
##
##    def WriteBlankLines(self, Lines):
##        'Write a number of blank lines to the stream'
##        #return 
##
##    def Skip(self, Characters):
##        'Skip a specific number of characters'
##        #return 
##
##    def SkipLine(self):
##        'Skip a line'
##        #return 
##
##    def Close(self):
##        'Close a text stream'
##        #return 
##

class Dictionary(CoClass):
    'Scripting.Dictionary'
    _reg_clsid_ = GUID('{EE09B103-97E0-11CF-978F-00A02463E06F}')
    _idlflags_ = []
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
Dictionary._com_interfaces_ = [IDictionary]

IFolderCollection._methods_ = [
    COMMETHOD([dispid(2), helpstring('Create a new folder')], HRESULT, 'Add',
              ( ['in'], BSTR, 'Name' ),
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(0), helpstring('Get folder'), 'propget'], HRESULT, 'Item',
              ( ['in'], VARIANT, 'Key' ),
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(-4), 'restricted', 'hidden', 'propget'], HRESULT, '_NewEnum',
              ( ['out', 'retval'], POINTER(POINTER(IUnknown)), 'ppenum' )),
    COMMETHOD([dispid(1), helpstring('Number of folders'), 'propget'], HRESULT, 'Count',
              ( ['out', 'retval'], POINTER(c_int), 'plCount' )),
]
################################################################
## code template for IFolderCollection implementation
##class IFolderCollection_Impl(object):
##    def Add(self, Name):
##        'Create a new folder'
##        #return ppfolder
##
##    @property
##    def Item(self, Key):
##        'Get folder'
##        #return ppfolder
##
##    @property
##    def _NewEnum(self):
##        '-no docstring-'
##        #return ppenum
##
##    @property
##    def Count(self):
##        'Number of folders'
##        #return plCount
##

class Encoder(CoClass):
    'Script Encoder Object'
    _reg_clsid_ = GUID('{32DA2B15-CFED-11D1-B747-00C04FC2B085}')
    _idlflags_ = []
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
Encoder._com_interfaces_ = [IScriptEncoder]

IFolder._methods_ = [
    COMMETHOD([dispid(0), helpstring('Path to folder'), 'propget'], HRESULT, 'Path',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrPath' )),
    COMMETHOD([dispid(1000), helpstring('Get name of folder'), 'propget'], HRESULT, 'Name',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrName' )),
    COMMETHOD([dispid(1000), helpstring('Get name of folder'), 'propput'], HRESULT, 'Name',
              ( ['in'], BSTR, 'pbstrName' )),
    COMMETHOD([dispid(1002), helpstring('Short path'), 'propget'], HRESULT, 'ShortPath',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrPath' )),
    COMMETHOD([dispid(1001), helpstring('Short name'), 'propget'], HRESULT, 'ShortName',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrName' )),
    COMMETHOD([dispid(1004), helpstring('Get drive that contains folder'), 'propget'], HRESULT, 'Drive',
              ( ['out', 'retval'], POINTER(POINTER(IDrive)), 'ppdrive' )),
    COMMETHOD([dispid(1005), helpstring('Get parent folder'), 'propget'], HRESULT, 'ParentFolder',
              ( ['out', 'retval'], POINTER(POINTER(IFolder)), 'ppfolder' )),
    COMMETHOD([dispid(1003), helpstring('Folder attributes'), 'propget'], HRESULT, 'Attributes',
              ( ['out', 'retval'], POINTER(FileAttribute), 'pfa' )),
    COMMETHOD([dispid(1003), helpstring('Folder attributes'), 'propput'], HRESULT, 'Attributes',
              ( ['in'], FileAttribute, 'pfa' )),
    COMMETHOD([dispid(1006), helpstring('Date folder was created'), 'propget'], HRESULT, 'DateCreated',
              ( ['out', 'retval'], POINTER(c_double), 'pdate' )),
    COMMETHOD([dispid(1007), helpstring('Date folder was last modified'), 'propget'], HRESULT, 'DateLastModified',
              ( ['out', 'retval'], POINTER(c_double), 'pdate' )),
    COMMETHOD([dispid(1008), helpstring('Date folder was last accessed'), 'propget'], HRESULT, 'DateLastAccessed',
              ( ['out', 'retval'], POINTER(c_double), 'pdate' )),
    COMMETHOD([dispid(1010), helpstring('Type description'), 'propget'], HRESULT, 'Type',
              ( ['out', 'retval'], POINTER(BSTR), 'pbstrType' )),
    COMMETHOD([dispid(1201), helpstring('Delete this folder')], HRESULT, 'Delete',
              ( ['in', 'optional'], VARIANT_BOOL, 'Force', False )),
    COMMETHOD([dispid(1203), helpstring('Copy this folder')], HRESULT, 'Copy',
              ( ['in'], BSTR, 'Destination' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'OverWriteFiles', True )),
    COMMETHOD([dispid(1205), helpstring('Move this folder')], HRESULT, 'Move',
              ( ['in'], BSTR, 'Destination' )),
    COMMETHOD([dispid(10000), helpstring('True if folder is root'), 'propget'], HRESULT, 'IsRootFolder',
              ( ['out', 'retval'], POINTER(VARIANT_BOOL), 'pfRootFolder' )),
    COMMETHOD([dispid(1009), helpstring('Sum of files and subfolders'), 'propget'], HRESULT, 'Size',
              ( ['out', 'retval'], POINTER(VARIANT), 'pvarSize' )),
    COMMETHOD([dispid(10001), helpstring('Get folders collection'), 'propget'], HRESULT, 'SubFolders',
              ( ['out', 'retval'], POINTER(POINTER(IFolderCollection)), 'ppfolders' )),
    COMMETHOD([dispid(10002), helpstring('Get files collection'), 'propget'], HRESULT, 'Files',
              ( ['out', 'retval'], POINTER(POINTER(IFileCollection)), 'ppfiles' )),
    COMMETHOD([dispid(1101), helpstring('Create a file as a TextStream')], HRESULT, 'CreateTextFile',
              ( ['in'], BSTR, 'FileName' ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Overwrite', True ),
              ( ['in', 'optional'], VARIANT_BOOL, 'Unicode', False ),
              ( ['out', 'retval'], POINTER(POINTER(ITextStream)), 'ppts' )),
]
################################################################
## code template for IFolder implementation
##class IFolder_Impl(object):
##    @property
##    def Path(self):
##        'Path to folder'
##        #return pbstrPath
##
##    def _get(self):
##        'Get name of folder'
##        #return pbstrName
##    def _set(self, pbstrName):
##        'Get name of folder'
##    Name = property(_get, _set, doc = _set.__doc__)
##
##    @property
##    def ShortPath(self):
##        'Short path'
##        #return pbstrPath
##
##    @property
##    def ShortName(self):
##        'Short name'
##        #return pbstrName
##
##    @property
##    def Drive(self):
##        'Get drive that contains folder'
##        #return ppdrive
##
##    @property
##    def ParentFolder(self):
##        'Get parent folder'
##        #return ppfolder
##
##    def _get(self):
##        'Folder attributes'
##        #return pfa
##    def _set(self, pfa):
##        'Folder attributes'
##    Attributes = property(_get, _set, doc = _set.__doc__)
##
##    @property
##    def DateCreated(self):
##        'Date folder was created'
##        #return pdate
##
##    @property
##    def DateLastModified(self):
##        'Date folder was last modified'
##        #return pdate
##
##    @property
##    def DateLastAccessed(self):
##        'Date folder was last accessed'
##        #return pdate
##
##    @property
##    def Type(self):
##        'Type description'
##        #return pbstrType
##
##    def Delete(self, Force):
##        'Delete this folder'
##        #return 
##
##    def Copy(self, Destination, OverWriteFiles):
##        'Copy this folder'
##        #return 
##
##    def Move(self, Destination):
##        'Move this folder'
##        #return 
##
##    @property
##    def IsRootFolder(self):
##        'True if folder is root'
##        #return pfRootFolder
##
##    @property
##    def Size(self):
##        'Sum of files and subfolders'
##        #return pvarSize
##
##    @property
##    def SubFolders(self):
##        'Get folders collection'
##        #return ppfolders
##
##    @property
##    def Files(self):
##        'Get files collection'
##        #return ppfiles
##
##    def CreateTextFile(self, FileName, Overwrite, Unicode):
##        'Create a file as a TextStream'
##        #return ppts
##

class FileSystemObject(CoClass):
    'FileSystem Object'
    _reg_clsid_ = GUID('{0D43FE01-F093-11CF-8940-00A0C9054228}')
    _idlflags_ = []
    _typelib_path_ = typelib_path
    _reg_typelib_ = ('{420B2830-E718-11CF-893D-00A0C9054228}', 1, 0)
FileSystemObject._com_interfaces_ = [IFileSystem3]

__all__ = [ 'IFileCollection', 'DatabaseCompare', 'Archive', 'Alias',
           'SystemFolder', 'IScriptEncoder', 'Fixed', 'Removable',
           'TristateMixed', '__MIDL___MIDL_itf_scrrun_0001_0001_0001',
           'System', 'WindowsFolder', 'IDrive', 'Hidden',
           '__MIDL___MIDL_itf_scrrun_0001_0001_0003', 'StdOut',
           'TextCompare', 'Normal', 'IDictionary',
           '__MIDL___MIDL_itf_scrrun_0000_0000_0001', 'Dictionary',
           'IFolderCollection', 'DriveTypeConst', 'BinaryCompare',
           'Tristate', 'TemporaryFolder', 'RamDisk', 'Remote',
           'Directory', 'TristateFalse', 'FileAttribute',
           'ForReading', 'IOMode', 'IFile', 'IFileSystem', 'Folders',
           'UnknownType', 'CDRom', 'IFileSystem3', 'ForWriting',
           'Encoder', 'StandardStreamTypes', 'TristateTrue', 'StdErr',
           'ReadOnly', 'TextStream', 'TristateUseDefault', 'Volume',
           'SpecialFolderConst', 'CompareMethod', 'Compressed',
           'Drive', 'ITextStream', 'ForAppending', 'Drives', 'File',
           'FileSystemObject', 'Folder', 'IFolder',
           'IDriveCollection',
           '__MIDL___MIDL_itf_scrrun_0001_0001_0002', 'Files',
           'StdIn']
from comtypes import _check_version; _check_version('1.1.10', 1631813117.472511)
