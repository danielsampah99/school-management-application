import { ReactNode } from "react";

export interface IconWrapperProps {
	className: string;
	children: ReactNode;
}

const IconWrapper = ({ className, children }: IconWrapperProps) => {
	return <div className={className}>{children}</div>;
};

export default IconWrapper;
