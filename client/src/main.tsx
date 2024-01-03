import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import PaymentInfo from "./components/PaymentInfo.tsx";
import Schedule from "./components/Schedule.tsx";
import Results from "./components/Results.tsx";
import Profile from "./components/Profile.tsx";
import Notice from "./components/Notice.tsx";
import LearningMaterials from "./components/LearningMaterials.tsx";
import Courses from "./components/Courses.tsx";
import Class from "./components/Class.tsx";

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
				element: <PaymentInfo />,
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
				element: <LearningMaterials />,
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
