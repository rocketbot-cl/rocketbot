# coding: utf-8

import os
import logging
from . import utils


def install(chromedriver_dir, cwd=False):
    """
    Appends the directory of the chromedriver binary file to PATH.

    :param cwd: Flag indicating whether to download to current working directory
    :return: The file path of chromedriver
    """
    chromedriver_filepath = utils.download_chromedriver(chromedriver_dir, cwd)
    if not chromedriver_filepath:
        logging.debug('Can not download chromedriver.')
        return
    chromedriver_dir = os.path.dirname(chromedriver_filepath)
    if 'PATH' not in os.environ:
        os.environ['PATH'] = chromedriver_dir
    elif chromedriver_dir not in os.environ['PATH']:
        os.environ['PATH'] = chromedriver_dir + utils.get_variable_separator() + os.environ['PATH']
    return chromedriver_filepath


def get_chrome_version():
    """
    Get installed version of chrome on client

    :return: The version of chrome
    """
    return utils.get_chrome_version()

def is_updated_version(chromedriver_dir):
    return utils.is_updated(chromedriver_dir)
