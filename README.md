# CoolChat: A MERN-Based Chatting Application

CoolChat is a fully responsive, real-time chat application built with the MERN stack and Socket.io. It provides a seamless, secure, and interactive platform for users to communicate with their friends and groups.

## Overview

CoolChat enables users to log in, sign up, and connect with others through direct messages or group chats. The app includes modern features like customizable wallpapers, typing indicators, and message notifications, ensuring an engaging user experience.

## Live Demo

You can view the live application at [https://coolchat-mern-1.onrender.com](https://coolchat-mern-1.onrender.com)

## Features

- **Fully Responsive Design**:  CoolChat provides a smooth experience across devices, ensuring usability on desktops, tablets, and mobile phones.
- **User Authentication**:  Secure login and signup using JWT-based authentication. Passwords are securely hashed using Bcrypt.js.
- **Real-Time Chat**:  Instant messaging powered by Socket.io with support for private and group chats.
- **Search Functionality**:  Users can search for other users by name or email.
- **Message Notifications**:  Real-time message notifications for new chats.
- **Typing Indicators**:  Typing indicators, to provides better chatting experience
- **Customizable Chat Interface**:  Users can change chat wallpaper to personalize their experience.

## Screenshots
### Chat Interface

![CoolChat Screenshot](https://res.cloudinary.com/dz1vsgxm5/image/upload/CoolChat/screenshots/xd77kmrchlcczperul8c)

### Login Page

![Login Screenshot](https://res.cloudinary.com/dz1vsgxm5/image/upload/CoolChat/screenshots/d2iztylyzuh6nrl6a2xj)

### Signup Page

![Signup Screenshot](https://res.cloudinary.com/dz1vsgxm5/image/upload/CoolChat/screenshots/zdzwheu7a2qcwgzudtez)

## Technologies Used

- **Frontend**: ReactJS, ChakraUI, CSS

- **Backend**: Socket.io, Node.js, Express.js, Cloudinary

- **Database**: MongoDB

- **Authentication**: JSON Web Token (JWT), Bcrypt.js

## Installation

To run this project locally, follow these steps:

### Backend Setup
1. Clone the repository:

   ```bash
   git clone https://github.com/Akshaygarg034/CoolChat-MERN.git
   ```

2. Navigate to the project directory:

    ```bash
    cd CoolChat-MERN
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Add a .env file to the backend directory with the following variables:

    ```bash
    # Backend
      MONGO_URI = your-mongodb-connection-string  
      PORT = 5000
      JWT_SECRET = your-jwt-secret 
      # NODE_ENV=production
      
      # Frontend
      REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name  
      REACT_APP_CLOUDINARY_UPLOAD_PRESET=your-cloudinary-upload-preset 
      REACT_APP_CLOUDINARY_API=your-cloudinary-api 
    ```

5. Start the React app:

    ```bash
    npm start
    ```
### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend 
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the React app:

    ```bash
    npm start
    ```

5. Open your web browser and visit <http://localhost:3000/> to use the app locally.


## Contact

If you have any questions, feedback, or would like to get in touch with me, feel free to reach out to me:
- **Email**: [gargakshay034@gmail.com](gargakshay034@gmail.com)
- **Linkedin**: [https://www.linkedin.com/in/akshay-garg-360281213](https://www.linkedin.com/in/akshay-garg-360281213/)
