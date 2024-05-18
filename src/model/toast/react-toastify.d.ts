import { Toast } from "./toast";

declare module "react-toastify" {
	export const toast: {
		(content: React.ReactNode, options?: Toast): void;
		success(content: React.ReactNode, options?: Toast): void;
		error(content: React.ReactNode, options?: Toast): void;
		info(content: React.ReactNode, options?: Toast): void;
		warning(content: React.ReactNode, options?: Toast): void;
	};
}
