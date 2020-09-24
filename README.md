# ReGov Challenge
 
### Run instructions:

After downloading the code, run the following command to start the app:

```sh
$ npm start
```

### Temp login data:

- Email: admin@test.com
- Password: admin123

### The app is built using:

- Meteor
- Reactjs
- MongoDB
- Bootstrap

### Main tasks:

- Register
- Personal data and ID
- Login
- Recover Password
- Update submission
- Delete submission


### Deployment instructions

The app is embedded with meteor-up package for deployment purposes, so it is ready to be deployed to any server, just change your server credentials as follows:

mup file location: (".deploy/mup.js")

```sh
host: 'YOUR-HOST.com',
username: 'USERNAME',
pem: 'pem PATH' (or: password: 'YOUR-SERVER-PASS'),
name: 'APP-NAME',
ROOT_URL: 'app.com',
```
After changing your server credentials, run the following commands to deploy:

```sh
mup setup
mup deploy
```
** Make sure you have mongodb installed in your server before you start the deployment process.



### Folders structure
![](https://raw.githubusercontent.com/osamaabdalla/ReGov/master/Screenshots/FoldersStructure.png)

### App Actions
![](https://raw.githubusercontent.com/osamaabdalla/ReGov/master/Screenshots/Actions.png)

### Login Page
![](https://raw.githubusercontent.com/osamaabdalla/ReGov/master/Screenshots/Login.png)

### Register Page
![](https://raw.githubusercontent.com/osamaabdalla/ReGov/master/Screenshots/Register.png)

### Recover Password Page
![](https://raw.githubusercontent.com/osamaabdalla/ReGov/master/Screenshots/RecoverPassword.png)

### Submission Page
![](https://raw.githubusercontent.com/osamaabdalla/ReGov/master/Screenshots/Submission.png)

### Edit Submission Page
![](https://raw.githubusercontent.com/osamaabdalla/ReGov/master/Screenshots/EditSubmission.png)


### Thanks.
