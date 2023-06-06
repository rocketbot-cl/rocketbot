# Rocketbot v20230320

## Updates 2023-06-01

### Added
- Array type in vars: show a python list as a table
- The unsaved changes alert has been extended to all types of robot modifications with the exception of version and robot type.
- Variables can be added from Assign resulto to varible inputs.
- Extended error handling options to all commands, except Group, Break, Trycatch, and Raise Error.
- Commands to work with jsons
- New Http command: Download File
- New web commands: Move to element, get attribute and get current url

### Fix
- For loop: fix break command and iteration bugs
- Change style in name robot input: When attempting to edit the robot name from the sidebar, user will be redirected to the robot info panel
- Create automatic titles in exposed variable
- When clicking outside a command modal, changes won`t be made or the command won`t be created.
- Fixed a bug that occurred when editing a command and then cloning another one.
- Fixed a bug that caused the site to crash when duplicate modules were in the modules folder and commands were being filtered.
- Errror in Set sheet command
- Acept data with quotes in expose command
- Acept variables in wait for object command

## How to install

1. Download [RocketbotStudio.exe](https://rocketbot-bin.s3.amazonaws.com/Rocketbot_studio_installer.exe) 
2. Run RocketbotStudio.exe
3. Next and accept the license
4. When finished, it will be downloaded to disk C:\Rocketbot
5. Run Rocketbot.exe
