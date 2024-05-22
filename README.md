# Rocketbot Studio Updates Documentation

Welcome to the release notes for Rocketbot Studio 2024.05.28. Below you'll find a comprehensive set of updates that have been implemented recently. These modifications are geared to enhance functionality, address issues, and upgrade existing features within our software.

## Changes & Fixes

### Added Features:

- **Treeview Enhancements**: The treeview now shows all commands in subrobots, improving navigation and interaction with project elements.
- **Resolution Support**: The virtualization command now adjusts to the screen resolution, ensuring compatibility with the original screen size.
- **Command Line Arguments**: New command lines to manage Rocketbot projects in every execution, allowing for more flexibility and automation.
- **New Command Actions**: Adicional sections and command to automate processes and enhance security in projects.
  - Added a framework to work with transactions.
  - Commands to use Credentials Manager.
  - Commands to work with processes.
  - Code with PowerShell and VBA.
  - Move and drag in Virtualization commands.
- **Variables**: More options to manage variables in the project.
  - Json Viewer to read json variables.
  - Default values to reset variables quickly.
  - Encrypt type to secure sensitive data.
  - Delete or clean groups of variables.
- **Code scanning**: Added a new feature to scan the code and find errors or warnings in the project.
- **Logs**: New options to manage logs in the project.
  - Omits logs: Disable logs in the project.
  - Log destination: Save logs in a default, project, or custom folder.
  - Clean logs in the project.
- **Robots as a Service**: Run robots developed in other databases directly in your project.
- **Export options**: Include project files and folders in the export process

### Modifications:

- **License Activation and Management**: Enhanced automatic renewal of online licenses and improved online license validation methods.
- **Driver Updates**: Periodic updates and fixes to driver management scripts to ensure compatibility with the latest devices and operating systems.
- **Web Commands**: Capabilities to handle wait times and timeouts directly in the web commands, improving performance and reducing the need for additional commands.
- **Module versions**: Use specific versions of modules in the project to avoid compatibility issues.

### Fixes:

- **Error Handling & Debugging**:
  - Various bug fixes related to module updates and error handling to prevent crashes and improve stability.
- **DesktopRecorder**: Fixed an issue where the DesktopRecorder command was not connecting to the correct application, causing errors in the recording process.
- **Robots Search**: Fixed a bug that searched for robots in case-sensitive mode, now searching for robots regardless of case.
- **Orchestrator license**: Fixed an issue where the orchestrator license was not being validated correctly, causing errors in the license management process.
- **Environment Compatibility**:
  - Modifications in `rpaweb.py` to enhance compatibility with Firefox on Linux OS.
- **Logging and Outputs**: Standardization of logging and considerable removal of unnecessary debug logs to clean up output.

### Removed:
- **Obsolete Modules and Functions**:
  - Removal of outdated or less used modules and debug logs to streamline the operation and reduce maintenance overhead.

## Known Issues

- **Dependency Conflicts**: Occasionally, updates to external libraries might cause temporary compatibility issues with existing projects until adjustments are made in the project configuration.

---

We advise all users to update to the latest version to take advantage of these improvements. Stay tuned for further enhancements as we strive to make Rocketbot Studio even more robust and user-friendly. Thank you for choosing Rocketbot for your automation needs.
