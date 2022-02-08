## TEST TASK FOR MAGEBIT

### FRONT-END
1. Open an instance of terminal and locate project's root directory, e.g. `cd magebit` ;\
1.1. `npm install` (install node packages);\
1.2. Locate './magebit/src/context/back_end_url.js' directory and change backend's url;\
1.3. `npm start`;

### BACK-END
2. Open a second instance of terminal and locate './magebit/back_end' directory. Enter `npm install`, `npm install nodemon`;\
2.1. In the same directory locate file '.env' and edit it;\
2.2. Write `npm start`;

### DATABASE
3. After successfull connection to the database. Send POST request via Postman or by using any other method on URL: "your_back_end_url"/subscriber/create_sync_table\
to create 2 tables for storing subscriptions and unique emails;

### TEST
4. In browser enter your front-end url, e.g ("http://localhost:3000/"). Enter various emails and subscribe;\ 
4.1. To test the table task enter ("http://localhost:3000/subscribed") and try different buttons;

## LIBRARIES/FRAMEWORKS
5. To see used front-end libraries/frameworks locate "package.json" in "./magebit" root directory;\
5.1. For back-end libraries/frameworks locate "package.json" in "./magebit/back_end" directory;
