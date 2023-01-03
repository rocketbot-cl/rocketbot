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

# Windows Client OSs
WIN_11_2000             = (10, 0, 22000, 0) # Windows 11
WIN_10_20H1             = (10, 0, 19041, 0) # Win 10 20H1 (May 2020 Update)
WIN_10_19H2             = (10, 0, 18363, 0) # Win 10 19H2 (October 2019 Update)
WIN_10_19H1             = (10, 0, 18362, 0) # Win 10 19H1 (May 2019 Update)
WIN_10_1809             = (10, 0, 17763, 0) # Win 10 Redstone 5 (October 2018 Update)
WIN_10_1803             = (10, 0, 17134, 0) # Win 10 Redstone 4 (April 2018 Update)
WIN_10_1709             = (10, 0, 16299, 0) # Win 10 Redstone 3 (Fall Creators Update)
WIN_10_1703             = (10, 0, 15063, 0) # Win 10 Redstone 2 (Creators Update)
WIN_10_1607             = (10, 0, 14393, 0) # Win 10 Redstone 1 (Anniversary Update)
WIN_10_1511             = (10, 0, 10586, 0) # Win 10 Threshold 2 (November Update)
WIN_10_1507             = (10, 0, 10240, 0) # Win 10 Threshold 1 (First Public Release)
WIN_10                  = (10, 0, 0, 0)     # Win 10 base version
WIN_8_1                 = (6, 3, 0, 0)
WIN_8                   = (6, 2, 0, 0)
WIN_7_SP1               = (6, 1, 1, 0)
WIN_7                   = (6, 1, 0, 0)
WIN_VISTA_SP1           = (6, 0, 1, 0)
WIN_VISTA               = (6, 0, 0, 0)
WIN_XP_X64_SP2          = (5, 2, 2, 0)
WIN_XP_X64_SP1          = (5, 2, 1, 0)
WIN_XP_X64              = (5, 2, 0, 0)
WIN_XP_SP3              = (5, 1, 3, 0)
WIN_XP_SP2              = (5, 1, 2, 0)
WIN_XP_SP1              = (5, 1, 1, 0)
WIN_XP                  = (5, 1, 0, 0)
WIN_2000                = (5, 0, 0, 0)

# Windows Server OSs
WIN_SERVER_2019_2004    = (10, 0, 19041, 1) # Win Server 2019 fourth RTM
WIN_SERVER_2019_1909    = (10, 0, 18363, 1) # Win Server 2019 third RTM
WIN_SERVER_2019_1903    = (10, 0, 18362, 1) # Win Server 2019 second RTM
WIN_SERVER_2019_1809    = (10, 0, 17763, 1) # Win Server 2019 first RTM
WIN_SERVER_2016_1803    = (10, 0, 17134, 1) # Win Server 2016 third RTM
WIN_SERVER_2016_1709    = (10, 0, 16299, 1) # Win Server 2016 second RTM
WIN_SERVER_2016_1607    = (10, 0, 14393, 1) # Win Server 2016 first RTM
WIN_SERVER_2016         = (10, 0, 0, 1)     # Win Server 2016 base version
WIN_SERVER_2012_R2      = (6, 3, 0, 1)
WIN_SERVER_2012         = (6, 2, 0, 1)
WIN_SERVER_2008_R2      = (6, 1, 0, 1)
WIN_SERVER_2008         = (6, 0, 0, 1)
WIN_SERVER_2003_SP2     = (5, 2, 2, 1)
WIN_SERVER_2003_SP1     = (5, 2, 1, 1)
WIN_SERVER_2003         = (5, 2, 0, 1)

# Other OS
NO_WIN                  = (0, 0, 0, 0)
