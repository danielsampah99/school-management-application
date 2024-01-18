import { ReactNode, useEffect, useState } from "react";
import IconWrapper from "../IconWrapper";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AxiosResponse, AxiosError } from "axios";
import apiClient from "../../services/apiClient";
import toast from "react-hot-toast";

interface Props {
	buttonIcon: ReactNode;
	onClick: () => void;
}

interface User {
	name: string;
}

const Header = ({ buttonIcon, onClick }: Props) => {
	const [data, setData] = useState<User>();

	useEffect(() => {
		const getUserData = async () => {
			try {
				const xAuthToken = localStorage.getItem("x-auth-token");
				const email = localStorage.getItem("email") as string;

				const response: AxiosResponse = await apiClient.get<User>(
					`/api/users/${email}`,
					{
						headers: {
							"x-auth-token": `Bearer ${xAuthToken}`,
						},
					},
				);

				setData(response.data);
				console.table(data?.name)
			} catch (error) {
				if (error instanceof AxiosError) return toast.error(error.message);
				console.error(error);
				
			}
		};
		getUserData();
	}, [data?.name]);
	return (
		<div className="top-0 flex w-full h-auto select-none cursor-pointer flex-norap items-center justify-between p-3 shadow-md">
			<button aria-label="toggle sidebar" onClick={onClick}>
				<IconWrapper
					className={
						" h-8 w-8 bg-transparent text-black/80  dark:text-neutral-200"
					}
					children={buttonIcon}
				/>
			</button>
			<div className="flex flex-shrink-0 space-x-2 items-center ">
				<IconWrapper className={"bg-gray-500 border-none rounded-full inline-block text-black h-8 w-8 "} children={<UserCircleIcon />} />
				<p className="text-md inline-block font-semibold text-black/50">{data?.name}</p>
			</div>
		</div>
	);
};

export default Header;
