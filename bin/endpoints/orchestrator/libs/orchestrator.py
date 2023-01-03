# coding: utf-8
"""
Rocketbot Orchestrator
~~~~~~~~~~~~~~~~~~~~~

Class to controlle Rocketbot Orchestrator

"""
__version__='0.1'
__author__= 'Danilo Toro <danilo.toro@rocketbot.com'

import configparser
import requests


class OrquestatorCommon:

    def __init__(self, server=None, user=None, password=None, ini_path=None, apikey=None):
        self.server = server
        self.apikey = apikey
        self.user = user
        self.password = password
        self.headers = {
            'FORM': {'content-type': 'application/x-www-form-urlencoded'},
            'JSON':{'content-type': 'application/json'}
        }
        if ini_path:
            self.read_ini(ini_path)

    def request(self, method, endpoint, data, headers, files=None):
        url = self.server + endpoint
        response = requests.request(
            method, url, data=data, headers=headers, files=files)
        response = response.json()
        if "data" in response:
            return response['data']

        if response["success"]:
            return response["success"]

        raise Exception(response["message"])

    def get_authorization_token(self, server=None, user=None, password=None, ini_path=None):
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

        self.apikey = self.request("post", "/api/auth/login", data,headers=self.headers['FORM'])
        
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


class Orchestrator(OrquestatorCommon):

    def __init__(self, server=None, user=None, password=None, ini_path=None, apikey=None):
        super().__init__(server, user, password, ini_path, apikey)
        if not apikey:
            self.get_authorization_token()
        self.headers['FORM']['Authorization'] = 'Bearer ' + self.apikey
        self.headers['JSON']['Authorization'] = 'Bearer ' + self.apikey
        

    def get_asset(self, asset_name, instance=None, process=None):
        if instance is None:
            instance = self.instance

        data = {'name': asset_name, 'instance': instance}
        if process is not None:
            data['process'] = process

        response = self.request("post", "/api/assets/get", data, self.headers['FORM'])
        return response["value"]

    def upload_bot(self, process, name, bot_name, db, project,  robot_id=None):
        data = {'name': name, 'startbot': bot_name,
                'process_id': process, 'project_id': project, 'robot': robot_id}
        file_handle = open(db, 'rb')
        response = self.request(
            "post", "/api/process/robot/update/data", data, {"Authorization": "Bearer " + self.apikey}, {"file": file_handle})
        file_handle.close()
        return response

    def get_process_executions(self, filter:list=[]):
        
        response = self.request("post", "/api/process/list", None, self.headers['JSON'])
        if filter:
            response = filter(filter, response)
        return response
    
    def get_projects(self, filter:list=[]):
        
        response = self.request("post", "/api/project/list", None, self.headers['JSON'])
        if filter:
            response = filter(filter, response) 
        return response

    def run(self, process):
        
        return self.request("post", "/api/process/robots/start", {"process_id": process}, self.headers['FORM'])

    
