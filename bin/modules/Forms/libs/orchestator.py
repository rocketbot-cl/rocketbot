# coding: utf-8
"""
Rocketbot Orchestrator
~~~~~~~~~~~~~~~~~~~~~

Class to controlle Rocketbot Orquestator

"""
__version__ = '0.1.0'
__author__ = 'Danilo Toro <danilo.toro@rocketbot.com'

import configparser
import requests


class OrchestatorCommon:

    def __init__(self, server=None, user=None, password=None, ini_path=None, apikey=None):
        self.server = server
        self.apikey = apikey
        self.user = user
        self.password = password
        self.headers = {
            'FORM': {'content-type': 'application/x-www-form-urlencoded'},
            'JSON': {'content-type': 'application/json'}
        }

        if ini_path:
            self.read_ini(ini_path)

    def request(self, method, endpoint, data, headers, files=None, proxies=None):
        url = self.server + endpoint
        response = requests.request(
            method, url, data=data, headers=headers, files=files, proxies=proxies)
        response = response.json()
        if "data" in response:
            return response['data']

        if response["success"]:
            return response["success"]

        raise Exception(response["message"])

    def get_authorization_token(self, server=None, user=None, password=None, ini_path=None, proxies=None):
        if server:
            self.server = server

        if ini_path:
            self.read_ini(ini_path)

        if self.apikey:
            return self.apikey

        if self.server is None:
            raise Exception("The orchestrator url is not in the configuration file or has not been entered")

        if user is not None:
            user = self.user
        if password is not None:
            self.password = password

        data = {'email': self.user, 'password': self.password}

        self.apikey = self.request("post", "/api/auth/login", data,
                                   headers=self.headers['FORM'], proxies=proxies)
        return self.apikey

    def read_ini(self, ini_path):
        config = configparser.ConfigParser()
        config.read(ini_path)
        self.user = config.get('USER', 'user')
        self.password = config.get('USER', 'password')

        self.instance = config.get('USER', 'key')
        self.server = config.get('NOC', 'server')
        try:
            self.apikey = config.get('USER', 'apiKey')
        except ValueError:
            pass




    
