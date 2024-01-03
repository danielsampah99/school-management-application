import { Link } from "react-router-dom";
import {
	Squares2X2Icon,
	WalletIcon,
	UserIcon,
	CalendarDaysIcon,
	ChatBubbleBottomCenterIcon,
	UserGroupIcon,
	RectangleGroupIcon,
	BookOpenIcon,
	PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import IconWrapper from "./IconWrapper";
import { ReactNode } from "react";

type SidebarItems = { name: string; icon: ReactNode; path: string };

const sidebarItems: SidebarItems[] = [
	{ name: "Dashboard", icon: <Squares2X2Icon />, path: "dashboard" },
	{ name: "Payment Info", icon: <WalletIcon />, path: "payment" },
	{ name: "Profile", icon: <UserIcon />, path: "profile" },
	{ name: "Courses", icon: <RectangleGroupIcon />, path: "courses" },
	{ name: "Class", icon: <UserGroupIcon />, path: "class" },
	{ name: "Results", icon: <PresentationChartBarIcon />, path: "results" },
	{ name: "Learning Materials", icon: <BookOpenIcon />, path: "resources" },
	{ name: "Notice", icon: <ChatBubbleBottomCenterIcon />, path: "notice" },
	{ name: "Schedule", icon: <CalendarDaysIcon />, path: "schedule" },
];

const StudentSidebar = () => {
	return (
		<aside className="ml-1 mt-1 hidden h-screen w-auto rounded-md bg-stone-800 pb-2 pt-3 lg:block">
			<ul>
				{sidebarItems.map((sidebarItem, index) => (
					<li
						key={index}
						className="mx-2 flex flex-1 flex-row rounded-md p-2 hover:bg-pink-600 focus:bg-pink-700 active:bg-pink-600"
					>
						<Link to={sidebarItem.path}>
							<IconWrapper className="mr-2 inline-flex h-6 w-6 text-white">
								{sidebarItem.icon}
							</IconWrapper>
							<span className="text-xl text-white/70">
								{sidebarItem.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default StudentSidebar;
