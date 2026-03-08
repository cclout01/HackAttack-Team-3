# HackAttack Team 3 – Setup Instructions for Judges

Thank you for reviewing our project.

This project includes:
- a **React frontend**
- a **Spring Boot backend**
- **Firebase Firestore** for database storage

To run the project locally, both the frontend and backend must be started.

---

## 1. Prerequisites

Please make sure the following are installed on your computer:

### Required 
- **Git**
- **Node.js** (version 18 or higher recommended)
- **Java JDK** (version 17 or higher recommended)

## 2. Clone the Repository
git clone <REPOSITORY_URL>
cd HackAttack-Team-3

## 3. Firebase Service Account Key

For security reasons, the Firebase key is not included in the GitHub repository.

Please download the file: serviceAccountKey.json

Think can be found through the Google Drive link uploaded in our submission under the project story paragraph. 

Then place it in the following folder:

backend/src/main/resources/

So the full path should be: backend/src/main/resources/serviceAccountKey.json
This step is required for the backend to connect to Firebase.

## 4. Run the Backend

Open a terminal and run:

### On Windows
cd backend
.\mvnw.cmd spring-boot:run
### On macOS / Linux
cd backend
./mvnw spring-boot:run

If macOS/Linux gives a permission error, run:

chmod +x mvnw
./mvnw spring-boot:run

The backend should run on:

http://localhost:8080

Keep this terminal open.

## 5. Run the Frontend

Open a second terminal and run from the project root:

npm install
npm run dev

The frontend should run on:

http://localhost:5173

Keep this terminal open as well.

### 6. Open the Website

Once both servers are running, open:

http://localhost:5173

in your browser.

## 7. Important Notes

Both the frontend and backend must be running at the same time.

The backend uses port 8080.

The frontend uses port 5173.

If either port is already in use, please stop the other process using it.

## 8. Quick Start Summary
Terminal 1

cd backend
.\mvnw.cmd spring-boot:run

Terminal 2

npm install
npm run dev

Browser

Open:

http://localhost:5173

## 9. Troubleshooting
Backend does not start

Make sure Java is installed correctly

Make sure serviceAccountKey.json is in:
backend/src/main/resources/

Frontend does not load backend data

Make sure the backend is running on http://localhost:8080

Make sure the frontend is running on http://localhost:5173

Port already in use

If port 8080 or 5173 is already being used, stop the other process using that port and try again.

Stop the application

Press Ctrl + C in each terminal window.

Thank you for taking the time to review our project.
