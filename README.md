# TIMETUTOR (Deploy Link: https://main--ideamagixschedular.netlify.app/login)

> TimeTuto is a comprehensive application designed to streamline the scheduling process for educational institutions. With TimeTutor, administrators have the capability to efficiently manage schedules for instructors, add courses, and oversee the entire scheduling workflow. Additionally, instructors can access their personalized schedules, ensuring they stay organized and informed about their upcoming lectures.

## Features

## Admin Features

1. **View List of Instructors**: Admins can access and review a list of all registered instructors in the system.

2. **Add Courses**: Admins have the capability to add new courses to the system, specifying course details such as name, level, description, and image. They can also define multiple lectures (batches) for each course.

3. **Assign Lectures to Instructors**: Admins can assign lectures to specific instructors, specifying details such as lecture timing, course details, and any additional information. This feature ensures proper allocation of teaching responsibilities and facilitates effective communication between administrators and instructors.

## Instructor Features

1. **View Assigned Lectures**: Instructors can access a list of all lectures assigned to them upon logging into the system. This feature enables instructors to stay organized and prepared for their teaching responsibilities.

## Setup

### Client-side (Frontend)

## Client-Side Setup

To set up the frontend of TimeTutor, follow these steps:

1. Download the frontend code:
   - [Download ZIP](https://github.com/AdityaRajaram13/ideamagix/archive/refs/heads/main.zip)

2. Extract the downloaded ZIP file.

3. Open the `ideamagixFrontend` directory in your preferred code editor (e.g., Visual Studio Code).

4. Open a terminal within the code editor or navigate to the `ideamagixFrontend` directory in your terminal.

5. Install dependencies:
   ```bash
   npm install

6. Start the developement Server
   npm run dev

## server-Side Setup (localhost)

To set up the backend of TimeTuto, follow these steps:

1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/AdityaRajaram13/timetutorBackend

2. Install dependecies:
   npm install

3. Run Server
   npm start

## Environment Variables

In order to run the TimeTuto backend, you need to set up your environment variables. Create a `.env` file in the root directory of the backend (`ideamagix`) with the following content:

```plaintext
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@host_name/database_name  (MongoDB atlas)
JWT_SECRET='your-secret-key'

## Routing Setup

In TimeTutor, routing is managed using React Router.

- **Admin Routes**: Admins have access to administrative features such as adding courses and schedules. They can visit `/admin/addcourse`, `/admin/addschedule`, and `/admin/dashboard` routes. On the admin dashboard, admins can also view assigned instructors.

- **Instructor Routes**: Instructors can view their schedules at `/instructor`.

- **Login Route**: Users can access the login page at `/login` to authenticate and access the application.












 
