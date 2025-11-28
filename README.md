# Blood Hub

The Blood Hub is a secure, full-stack web application designed to quickly
connect urgent blood requests from individuals (seekers) with potential donors.
Built using Next.js 14 (App Router) and MongoDB/Mongoose, the platform allows
authorized users to submit, view, and manage their critical blood requests in
real-time.

## Live Site URL

[https://blood-donation-client-kohl.vercel.app/]

## Key Features

- Secure Authentication: User registration and login using NextAuth.js
  (Credentials and Google OAuth).

- Persistent Requests: Store and manage urgent requests in a MongoDB database.

- Protected Routes: Authorization guards to secure request submission and
  management pages.

- Public Visibility: A public board to view all active, open requests.

- Image Upload: Secure profile picture uploads integrated via a Next.js Route
  Handler and an external service (ImgBB).

---

## Route
- **/** Home page
- **/requests** get all open blood requests
- **/dashboard/add-request** Create new blood request by user
- **/dashboard/my-request** Manage all blood request created by user
- **/about** About us page route
- **/contact** Contact us page route


### 🚀 Getting Started (Local Setup)

To view and run this project locally, follow these simple steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/TheMamunDev/Blood-Donation-client.git

    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Blood-Donation-client
    ```
3.  **Change The env Config**
    ```
    MONGODB_URI
    NEXTAUTH_SECRET
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET
    NEXTAUTH_URL
    NEXT_PUBLIC_API_URL
    JWT_SECRET
    NEXT_PUBLIC_IMGBB_KEY=
    ```
4.  **Run**
    ```bash
    npm install
    npm run dev
    ```
