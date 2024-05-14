import { Position } from "./position";
import { Transition } from "./transition";

export interface Toast {
	position: Position;
	message: string;
	hideProgressBar: boolean;
	autoClose: number;
	closeOnClick: boolean;
	pauseOnHover: boolean;
	draggable: boolean;
	theme: string;
	transition: Transition;
}
