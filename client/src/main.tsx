import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import UserDashboard from "./components/Student/UserDashboard.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import Payment from "./components/Student/Payment.tsx";
import Schedule from "./components/Student/Schedule.tsx";
import Results from "./components/Student/Results.tsx";
import Profile from "./components/Student/Profile.tsx";
import Notice from "./components/Student/Notice.tsx";
import Resources from "./components/Student/Resources.tsx";
import Courses from "./components/Student/Courses.tsx";
import Class from "./components/Student/Class.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/users/:id",
		element: <StudentDashboard />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "dashboard",
				errorElement: <ErrorPage />,
				element: <UserDashboard />,
			},
			{
				path: "payment",
				errorElement: <ErrorPage />,
				element: <Payment />,
			},
			{
				path: "class",
				errorElement: <ErrorPage />,
				element: <Class />,
			},
			{
				path: "courses",
				errorElement: <ErrorPage />,
				element: <Courses />,
			},
			{
				path: "resources",
				errorElement: <ErrorPage />,
				element: <Resources />,
			},
			{
				path: "notice",
				errorElement: <ErrorPage />,
				element: <Notice />,
			},
			{
				path: "profile",
				errorElement: <ErrorPage />,
				element: <Profile />,
			},
			{
				path: "results",
				errorElement: <ErrorPage />,
				element: <Results />,
			},
			{
				path: "schedule",
				errorElement: <ErrorPage />,
				element: <Schedule />,
			},
		],
	},
	{
		path: "/adminlogin",
		element: <AdminLogin />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/admindashboard",
		element: <AdminDashboard />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
