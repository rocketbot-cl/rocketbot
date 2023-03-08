# Rocketbot 
In this repository you will find information about the changes of each version of Rocketbot since 2020.30.12. You will also find the latest updates of the addons added.

## Rocket 20230305 (Windows)
[Versión producción - 2023-03-08](https://rocketbot-bin.s3.amazonaws.com/Rocketbot_20230305.zip)

### Added
- Upgrade python version from 3.6.8 to 3.10.4
- Data Transform commands (Array, String, Dictionary)
- Categories and drag and drop in variables
- Group command in logic section
- DesktopRecorder integration to save and edit command directly in Studio (beta)
- New commands to work with exceptions, credentials and logs
- Portuguese language
- Drawflow (beta): Now can create robots with a flow view
- Expose variables of robots: A new section called exposed has been added that allows convert a robot into a function and expose its variables to pass data as arguments
- More information in the logs and the type of exception is shown in the errors.
 - Support python in all inputs of commands
``` 

# Add a ! and [] to use python in commands: ![python sintax] 

variable = {"name": "Rocketbot", "version": "20221230"}
![ {variable}.get("name") ] # this is replaced by "Rocketbot"
```
- Autocomplete python code and adding rocketbot variables using syntaxys %
```
# typping % will see
%rocketbot_children_vars%
# dates:
 %date%
%day%
%month%
# system
%machine%
%osname%
...
```
- Install modules in production and update drivers automatically using 'update_drivers' argument
`rocketbot.exe -start=robot_name -db="/database/path" --update_drivers`
- Rocketbot installer. 
- Handle command error. Allow execution of a robot or stop all robots when the controlled command fails.
- New variable types (file and folder)

### Fix
- Fixed a bug that raised the debugger when the robot was running.
- When a command was cloned, it sometimes moved to different positions or the commands disappeared. The operation has been modified so that the cloned command is added below the selected command (command marked in blue), regardless of the position where it is located.
- Drag and drop: changed drag and drop method to prevent commands from disappearing or moving position.
 Note: A new method to add command has been added. If it select a command in the events section and then click on a command to add it, the added command will be added below the selected command and if it's a logic command, it will be added inside the block
- Improved rocketbot error messages such as no robot exists when executing a child or the name of a robot is incorrect
- Corrections of the malfunction of some commands such as break, try catch, excel, etc.
- Encoding of robots when exporting and the option to export modules has been added
- When an empty list was added in a for command it generated an index error. It was corrected so that it does not perform the iteration but does not generate errors either.

## Rocket 20220909 (Windows)
[Versión beta - 2022-09-09](https://rocketbot-bin.s3.amazonaws.com/Rocketbot2022.09.09beta.zip)

New:
* Expose variables in robot
* New commands
* New browser to control
* Drawflow
* Categories in variables
* Autocomplete python

Fix:
* Drag and drop
* Some commands
* Show more information in logs




## Orchestrator OnPremise
[Version 2022.09.04](https://rocketbot-bin.s3.amazonaws.com/setup-orchestrator-onpremise.exe)

New: 
* Rocketbot Orchestrator onpremise to work with the orchestrator locally 


## Rocketbot 20220405 (Windows)
[Version beta - 2022-04-05](https://rocketbot-bin.s3.amazonaws.com/Rocketbot20220405_beta.zip)

Fixs:
* Fixed problems with the __break__ command
* __Try catch__ recognizes errors within an if
* Fixed __cache__ problems
* Fixed problems when __adding__ commands and __cloning__, now you can add commands under the selected option
* Excel and xlsx: fixed cell counting commands
* Web: New selector options added, such as link text or css selector.


New:
* __DesktopRecorder__ as addons and integration with Studio
* Export robot with compressed modules
* Detects if the robot __needs__ a __module__ and asks to install it.
* New commands for handling data as array, dictionary and string
* New options when right-clicking on a command, e.g. add variable
* New language: __Portugues__
* Addons for uploading robots to the orchestrator

[See all changes](https://github.com/rocketbot-cl/rocketbot/blob/main/CHANGES_20220405_beta.txt)
## Rocketbot 2020.30.12

[Version A 4 - 16-07-2020](https://rocketbot-bin.s3.amazonaws.com/Rocketbot_20201230_a4_win.zip)

Fixs:
* Fixed problem of undeclared variables in commands that disappear.
* Drag and drop speed improved.
