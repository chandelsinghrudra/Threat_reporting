This project allows users to report threats such as scams, frauds, misinformation, phishing, and cyberattack attempts. Users can submit details through a simple web form, and all reports are stored in a MySQL database. The admin and their team can then review these reports and take suitable actions against the reported issues.

/cyber-threat-report-system
├─ app.js # Main Express app
├─ package.json
├─ db/
│ └─ schema.sql # SQL schema to create users + threats tables
├─ views/
│ ├─ index.ejs # User-facing report form
│ └─ admin.ejs # Admin dashboard
├─ public/
│ └─ style.css
└─ README.md

The project demonstrates how to use RDBMS concepts like table relationships, normalization, and data storage in a practical way. It’s built using Node.js and Express for the backend, EJS for the frontend, and MySQL for data management.

This system can help record real-world cases such as fake loan apps, phishing websites, scam calls, or misinformation campaigns like “Operation Sindoor.” It’s a simple and effective project that connects cybersecurity awareness with database management.
