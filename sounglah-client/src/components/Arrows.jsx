import React from "react";

export const DownArrow = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-arrow-bar-down"
			width="40"
			height="40"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="#2c3e50"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<line x1="12" y1="20" x2="12" y2="10" />
			<line x1="12" y1="20" x2="16" y2="16" />
			<line x1="12" y1="20" x2="8" y2="16" />
			<line x1="4" y1="4" x2="20" y2="4" />
		</svg>
	);
};

export const RightArrow = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-arrow-bar-right"
			width="40"
			height="40"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="#2c3e50"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<line x1="20" y1="12" x2="10" y2="12" />
			<line x1="20" y1="12" x2="16" y2="16" />
			<line x1="20" y1="12" x2="16" y2="8" />
			<line x1="4" y1="4" x2="4" y2="20" />
		</svg>
	);
};
