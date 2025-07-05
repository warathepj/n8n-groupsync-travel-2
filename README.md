# ซอร์สโค้ดนี้ ใช้สำหรับเป็นตัวอย่างเท่านั้น ถ้านำไปใช้งานจริง ผู้ใช้ต้องจัดการเรื่องความปลอดภัย และ ประสิทธิภาพด้วยตัวเอง

# GroupSync Travel 

## Overview

GroupSync Travel is a web application designed to simplify the process of planning group trips. It allows users to submit their individual travel preferences, including desired dates and destinations. An admin can then view all submissions and use an AI-powered feature to automatically generate a consolidated travel plan that accommodates the group's collective preferences.

The application features a simple, user-friendly interface for data entry and a dedicated admin panel for reviewing data and triggering the AI planning process.

## Features

- **User Preference Form**: A clean and simple form for users to input their name, desired travel dates, and preferred destinations.
- **Admin Dashboard**: A private admin page (`/admin`) that displays all user submissions in a clear, readable format.
- **AI-Powered Trip Planning**: A one-click button for admins to send the collected data to a webhook, which leverages an AI to generate a coherent travel plan for the group.
- **Simple Data Storage**: Uses a straightforward `data.json` file to store user submissions, making the application lightweight and easy to manage.
- **Real-time Feedback**: The application provides immediate feedback on data submission and displays the AI-generated trip plan directly on the admin page.

## How It Works

1.  **Data Collection**: Users navigate to the homepage (`/`) and fill out the form with their travel preferences. The submitted data is saved to `src/data.json`.
2.  **Admin Review**: The administrator navigates to the `/admin` page to view a list of all submissions.
3.  **AI Trip Generation**: On the admin page, the admin can click the "ให้ AI จัดทริปให้คุณ" (Let AI plan a trip for you) button.
4.  **Webhook Integration**: This action sends all the collected user data from `data.json` to a pre-configured webhook.
5.  **Display Plan**: The webhook processes the data through an AI service and returns a suggested travel plan, which is then displayed on the admin page.

## File Structure

-   `index.js`: The backend server (Node.js/Express) that handles routing, file serving, and API endpoints.
-   `src/index.html`: The main page containing the user submission form.
-   `src/admin.html`: The admin page for viewing data and triggering the AI planner.
-   `src/data.json`: A JSON file that acts as the database for storing user preferences.
-   `package.json`: Defines project metadata and dependencies.

## Github
    ```bash
    https://github.com/warathepj/n8n-groupsync-travel-2.git
    ```

## How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start the Server**:
    ```bash
    npm start
    or
    node index.js
    ```
3.  **Access the Application**:
    -   **User Form**: Open your browser and go to `http://localhost:3000`
    -   **Admin Panel**: Access the admin view at `http://localhost:3000/admin`

*(Note: The port may vary depending on your configuration in `index.js`.)*
