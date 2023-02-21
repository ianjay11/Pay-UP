# Pay-UP

## Description

Pay UP is a digital wallet application designed to provide a safe and secure payment platform for both buyers and sellers. The app acts as an intermediary, holding the payment until the buyer confirms the receipt of the item. This ensures that the seller is paid only after the buyer has received the item and is satisfied with the transaction.

In addition, Pay UP offers a unique feature where sellers can create deals and input all the necessary data for the transaction. This deal is then visible to the buyer who can accept it and proceed with the transaction. This makes the transaction process more transparent and allows both parties to have a clear understanding of the terms of the deal.

Pay UP is especially useful for online transactions where buyers and sellers may not know each other, and there is a risk of fraud or non-payment. With Pay UP, both parties can feel confident that the payment will be protected until the transaction is completed successfully.

The app is easy to use and provides a convenient payment method for both buyers and sellers. Buyers can add funds to their digital wallet and use the app to make payments for their purchases. Sellers can send money from their bank account to the app and receive payments directly into their account once the buyer confirms receipt of the item.

With Pay UP, you can buy and sell online with confidence, knowing that your payment is secure and protected until the transaction is completed successfully. The added feature of creating deals ensures a more transparent and efficient transaction process for both buyers and sellers.

### Features

1. Login and registration systems for users
2. Account Balance
3. Transaction History
4. Cash in and Cashout for your wallet
5. Creating deals between the specific buyer
6. Profile page to see the users information

### Technologies used

#### Languages
* HTML
* JAVASCRIPT
* CSS

#### Frameworks
* Bootstrap 5
* ExpressJS
* NodeJS
* REST API
* Vite

#### Libraries
* React
* Bcrypt
* Dotenv

(See package.json for more libraries used)

#### Database Management System
* PostgreSQL

## Installation
1. Clone Repository
2. Open in Visual Studio
3. Install the dependencies for the server:
 * Open Terminal and navigate to the server directory.
 * Type `npm init` and press enter until completed.
 * Type `npm install` to install the dependencies.
 
 4. Create a local Database
* Open SQL shell.
* Login to your database.
* Open the 'database.sql' file.
* Copy and paste 'CREATE DATABASE capstone;' into the command line of SQL shell. (note: you can change "capstone" to anything you want)
* After creating the database, type \c capstone (or your custom name of the database) into the command line.
* Individually copy all the CREATE TABLE statements from the 'database.sql' file into the command line to create your tables.

5. Connecting the Database and the Server
* Create a 'pool.js' file
* Copy and paste the following into your 'pool.js' file:
```
import  pg  from  "pg"
function  connectDatabase(){
    const  pool = new  pg.Pool ({
        user: '(your postgres username)',
        password: '(your postgres password)',
        host: 'localhost',
        port: 5432,
        database: 'capstone',
    })
        return  pool
    }
```

6. Create `.env` variable
    -Create a new file called '.env'.
    -Inside the '.env' file, input `JWT_SECRET = (insert your password-like string here)`.

7. Install the dependencies for the client:
    - Open a new terminal.
    - Navigate to the client directory.
    - Type `npm install` to install the dependencies.

8. Turn on the project:
    - Open a new terminal.
    - Navigate to the backend directory.
    - Type `npm run dev`.
    - Open a new terminal.
    - Navigate to the frontend directory.
    - Type `npm run dev`.


## Designs

### Login Page
<img src="https://github.com/ianjay11/Pay-UP/blob/master/frontend/screenshots/1loginpage.PNG">

### Signup Page
<img src="https://github.com/ianjay11/Pay-UP/blob/master/frontend/screenshots/2signuppage.PNG">

### Dashboard 
<img src="https://github.com/ianjay11/Pay-UP/blob/master/frontend/screenshots/3dashboard.PNG">

### Profile Page 
<img src="https://github.com/ianjay11/Pay-UP/blob/master/frontend/screenshots/4profilepage.PNG">

### Create Deal Page
<img src="https://github.com/ianjay11/Pay-UP/blob/master/frontend/screenshots/5createdealpage.PNG">

### My Purchases Page
<img src="https://github.com/ianjay11/Pay-UP/blob/master/frontend/screenshots/6mypurchasespage.PNG">



