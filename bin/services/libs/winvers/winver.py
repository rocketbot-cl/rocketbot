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
from .constants import NO_WIN

import sys

def get_version():
    """
    Get the Windows OS version running on the machine.
    
    Params:
        None

    Returns:
        The Windows OS version running on the machine (comparables with the values list in the class).
    """
    # Other OS check
    if not 'win' in sys.platform:
        return NO_WIN
    # Get infos
    win_ver = sys.getwindowsversion()
    try:
        # Python 3.6.x or upper -> Use 'platform_version' attribute
        major, minor, build = win_ver.platform_version
    except AttributeError:
        if sys.version_info < (3, 0):
            # Python 2.7.x -> Use 'platform' module to ensure the correct values (seems that Win 10 is not correctly detected)
            from platform import _get_real_winver
            major, minor, build = _get_real_winver(win_ver.major, win_ver.minor, win_ver.build)
            major, minor, build = int(major), int(minor), int(build) # 'long' to 'int'
        else:
            # Python 3.0.x - 3.5.x -> Keep 'sys.getwindowsversion()'' values
            major, minor, build = win_ver.major, win_ver.minor, win_ver.build
    # Check is is server or not (it works only on Python 2.7.x or newer)
    try:
        is_server = 1 if win_ver.product_type == 3 else 0
    except AttributeError:
        is_server = 0
    # Parse Service Pack version (or Build number)
    try:
        if major == 10:
            # The OS is Windows 10 or Windows Server 2016,
            # so the service pack version is instead the Build number
            sp_ver = build
        else:
            sp_ver = win_ver.service_pack_major or 0
    except AttributeError:
        try:
            sp_ver = int(win_ver.service_pack.rsplit(' ', 1))
        except (IndexError, ValueError):
            sp_ver = 0
    # Return the final version data
    return (major, minor, sp_ver, is_server)
