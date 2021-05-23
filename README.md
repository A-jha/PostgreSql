# installation In Linux

### Create the file repository configuration:

```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

### Import the repository signing key:

```bash
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

### Update the package lists:

```bash
sudo apt-get update
```

### Install the latest version of PostgreSQL.

### If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql':

```bash
sudo apt-get -y install postgresql
```

# Configure Postgresql

```bash
sudo -u postgres psql
```

## We need to reset the root password for the user

```sql
ALTER USER postgres PASSWORD 'Linux@root';
```

### After resetting the password come out

```sql
\q
```

# Now to enter psql as super user postgres

```bash
$ psql -U postgres -h localhost
$ password for the user:'yourpasword'
```

## After Entering Password we will enter in postgres shell

## `\l` for list of database

```sql
postgres=# \l
```

List of databases
Name | Owner | Encoding | Collate | Ctype | Access privileges
-----------|----------|----------|---------|-------|-----------------------
postgres | postgres | UTF8 | en_IN | en_IN |
template0 | postgres | UTF8 | en_IN | en_IN | =c/postgres+postgres=CTc/postgres
template1 | postgres | UTF8 | en_IN | en_IN | =c/postgres +postgres=CTc/postgres

(3 rows)

## `\du` - List of users and their roles

```sql
postgres=# \du
```

| Role name | Attributes                                                 | Member of |
| --------- | ---------------------------------------------------------- | --------- |
| postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}        |

## Create another user name Avinash

```sql
--CREATE ROLE
CREATE USER avinash WITH CREATEDB LOGIN  ENCRIPTED PASSWORD 'Linux@avinash';
--Show Users
\du
```

## Create a dabase by name of user

- it will contain all the info about the user

```sql
CREATE DATABASE avinash;
```

| Role name | Attributes                                                 | Member of |
| --------- | ---------------------------------------------------------- | --------- |
| avinash   | Create DB                                                  | {}        |
| postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}        |

```sql
--to exit
postgres=# \lq
```

## Create A database

```sql
CREATE DATABASE db1;
```

- db1 is created

## Grant Access to db1 for user avinash

- only super user has access to all the databses
- normal user have to be granted for the databse

```sql
GRANT ALL PRIVILEGES ON DATABASE db1 TO avinash;
```

- avinash has now full access to db1

# Enter To psql as normal user `avinash`

```bash
psql -U avinash -h localhost
$enter your  pasword : 'Linux@avinash'
```

- Access the table of databse

```sql
\l
```

## Create a databse

```sql
#avinash=>
CREATE DATABASE avi1;
```

| Name      | Owner       | Encoding | Collate | Ctype | Access privileges                  |
| --------- | ----------- | -------- | ------- | ----- | ---------------------------------- |
| avi1      | **avinash** | UTF8     | en_IN   | en_IN |
| avinash   | postgres    | UTF8     | en_IN   | en_IN |
| db1       | postgres    | UTF8     | en_IN   | en_IN |
| postgres  | postgres    | UTF8     | en_IN   | en_IN |
| template0 | postgres    | UTF8     | en_IN   | en_IN | =c/postgres+postgres=CTc/postgres  |
| template1 | postgres    | UTF8     | en_IN   | en_IN | =c/postgres +postgres=CTc/postgres |

- look at the owner of the created databse
  - avinash is the owner

## Drop avi1 from databse

```sql
#avinash=>
DROP DATABASE avi1;
```

- avi1 is the database of avinash hence we can delete it .

## Drop db1

```sql
avinash=> DROP DATABASE db1;
```

`Eroor:` must be owner of database db1

- A lesser privilleged user is not allowe to do any thing in the databse.
- It is good thing for the security of databse.

# Installation of Pgadmin4

- Add all the project repository to ubuntu installation because ubuntu admin does not come with pgadmin by default.

```bash

```

# Status Of Database

- to check the status

  ```bash
  sudo service postgresql status
  ```

- To Stop
  ```bash
  sudo service postgresql stop
  ```
- to start
  ```bash
  sudo service postgresql start
  ```
- To restart
  ```bash
  sudo service postgresql restart
  ```

# Connect to the Database

## 1. Connect Directly from the terminal to db1

```bash
$ psql -U postgres -h localhost -p 5432 db1
```

## 2. Enter to psql then select db1

- Enter to psql

