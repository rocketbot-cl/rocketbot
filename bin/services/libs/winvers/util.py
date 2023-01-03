#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Copyright (C) 2018  Daniele Giudice
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""

from __future__ import print_function, unicode_literals
from .constants import *
from .winver import get_version

import sys

_STR_WIN = {
    # Windows Client OSs
    WIN_11_2000             : "Windows 11",
    WIN_10_20H1             : "Windows 10 20H1 (May 2020 Update)",
    WIN_10_19H2             : "Windows 10 19H2 (October 2019 Update)",
    WIN_10_19H1             : "Windows 10 19H1 (May 2019 Update)",
    WIN_10_1809             : "Windows 10 Redstone 5 (October 2018 Update)",
    WIN_10_1803             : "Windows 10 Redstone 4 (April 2018 Update)",
    WIN_10_1709             : "Windows 10 Redstone 3 (Fall Creators Update)",
    WIN_10_1703             : "Windows 10 Redstone 2 (Creators Update)",
    WIN_10_1607             : "Windows 10 Redstone 1 (Anniversary Update)",
    WIN_10_1511             : "Windows 10 Threshold 2 (November Update)",
    WIN_10_1507             : "Windows 10 Threshold 1 (First Public Release)",
    WIN_10                  : "Windows 10",
    WIN_8_1                 : "Windows 8.1",
    WIN_8                   : "Windows 8",
    WIN_7_SP1               : "Windows 7 SP1",
    WIN_7                   : "Windows 7",
    WIN_VISTA_SP1           : "Windows Vista SP1",
    WIN_VISTA               : "Windows Vista",
    WIN_XP_X64_SP2          : "Windows XP x64 SP2",
    WIN_XP_X64_SP1          : "Windows XP x64 SP1",
    WIN_XP_X64              : "Windows XP x64",
    WIN_XP_SP3              : "Windows XP SP3",
    WIN_XP_SP2              : "Windows XP SP2",
    WIN_XP_SP1              : "Windows XP SP1",
    WIN_XP                  : "Windows XP",
    WIN_2000                : "Windows 2000",

    # Windows Server OSs
    WIN_SERVER_2019_2004    : "Windows Server 2019 Build 2004",
    WIN_SERVER_2019_1909    : "Windows Server 2019 Build 1909",
    WIN_SERVER_2019_1903    : "Windows Server 2019 Build 1903",
    WIN_SERVER_2019_1809    : "Windows Server 2019 Build 1809",
    WIN_SERVER_2016_1803    : "Windows Server 2016 Build 1803",
    WIN_SERVER_2016_1709    : "Windows Server 2016 Build 1709",
    WIN_SERVER_2016_1607    : "Windows Server 2016 Build 1607",
    WIN_SERVER_2016         : "Windows Server 2016",
    WIN_SERVER_2012_R2      : "Windows Server 2012 R2",
    WIN_SERVER_2012         : "Windows Server 2012",
    WIN_SERVER_2008_R2      : "Windows Server 2008 R2",
    WIN_SERVER_2008         : "Windows Server 2008",
    WIN_SERVER_2003_SP2     : "Windows Server 2003 SP2",
    WIN_SERVER_2003_SP1     : "Windows Server 2003 SP1",
    WIN_SERVER_2003         : "Windows Server 2003",

    # Other OS
    NO_WIN                  : "Non-Windows OS"
}

def get_version_str():
    """
    Convert get_version() return value in a short string.

    Params:
        None

    Returns:
        str: A string that descript the value returned by get_version()
    """
    try:
        return _STR_WIN[get_version()]
    except KeyError:
        return "Unknow OS"

def print_version():
    """
    Print get_version() return value in a readable format.

    Params:
        None

    Returns:
        None
    """
    v = get_version()

    try:
        s = _STR_WIN[v]
    except KeyError:
        s = "Unknow OS"

    print("-----------------------------------------------------------")
    print("###################### WinVer Report ######################")
    print("Python Version                           : {}.{}.{}".format(*sys.version_info[:3]))
    print("Windows Version String                   : {}".format(s))
    print("Windows Major Version                    : {}".format(v[0]))
    print("Windows Minor Version                    : {}".format(v[1]))
    print("Windows Service Pack (or Build) Version  : {}".format(v[2]))
    print("Is Windows Server                        : {}".format('Yes' if v[3]==1 else 'No'))
    print("Is Windows 10 (or Windows Server 2016)   : {}".format('Yes' if v >= WIN_10 else 'No'))
    print("-----------------------------------------------------------")
