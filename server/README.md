# Welcome to Simple Search Engine

## Setup the env

1. install Node
2. Install Postgres
3. Create a Nodejs project
   ..........and if u cant do this the first go to the basics

## Moderate Setup

1. install express,
2. cors,
3. pg

## Take some data to fill in database

1. connect to database

```
$ sudo -u postgres psql
$ enter your password in my case Linux@avinash
```

2. create a database

```
CREATE DATABASE searchUser;
```

3. Insert a file of data

```
\i <absolute_path_of_file>/filename.sql
```

4. all data wii be inserted successfully

## connect database to client side

1. Create A separate js folder for connection to database say db.js
2. in db.js we require npm package `pg`
3. pg has an object Pool which can be useful in pulling data from postgres

```js
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Linux@avinash",
  port: 5432,
  host: "localhost",
  database: "searchproject",
});
module.exports = pool;
```

- enter your postgres user password not desktop password
- postgres uses port: 5432 by default
- add database name as you created

4. get pool inside your main file and set the routes and use it

## Routes, Prams, QueryPrams

- Routes - generally in server-side we define different routes to get different types of results.Route are the path in url after domain.

- Prams - Parameter passed in the routes directly during development is called prams for example : http://localhost:5000/:id here id is a prams

- QueryPrams - These are special type of parameters which is used to define conditional behavior for example : http://localhost:5000/?name=avinash here name is a query parameter

## Setting up query to data base

1. Like Is case sensitive i n postgres
2. To disable the case sensitivity append I in front of LIKE - ILIKE
