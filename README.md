# Project Setup and Running Guide
This document provides a step-by-step guide to set up, run, and manage the project on a new machine with no prior installations of Node.js, IDEs, or any dependencies.

## Step 1: Install Required Software
1. **Install Node.js**
    - Download the latest **LTS** version of Node.js from the [official Node.js website](https://nodejs.org/).
    - Follow the installation instructions for your operating system.
    - Verify the installation by running the following commands in your terminal:
``` bash
     node -v
     npm -v
```
2. **Install Git (Optional, if using version control)**
    - Download and install Git from the [official Git website](https://git-scm.com/).
    - Verify Git is installed:
``` bash
     git --version
```
3. **Install a Code Editor (Optional)**
    - Download and install your preferred editor (e.g., [Visual Studio Code](https://code.visualstudio.com/) or [WebStorm IDE](https://www.jetbrains.com/webstorm/)).
    - WebStorm is recommended for seamless integration (if available).

## Step 2: Clone the Project Repository
1. Open your terminal.
2. If using Git, clone the repository:
``` bash
   git clone <repository-url>
```
Replace `<repository-url>` with your project repository URL (e.g., from GitHub).
3. Navigate to the project directory:
``` bash
   cd <project-folder-name>
```
If you’ve downloaded a `.zip` file instead of using Git:
- Extract the contents of the `.zip` file.
- Navigate to the project folder in the terminal.

If you decide to use WebStorm (which I, again, recommend) you can clone the repository like in this video:
https://youtu.be/JkxQIWeylCk?si=cBRE5CG_Ykbam3aS

## Step 3: Install Dependencies
1. Inside the project directory, install the required Node.js packages by running:
``` bash
   npm install
```
This will download all the necessary project dependencies specified in the `package.json` file.
1. If any errors occur during installation, ensure you are using a compatible version of Node.js.

## Step 4: Run the Project
### Development Server
1. Start the development server by running:
``` bash
   npm run dev
```
1. Once the server is running, open your web browser and navigate to the provided URL (`http://localhost:5173` in our case).


