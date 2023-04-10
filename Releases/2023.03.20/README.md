# Rocketbot v20230320

### Added
- The inputs to the commands of each module show a description of the data to be entered.
- New internal variables like %base_path%, %log_path% and %username%
- The search input scrolls to the command and highlights it in red.
- Footer to show information such as git changes, total commands, and db location
- Styles
- Command line options in documentation
- Add new command line options


### Fix
- Fix shadow when dragging and dropping commands
- Try catching at deep levels
- Updater uncompress files correctly
- Show sub robots to export
- Command description renderization will be truncated when exceeding 115 characters. Also, now it can be edited by double clicking on it.
- Commands with the stop robot on error attribute who fail will be rendered as failed commands
- Fixed layout for variable autosuggest in command creation/edition modules.
- Search command function optimized to be more time efficient, specially in larger robots.
- Actions in context menu

## How to install

1. Download RocketbotStudio.exe
2. Run RocketbotStudio.exe
3. Next and accept the license
4. When finished, it will be downloaded to disk C:\Rocketbot
5. Run Rocketbot.exe