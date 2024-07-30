# Eisen-submission
File Upload Web Tool to database. Uses React & Chakra-UI on the frontend, Python & Flask on the backend, and SQLite for the database.

# Project Structure

Eisen-submission/
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── ..
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeleteButton.tsx
│   │   │   ├── DownloadButton.tsx
│   │   │   ├── FileList.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Message.tsx
│   │   │   └── Navbar.tsx
│   │   ├── context/
│   │   │   ├── FooterHeightContext.tsx
│   │   │   └── NavbarHeightContext.tsx
│   │   ├── themes/
│   │   │   └── theme.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── ..
│   ├── package.json
│   ├── ..
├── backend/
│   ├── files.db
│   ├── app.py
│   ├── requirements.txt
│   ├── .gitignore
│   ├── ..
└── devops/
    ├── start.sh
    ├── stop.sh
    ├── start.bat
    ├── stop.bat
    ├── ..
└── .gitignore
└── README.md

# Launch Instructions

## On Mac/Linux:

to start the application, run `./devops/start.sh`
to stop the application, run `./devops/stop.sh`

That's it. Because Devops ought be simple.

## On Windows:

to start the application, run `./devops/start.bat`
to stop the application, run `./devops/stop.bat`

Sadly not. Because Bill Gates made nothing elegant.
If you use Windows (I'm sorry for your loss)
then inform me and I will troubleshoot any launch mishaps with you.
