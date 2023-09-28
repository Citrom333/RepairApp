# Repairing App

### This application is made for an assembly workshop to handle database of vehicles, works, used fixtures, and shops.

<img src=https://svgsilh.com/svg/145804.svg alt="gear" width="200"/>

## Table of Content
1. [ Description. ](https://github.com/Citrom333/RepairApp#description)
2. [ Working of the project. ](https://github.com/Citrom333/RepairApp#working-of-the-project)
3. [ Installation Guide. ](https://github.com/Citrom333/RepairApp#installation-guide)


## Description

The idea for the project was to make an application for an assembly workshop, where the mechanicans can handle a database for the vehicles that they work on, the repairings they make on them, and the used fixtures. They also can get in contact with the shops to order new fixtures.
So the database has to store the details of vehicles, the works for each, the fixtures, and the list of the shops with their contact info.
The backend was made with JAVA Spring Booth. 
The frontend was written in React Vite. 
The database is MSSQL.

Everything is running from docker compose, so it is easy to start the whole application with just one command.
I also used Sendgrid REST API for sending emails.


## Working of the project

<img src=src/picturesForReadme/main.png alt="main" width="300"/>

From the main page you can navigate to the list of the license plates of the vehicles in the database. 

We have a navigation bar, which helps the users navigate through the pages. 
By clicking on a license plate number you can see a list of the works that had been made on that vehicle. 
You can see more details of the works after clicking on them.

<img src=src/picturesForReadme/worklist.png alt="worklist" width="500"/>

The vehicles can be updated and deleted, and you can add new vehicles to the database.
You can add new work to them in a simple form, where you can add the used fixtures. (If you can't find it in the list, you can add new one.)
You can also see a list of the shops, where you can buy the fixtures, and get in contact with them on the e-mail sender page.

<img src=src/picturesForReadme/email.png alt="email" width="500"/>


## Installation Guide

Clone the code from gitHub.
For running the application, You need to have docker on your machine. 
You can download and install Docker Desktop application from https://www.docker.com/products/docker-desktop/.
In Linux/Ubuntu you can also install docker in terminal.
```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
"deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
"$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

You also need to configurate email sending. 

Create a new sendgrid.env file in the RepairinApp folder, with the following content:

    SENDGRID_API_KEY=""

    SENDER_EMAIL=""

Now you need to set up the sendgrid api. Visit the page: https://app.sendgrid.com. 

Create an account.

You need to create an API key (https://app.sendgrid.com/settings/api_keys), and copy it in the env file. This will be the SENDGRID_API_KEY.

You also need to set a sender account with an e-mail address, that must be verified. https://app.sendgrid.com/settings/sender_auth/senders/new

Copy the email address to the env file. This will be the SENDER_EMAIL.

For example:

    SENDGRID_API_KEY="secretApi1234567"

    SENDER_EMAIL="sender@email.com"

In Linux: you need one more initialization step. In the RepairingApp folder run the command:
```bash
chmod +x repairApp_start.sh
```

Then any time you want to start the program: (In the RepairingApp folder)
```bash
./repairApp_start.sh
```

In Windows: you have to start Docker desktop application, then run repairApp_start.bat.

## <span style="color:darkgreen">Best wishes, Citrom</span>

