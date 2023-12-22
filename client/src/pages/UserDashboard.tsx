import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosResponse } from "axios";

interface User {
	_id: string;
	name: string;
	email: string;
}

const UserDashboard = () => {
	const [data, setData] = useState<User>();

	useEffect(() => {
		const getUserData = async () => {
			try {
				const xAuthToken = localStorage.getItem("x-auth-token");
				const userid = localStorage.getItem("userid") as string;

				const response: AxiosResponse = await apiClient.get<User>(
					`/api/users/${userid}`,
					{
						headers: {
							"x-auth-token": `Bearer ${xAuthToken}`,
						},
					},
				);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		getUserData();
	}, []);

	return (
		<>
			<div className="text-center font-mono text-3xl">
				<h1>
					Welcome{" "}
					<span className="text-3xl font-semibold text-blue-500">
						{data?.email}{" "}
					</span>
				</h1>
			</div>
		</>
	);
};

export default UserDashboard;
