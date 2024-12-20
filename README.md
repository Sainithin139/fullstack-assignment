//clone to repository
git clone https://github.com/your-repo/complaints-app.git
cd complaints-app
//install backend dependencies
cd backend
npm install
// instal forntend  dependencies
cd ../frontend
npm install
//Running the Application
cd backend
node app.js
cd frontend
npm run dev
//MongoDB Setup Instructions
mongod
use complaints_db
db.createCollection("complaints")
