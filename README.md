# eliquest README

### Prerequisites

* Node.js (tested w/ v 5.5.0)
* NPM - on Windows is installed with node, on Linux run 

     sudo apt-get install npm

* CouchDB - after installation go to http://localhost:5984 to test connection
* Из любой директории выполнить
     npm install -g add-cors-to-couchdb
     add-cors-to-couchdb
     npm install -g gulp

### Start

* Run 'npm start' из корневой директории проекта
     
### Questions

* www/tasks.json


### Behind the scenes

* Project uses two CouchDB databases - on client (by default it uses IndexDB on Chrome and FF) and server (in our case runs on localhost:5984). We save each new quiz to client DB and it tries 
to sync with localhost if connection exists. Otherwise, syncing continues when connection is restored.
* To access db externally, we need to replace localhost:5984 with necessary IP address