```bash
$ psql -U postgres -h localhost
```

- Use db1 as database

```sql
postgres=> \c db1
```

# Create Table with psql

```bash
CREATE TABLE table_name(
  Column name + data type + contains if any
)
```

Example

```SQL
CREATE TABLE person(
  id int,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  gender VARCHAR(6),
  date_of_birth TIMESTAP,
)
```

## Describe the table

```bash
db1=> \d
```

- List of relations<br>
  Schema | Name | Type | Owner  
  --------|---------|--------|--------
  public | person | table | postgres
  (1 row)

```sql
db1=> \d person
```

- Table "public.person"<br>

| Column        | Type                  | Collation | Nullable | Default |
| ------------- | --------------------- | --------- | -------- | ------- |
| id            | integer               |           |          |
| first_name    | character varying(20) |           |          |
| last_name     | character varying(20) |           |          |
| gender        | character varying(6)  |           |          |
| date_of_birth | date                  |           |          |

## Drop Table

- to delete the table

```sql
DROP TABLE person;
```

## Create table with constrains

```sql
CREATE TABLE person(
  id int NOT NULL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  gender VARCHAR(6) NOT NULL,
  date_of_birth TIMESTAP NOT NULL,
  email  VARCHAR(100),
)
```

## insert Data into table

```sql
/*db1=>*/
INSERT INTO person(
first_name,
last_name,
gender,
date_of_birth)
VALUES('Avinash','Jha','Male',DATE '2000-05-21'
);
```

# Read SQL Files From the directory

- it will execute each line inside `person.sql` in shell.

```sql
\i /home/avinashjha/Desktop/Projects/DBMS/PostgreSql/person.sql
```

# Query The Info

## Query the data from person table

- Select All Rows
  ```sql
  SELECT * FROM person;
  ```
- Select Last name of all person

```sql
SELECT (first_name,last_name) as Full_Name FROM person where id<5;
```

| full_name        |
| ---------------- |
| (Shaylah,Sabey)  |
| (Mikkel,Rutland) |
| (Merwin,Pinks)   |
| (Nanci,Gascard)  |

(4 rows)

## Order By

- 1 2 3 4 5 ASC
- 5 4 3 2 1 DESC

- Sort a data based on date of birth

```sql
SELECT * FROM person WHERE id<5 ORDER BY date_of_birth asc;
```

| id  | first_name | last_name | email                  | gender      | date_of_birth |
| --- | ---------- | --------- | ---------------------- | ----------- | ------------- |
| 2   | Mikkel     | Rutland   |                        | Male        | 2000-10-11    |
| 1   | Shaylah    | Sabey     | ssabey0@1688.com       | Genderqueer | 2003-02-27    |
| 4   | Nanci      | Gascard   | ngascard3@blogspot.com | Agender     | 2007-07-30    |
| 3   | Merwin     | Pinks     | mpinks2@example.com    | Male        | 2014-06-25    |

(4 rows)

- sort a table based don name

```sql
SELECT * FROM person WHERE id>5 AND id<10 ORDER BY first_name asc;
```

| id  | first_name | last_name  | email                  | gender      | date_of_birth |
| --- | ---------- | ---------- | ---------------------- | ----------- | ------------- |
| 6   | Bianka     | Mealiffe   | bmealiffe5@nhs.uk      | Genderfluid | 2002-08-17    |
| 9   | Flossy     | Gallelli   | fgallelli8@live.com    | Male        | 2003-01-11    |
| 8   | Kattie     | Heatly     | kheatly7@mit.edu       | Genderfluid | 2013-08-15    |
| 7   | Lacee      | Clausewitz | lclausewitz6@issuu.com | Male        | 2017-06-25    |

(4 rows)

## Distinct

```sql
SELECT gender From person where id<5 ORDER BY gender;
```

| gender  |
| ------- |
| Agender |
| Agender |
| Agender |
| Female  |

- Here Value are repeating and not for goode purpose hence we should use distinct

```sql
SELECT DISTINCT gender as list_of_gender From person where id<20 ORDER BY gender;
```

| list_of_gender |
| -------------- |
| Agender        |
| Female         |
| Genderfluid    |
| Genderqueer    |
| Male           |
| Non-binary     |
| Polygender     |

(7 rows)

## Where | And | Or

```sql
SELECT * FROM person WHERE id<20 AND (gender = 'Female' or gender='Male');
```

