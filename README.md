# PackUp

**PackUp** is a mail and package management system designed specifically for residential complexes. Inspired by the functionality of myTLV's package management system used in Gindi Towers, in Tel Aviv. PackUp aims to streamline the process of managing incoming packages, enhancing convenience for both residents and management. **PackUp** is the first project of many which will eventually become a full-fledged management system for residential complexes.

## Features

- **Add Packages**: Easily log new packages into the system with relevant details (e.g., resident name, delivery date, package type).
- **Remove Single Package**: Allow user to mark a single package as picked up and move it to archive.
- **Remove Multiple Packages**: Support batch removal of multiple packages, streamlining the process when several packages need to be marked as picked up.
- **Edit Existing Packages**: Enable edits to package details in case of errors or changes, like updating the recipient's information or package type.
- **Undo Removal from Archive**: Allow user to retrieve and restore packages that were mistakenly archived or marked as removed.
- **Archive Page**: Provides a dedicated page where all removed or picked-up packages are stored. Users can review package history, search archived packages, and retrieve any packages that need to be restored.

## Installation

### Step 1: Clone the Repository:

```bash
git clone https://github.com/SuperDuperAlon/PackUp.git
cd PackUp
```

### Step 2: Install Dependencies

Install the necessary dependencies for the project:

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory. Add the following environment variables, ensuring your MongoDB URI and sensitive keys remain private:

````plaintext
MONGODB_URI=<Your MongoDB connection string>
SECRET_KEY=<Your secret key for data protection>
````

### Step 4: Run the Application

Start the application server:

```bash
npm start
```

### Step 5: Access the App

Open your browser and go to `http://localhost:3000` to access the PackUp application.
