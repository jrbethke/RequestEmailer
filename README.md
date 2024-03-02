# RequestEmailer

Project will ask a user to submit a request on a web app form. Input from the for and an weekly updated spreadsheet are used to notify key targets of the request.

This was completed in Google Apps Scripts and uses GCP for Authentication to access Google Admin to pull user data.  

Several triggers are used to call different function to complete different tasks. Namely to update the sheet weekly in case of staff changes, notify select staff of the request with an email, and 
store request information to check if the request was done.

Updated project history via git-filter repo tool to practice obscuring history in the event of leak
via committing a password or ssh key. There will now be 8 commits but after using the tool but the changes for the file (namePuller) will no longer show
