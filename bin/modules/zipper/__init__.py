# coding: utf-8
"""
Base para desarrollo de modulos externos.
Para obtener el modulo/Funcion que se esta llamando:
     GetParams("module")

Para obtener las variables enviadas desde formulario/comando Rocketbot:
    var = GetParams(variable)
    Las "variable" se define en forms del archivo package.json

Para modificar la variable de Rocketbot:
    SetVar(Variable_Rocketbot, "dato")

Para obtener una variable de Rocketbot:
    var = GetVar(Variable_Rocketbot)

Para obtener la Opcion seleccionada:
    opcion = GetParams("option")


Para instalar librerias se debe ingresar por terminal a la carpeta "libs"

    pip install <package> -t .

"""
import os
import sys
from os.path import basename

base_path = tmp_global_obj["basepath"]
cur_path = base_path + 'modules' + os.sep + 'zipper' + os.sep + 'libs' + os.sep
if cur_path not in sys.path:
    sys.path.append(cur_path)

import pyzipper

"""
    Obtengo el modulo que fueron invocados
"""
module = GetParams("module")

if module == "encryptZip":
    file_ = GetParams("file")
    zip_path = GetParams("zip")
    secret = GetParams("pass")
    method = GetParams("method")
    bits = GetParams("bits")

    compression = {
        "LZMA": pyzipper.ZIP_LZMA,
        "STORED":pyzipper.ZIP_STORED,
        "DEFLATED":pyzipper.ZIP_DEFLATED,
        "BZIP2":pyzipper.ZIP_BZIP2
    }



    try:
        if secret is None:
            secret = ""
        if secret:
            secret = secret.encode()
        if not bits:
            bits = 128
        else:
            bits = int(bits)

        if not method:
            method = "LZMA"

        if not zip_path:
            zip_path = file_.split(".")
            zip_path[-1] = "zip"
            zip_path = ".".join(zip_path)
        
        #https://stackoverflow.com/questions/60087965/how-to-zip-a-folder-in-python-with-password
        def zip_folderPyzipper(folder_path, output_path, compressionType, password, bits):
            global pyzipper, os
            """Zip the contents of an entire folder (with that folder included
            in the archive). Empty subfolders will be included in the archive
            as well.
            """
            parent_folder = os.path.dirname(folder_path)
            print(parent_folder)
            # Retrieve the paths of the folder contents.
            contents = os.walk(folder_path)
            try:
                zip_file = pyzipper.AESZipFile(output_path,'w',compression=compressionType,encryption=pyzipper.WZ_AES)
                zip_file.pwd=password
                for root, folders, files in contents:
                    # Include all subfolders, including empty ones.
                    for folder_name in folders:
                        absolute_path = os.path.join(root, folder_name)
                        relative_path = absolute_path.replace(parent_folder + os.sep,
                                                            '')
                        print ("Adding '%s' to archive." % absolute_path, relative_path)
                        zip_file.write(absolute_path, relative_path)
                    for file_name in files:
                        absolute_path = os.path.join(root, file_name)
                        relative_path = absolute_path.replace(parent_folder + os.sep,
                                                            '')
                        print ("Adding '%s' to archive." % absolute_path)
                        zip_file.write(absolute_path, relative_path)

                print ("'%s' created successfully." % output_path)
                zip_file.close()
            except Exception as e:
                print(e)
                PrintException()
            
                

        print("Compress:" , file_, " in", zip_path)
        if os.path.isdir(file_):
            zip_folderPyzipper( file_, zip_path,compression[method], secret, bits )
        else:
            with pyzipper.AESZipFile(zip_path, 'w', compression=compression[method]) as zf:
                zf.setpassword(secret)
                zf.setencryption(pyzipper.WZ_AES, nbits=bits)
                zf.write(file_, basename(file_))

    except Exception as e:
        PrintException()
        raise e

if module == "desencryptZip":
    file_ = GetParams("file")
    zip_path = GetParams("zip")
    secret = GetParams("pass")

    try:
        if secret:
            secret = secret.encode()
        if not file_:
            zip_path = zip_path.replace("/", os.sep)
            file_ = zip_path.split(os.sep)
            file_ = os.sep.join(file_[:-1])
        
        with pyzipper.AESZipFile(zip_path) as zf:
            zf.extractall(path=file_, pwd=secret)
    except Exception as e:
        PrintException()
        raise e