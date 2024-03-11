# Rocketbot v20231110 Fix

## Updates 2024-03-05

### Fix
- rpaweb: restore previous update to avoid boot error

## Updates 2024-03-04

### Fix
- driverupdater: Change chromedriver URL to search dynamically due to google updates
- rpaweb: Fix selenium library



# Rocketbot v20240215 beta

## Updates 2024-02-15

### Added

- `rpaweb`: Add new functionallity to click command. Now you can scroll to the element before click it and wait for the element to be clickable.
- `rpaweb`: Add new functionallity to send keys command. Now you can send keys to a specific element withouth the need to click it before.
- `rpasystem`: New command to get command line arguments.
- `rpasystem`: New command to set multiple variables from a list of values.
- `rpavirtual`: Added the possibility to use the same screenshot for different resolutions.
- `web`: Add long description to all commands.
- `framework`: Add new export method to export projects that include framework, resouces and modules.
- `core`: Add the possibility to disable logs for a specific robot.
- `core`: Add new internal variables to get the robot name, project path and database path.
- `core`: Add the possibility to choose the log path for a specific robot.
- `rpascripts`: Now you can use separate modules for each robot.
- `variables`: Add new variable type to encrypt the value.
- `variables`: Add default value to variables.
- `variables`: Added buttons to delete and clear all variables in category.
- `updater`: Now the updater is included in the studio and don't need to download updates from external app.
- `a_activatelicense`: New services to update online license automatically.
- `a_args`: New argument to desactivate logs for the robot in execution. `--no-log`


### Fix
- `auth`: Fix bug in login view for orchestrator license on studio.
- `auth`: Remove error message when user is not logged in with orchestrator license.
- `driverupdater`: Increase timeout to 80 seconds.
- `rpavirtual`: Fix bug when opening Rocketbot from a shortcut.
- `rpavirtual` - mac: Fix double click bug.
- `core`: Fix license bug when the computer is restarted.
- `updater`: Create a backup folder before updating.


## How to install

1. Download [Rocketbot Studio](https://rocketbot-bin.s3.amazonaws.com/Rocketbot_2024.02.15_beta_preview.zip)
2. Unzip Rocketbot_2024.02.15_beta_preview.zip
3. Go to the folder an run Rocketbot.exe
