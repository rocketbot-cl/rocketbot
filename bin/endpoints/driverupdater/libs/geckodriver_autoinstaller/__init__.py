# coding: utf-8

import os
import logging
from . import utils


def install(path_geckodriver_dir, cwd=False):
    """
    Appends the directory of the geckodriver binary file to PATH.

    :param cwd: Flag indicating whether to download to current working directory
    :return: The file path of geckodriver
    """
    geckodriver_filepath = utils.download_geckodriver(path_geckodriver_dir, cwd)


def get_firefox_version():
    """
    Get installed version of chrome on client

    :return: The version of chrome
    """
    return utils.get_firefox_version()