| id  | first_name | last_name  | email                           | gender | date_of_birth |
| --- | ---------- | ---------- | ------------------------------- | ------ | ------------- |
| 2   | Mikkel     | Rutland    |                                 | Male   | 2000-10-11    |
| 3   | Merwin     | Pinks      | mpinks2@example.com             | Male   | 2014-06-25    |
| 7   | Lacee      | Clausewitz | lclausewitz6@issuu.com          | Male   | 2017-06-25    |
| 9   | Flossy     | Gallelli   | fgallelli8@live.com             | Male   | 2003-01-11    |
| 10  | Miranda    | Lehenmann  | mlehenmann9@nasa.gov            | Male   | 2000-08-05    |
| 12  | Tandi      | Borland    | tborlandb@businessinsider.com   | Male   | 2018-12-12    |
| 16  | Raff       | Gini       | rginif@so-net.ne.jp             | Male   | 2020-07-24    |
| 18  | Austin     | Dennington | adenningtonh@simplemachines.org | Female | 2017-07-20    |

(8 rows)

## Comparision operators

- `<>` - NOT EQUAL TO
- `<=` - less than equal to
- `>=` - greater than equal to
- Comparision can be done on any data types.

# Limit, Offset and Fetch

## LIMIT - select in limit

```sql
 SELECT * FROM person LIMIT 5;
```

| id  | first_name  | last_name | email                   | gender      | date_of_birth |
| --- | ----------- | --------- | ----------------------- | ----------- | ------------- |
| 1   | Shaylah     | Sabey     | ssabey0@1688.com        | Genderqueer | 2003-02-27    |
| 2   | Mikkel      | Rutland   |                         | Male        | 2000-10-11    |
| 3   | Merwin      | Pinks     | mpinks2@example.com     | Male        | 2014-06-25    |
| 4   | Nanci       | Gascard   | ngascard3@blogspot.com  | Agender     | 2007-07-30    |
| 5   | Jacquenetta | Klesl     | jklesl4@marketwatch.com | Non-binary  | 2016-05-12    |

(5 rows)

## OFFSET - After that select

```sql
SELECT * FROM person OFFSET 5 LIMIT 5;
```

| id  | first_name | last_name  | email                  | gender      | date_of_birth |
| --- | ---------- | ---------- | ---------------------- | ----------- | ------------- |
| 6   | Bianka     | Mealiffe   | bmealiffe5@nhs.uk      | Genderfluid | 2002-08-17    |
| 7   | Lacee      | Clausewitz | lclausewitz6@issuu.com | Male        | 2017-06-25    |
| 8   | Kattie     | Heatly     | kheatly7@mit.edu       | Genderfluid | 2013-08-15    |
| 9   | Flossy     | Gallelli   | fgallelli8@live.com    | Male        | 2003-01-11    |
| 10  | Miranda    | Lehenmann  | mlehenmann9@nasa.gov   | Male        | 2000-08-05    |

(5 rows)

- Limit is not a official key word

## Fetch

```sql
SELECT * FROM person OFFSET 5 FETCH FIRST 5  ROW ONLY;
```

| id  | first_name | last_name  | email                  | gender      | date_of_birth |
| --- | ---------- | ---------- | ---------------------- | ----------- | ------------- |
| 6   | Bianka     | Mealiffe   | bmealiffe5@nhs.uk      | Genderfluid | 2002-08-17    |
| 7   | Lacee      | Clausewitz | lclausewitz6@issuu.com | Male        | 2017-06-25    |
| 8   | Kattie     | Heatly     | kheatly7@mit.edu       | Genderfluid | 2013-08-15    |
| 9   | Flossy     | Gallelli   | fgallelli8@live.com    | Male        | 2003-01-11    |
| 10  | Miranda    | Lehenmann  | mlehenmann9@nasa.gov   | Male        | 2000-08-05    |

(5 rows)

## IN

```sql
SELECT * FROM person WHERE gender = 'Male' OR gender = 'Female';
```

```sql
SELECT * FROM person WHERE gender IN ('Male','Female');
```

## Between

- Select Data from a range

```sql
SELECT * FROM person WHERE date_of_birth BETWEEN DATE '2012-01-01'AND '2012-04-01' ORDER BY date_of_birth asc;
```

