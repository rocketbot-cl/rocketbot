# Zipper
  
Module to compress and decompress encrypted files.  

*Read this in other languages: [English](Manual_Zipper.md), [Spanish](Manual_Zipper.es.md).*
  
![banner](imgs/Banner_zipper.png)
## How to install this module
  
__Download__ and __install__ the content in 'modules' folder in Rocketbot path  



## Description of the commands

### Encrypt Zip
  
Create an encrypted zip
|Parameters|Description|example|
| --- | --- | --- |
|File |Select the file to encrypt|//Users/User/Path/to/file|
|Compression type |Select the compression type|DEFLATED|
|Bits |Select the number of bits|256 bits|
|Password |Enter the password|s3cre7p4ss|
|Ruta donde guardar el zip |Enter the path where to save the zip|//Users/User/path/to/newzip|

### Decrypt Zip
  
Get files of encrypted zip
|Parameters|Description|example|
| --- | --- | --- |
|File |Zip file to decrypt|//Users/User/Path/to/file|
|Password |Zip file password|s3cre7p4ss|
|Path where extract zip |Path where extract zip|//Users/User/path/to/folder|

