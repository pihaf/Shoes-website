# Shoes-website: Steps to setup website and run locally 
 This website is only capable of running locally for now. To run the website locally, you have to snow how to import and setup the mySQL database. Here are two options of importing the database and setting up the website:
 
 Option 1:
- Go to config folder and import the Dump file(which is the database) to mySQL
- Go to models folder -> DB.js -> comment this line: "const dbConfig = require('../config/db.config');" and comment the whole db.config.js file in config folder(if still not work)
- Go to DB.js and change this part:

    //initialize 
    
    const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
    
    host: dbConfig.HOST,
    
    dialect: 'mysql',
    
    port: dbConfig.PORT
    
    });
    
into:

    //initialize 
    
    const sequelize = new Sequelize('database_name', 'username', 'password', {
    
    host: 'localhost',
    
    dialect: 'mysql',
    
    port: 3306
    
    });
    
and change the field in the code

Option 2(simpler):
- Go to config folder and import the Dump file(which is the database) to mySQL
- Change the .env file:

DB_NAME=shoeware

DB_USERNAME=root

DB_PASSWORD= //enter your password

DB_HOST=localhost

DB_PORT=3306
