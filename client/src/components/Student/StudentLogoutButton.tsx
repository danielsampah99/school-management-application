import IconWrapper from "../IconWrapper";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

interface Props {
	onClick: VoidFunction;
	className: string;
}

const StudentLogoutButton = ({ onClick, className }: Props) => {
	return (
		<>
			<div className={className} onClick={onClick}>
				<IconWrapper
					className={"inline-flex h-6 w-6 text-white"}
					children={<ArrowRightEndOnRectangleIcon />}
				/>
				<span className="text-xl text-white/80">Logout</span>
			</div>
		</>
	);
};

export default StudentLogoutButton;
