import { ReactNode } from "react";
import IconWrapper from "../IconWrapper";

interface Props {
	buttonIcon: ReactNode;
	onClick: () => void;
}

const Header = ({ buttonIcon, onClick }: Props) => {
	return (
		<div className="top-0 flex w-full flex-wrap items-center justify-between px-3">
			<button aria-label="toggle sidebar" onClick={onClick}>
				<IconWrapper
					className={
						" h-8 w-8 bg-transparent text-black/80  dark:text-neutral-200"
					}
					children={buttonIcon}
				/>
			</button>
		</div>
	);
};

export default Header;
