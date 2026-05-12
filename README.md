#Antimicrobial CDSS Web App Update Instructions

#Creating a new OMJSON or ODJSON file:
Order dialogs and order menus are exported using FileMan function in VistA. The MenuManager workbook is used to set export prefixes for menus, quick orders etc. when automating export from FileMan report.
Need access to VistA Menu Management for import.
FileMan and Order Dialog file (101.41) for export.
Initial Set Up:
1.	Download three files (“MenuManager” Excel Workbook and “VistA-MenuMan” Reflections Session/ini files) into the same folder on your desktop in a non-cloud synced location (e.g. download folder)
2.	Within this folder, create a new folder named “JSON”.
Export Order Dialogs and Order Menus from VistA:
1.	Open VistA-MenuMan and login with VA credentials.
2.	Press “OrderExport” button in the toolbar.
3.	In the pop-op, enter version name to be exported. A list of versions is in row 1 of “SystemConfig” worksheet of Menu Manager (e.g. Minneapolis, DesMoines, SiouxFalls, StCloud, Fargo, BlackHills)
4.	A FileMan report for exporting order dialogs into JSON format will automatically run and create a file named Version & “ODJSON.json” in the “JSON” folder created in initial setup.
5.	A pop-up will appear letting you know the export has finished.
6.	Press “MenuExport” button to export menus like above, creating a file named Version & “OMJSON.json” in the “JSON” folder.
7.	If there are any JSON files in the “JSON” folder that have errors, the program will not work. If an error occurs during export, attempt to re-run automation by closing all VistA and Excel windows and/or restart computer then run automation again. Ensure that you have placed the files in a non-cloud synced location. Automation will not run correctly from a cloud synced location and errors will occur.
8.	Once export is completed, upload the json files to the AntimicrobialCDSS.github.io main repository and update service-worker.js file version to complete the update to the App. Ensure you are replacing an existing OMJSON or ODJSON file.
You can check for JSON formatting issues if an error occurs. Place the JSON in question in this checker: https://jsonformatter.curiousconcept.com/#

#Creating a new .txml file for links:
Txml files in the main GitHub Antimicrobial CDSS repository are used to provide links. These can be updated manually or using the Template export function in CPRS. 

#Updating or placing a link in the Resources Folder: 
It’s best practice to keep the name of the updated file the same name as the previous version of the file. When creating a new linked document in the Resources folder, format the URL being placed in data object beginning with the below string, then place the file name (including filed type such as .pdf, .xlsx etc.).
https://antimicrobialcdss.github.io/Resources/
example: https://antimicrobialcdss.github.io/Resources/AntibiogramOmaha.pdf
After uploading the new file to the Resources folder, update the version number in the service-worker.js file and save it. This ensures the new file will be pushed out in and App update.

#Refreshing the App After each update or file change
After a file is updated or another change is made to the App, the service-worke.js file version must be updated to push out the updated content to users. To do this, open the service-worke.js file in the AntimicrobialCDSS.github.io repository. Choose to edit the file by clicking the pencil shaped icon, and increase the version number by .001 by editing line number 2, “const VERSION = ”. Select “Commit changes…” option to complete the update.

#Tracking Usage
Login into Google Analytics: https://analytics.google.com