| id  | first_name  | last_name  | email                     | gender      | date_of_birth |
| --- | ----------- | ---------- | ------------------------- | ----------- | ------------- |
| 657 | Nanice      | Shucksmith | nshucksmithi8@qq.com      | Male        | 2012-01-09    |
| 638 | Cody        | Cuttell    | ccuttellhp@typepad.com    | Female      | 2012-01-09    |
| 520 | Randa       | Pietruszka | rpietruszkaef@exblog.jp   | Bigender    | 2012-01-10    |
| 423 | Ginger      | Kitley     | gkitleybq@dagondesign.com | Bigender    | 2012-01-13    |
| 101 | Jerry       | Caroli     | jcaroli2s@wikispaces.com  | Genderfluid | 2012-01-20    |
| 247 | Mariejeanne | Newbatt    |                           | Agender     | 2012-02-13    |
| 996 | Arleyne     | Butner     |                           | Agender     | 2012-02-24    |
| 344 | Valentine   | Screas     | vscreas9j@gizmodo.com     | Agender     | 2012-03-09    |

(8 rows)

## Like and iLike

- select 5 row in which email ends with .com

```sql
SELECT * FROM person WHERE email LIKE '%.com' LIMIT 5;
```

| id  | first_name  | last_name  | email                   | gender      | date_of_birth |
| --- | ----------- | ---------- | ----------------------- | ----------- | ------------- |
| 1   | Shaylah     | Sabey      | ssabey0@1688.com        | Genderqueer | 2003-02-27    |
| 3   | Merwin      | Pinks      | mpinks2@example.com     | Male        | 2014-06-25    |
| 4   | Nanci       | Gascard    | ngascard3@blogspot.com  | Agender     | 2007-07-30    |
| 5   | Jacquenetta | Klesl      | jklesl4@marketwatch.com | Non-binary  | 2016-05-12    |
| 7   | Lacee       | Clausewitz | lclausewitz6@issuu.com  | Male        | 2017-06-25    |

(5 rows)

- iLike ignores the upper case or Lower case

## Group By

```sql
SELECT gender,count(*) From person GROUP BY gender;
```

| gender      | count |
| ----------- | ----- |
| Genderqueer | 115   |
| Bigender    | 127   |
| Genderfluid | 121   |
| Male        | 133   |
| Polygender  | 120   |
| Non-binary  | 129   |
| Female      | 140   |
| Agender     | 115   |

(8 rows)

## GROUP BY HAVING

- Select gender having count greater than 120

```sql
SELECT gender,count(*) From person GROUP BY gender HAVING COUNT(*)>120 ;
```

| gender      | count |
| ----------- | ----- |
| Bigender    | 127   |
| Genderfluid | 121   |
| Male        | 133   |
| Non-binary  | 129   |
| Female      | 140   |

(5 rows)

## [Aggregate Functions](https://www.postgresql.org/docs/13/functions-aggregate.html)

- Car with Minimum price

```sql
SELECT * FROM car WHERE price=(SELECT  MIN(price) FROM car);
```

| id  | make    | model | price   |
| --- | ------- | ----- | ------- |
| 100 | Pontiac | GTO   | 1001.00 |

(1 row)

- Car With Maximum Price

```sql
 SELECT * FROM car WHERE price=(SELECT  MAX(price) FROM car);
```

| id  | make  | model   | price   |
| --- | ----- | ------- | ------- |
| 707 | Buick | LeSabre | 4997.00 |

(1 row)

- Average Price of the car

```sql
SELECT AVG(price) From car;
```

| avg                   |
| --------------------- |
| 2988.9120000000000000 |

(1 row)

- Round Function

```sql
 SELECT ROUND(AVG(price)) From car;
```

| round |
| ----- |
| 2989  |

(1 row)

- Limiting precision

```sql
 SELECT ROUND(AVG(price),2) From car;
```

| round   |
| ------- |
| 2988.91 |

(1 row)

- Sum of all car's price

```sql
SELECT SUM(price) From car;
```

| sum        |
| ---------- |
| 2988912.00 |

(1 row)

- Select brand wise sum

```sql
SELECT make,SUM(price) FROM car GROUP BY make;
```

| make     | sum       |
| -------- | --------- |
| Ford     | 239439.00 |
| Smart    | 8067.00   |
| Maserati | 21880.00  |
| Dodge    | 157526.00 |

# Basic Arithmatic Operator
