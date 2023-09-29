import { Status } from "@/services/interfaces/task";

export interface ITagColors {
	gray: "#222222";
	red: "#973E3E";
	brown: "#5B3124";
	orange: "#B54F2F";
	yellow: "#D8AE1C";
	green: "#3D7921";
	lightBlue: "#1060CC";
	darkBlue: "#213479";
	purple: "#481F72";
	pink: "#B024A2";
}

export interface ITaskValues {
	title: string;
	description: string;
	status: Status;
	tags: { name: string; color: keyof ITagColors }[];
}
