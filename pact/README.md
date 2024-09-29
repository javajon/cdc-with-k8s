This was inspired from [Marie Drake](https://www.mariedrake.com/) who wrote the article [Contract Testing with Pact.js and Jest](https://www.mariedrake.com/post/contract-testing-with-pact-js-and-jest). These links are no longer available.

## General Steps for Node.js apps

# Setting up and Running a Node.js Application from Source Code

1. Install Node.js

Install the latest version of Node. 20 or newer.

2. **Create a new directory for your project**
   ```bash
   mkdir my-nodejs-app
   cd my-nodejs-app
   ```

3. **Initialize a new Node.js project**
   ```bash
   npm init -y
   ```
   This creates a basic `package.json` file with default values.

4. **Copy your Node.js source code into this directory**
   For example, if your main file is `app.js`, copy it into this directory.

5. **Identify dependencies**
   Open your source code and look for `require` statements to identify what packages you need.

6. **Add dependencies to package.json**
   Manually edit `package.json`. Add a "dependencies" section if it doesn't exist:
   ```json
   {
     "dependencies": {
       "express": "^4.17.1",
       "lodash": "^4.17.21"
     }
   }
   ```
   Replace these with your actual dependencies.

7. **Install dependencies**
   ```bash
   npm install
   ```
   This will install the dependencies and create `package-lock.json`.

8. **Set up a start script in package.json**
   Add a "start" script to the "scripts" section:
   ```json
   {
     "scripts": {
       "start": "node app.js"
     }
   }
   ```
   Replace `app.js` with your main file name.

9.  **Run the application**
   ```bash
   npm start
   ```

10. **Initialize Git repository (optional)**
   ```bash
   git init
   ```

11. **Create .gitignore file (optional)**
    ```bash
    echo "node_modules/" > .gitignore
    ```

12. **Make initial commit (optional)**
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

13. **Run the application after a fresh clone**
    For future use or on another machine:
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    npm ci
    npm start
    ```

Remember to replace placeholder values (like `app.js` or dependency names) with your actual file names and dependencies.


