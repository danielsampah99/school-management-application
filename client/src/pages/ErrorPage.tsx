import { useRouteError, isRouteErrorResponse } from "react-router-dom"


const ErrorPage: React.FC = () => {
	const error: unknown = useRouteError()
	let errorMessage: string;
	
	if (isRouteErrorResponse(error)) {
		errorMessage = error.data || error.statusText
	} else if (error instanceof Error) {
		errorMessage = error.message
	} else if (typeof error === "string") {
		errorMessage = error
	} else {
		console.error(error)
		errorMessage = "Unknown error."
	}

	return (
		<div id="error-page" className="flex flex-col gap-8 justify-center items-center h-screen w-screen dark:bg-zinc-900">
			<h1 className="text-4xl font-extrabold dark:text-zinc-600">Oops!</h1>
			<p className="dark:text-zinc-500">Sorry, an unexpected error occurred.</p>
			<p className="text-slate-400 dark:text-zinc-400">
				<i>{errorMessage}</i>
			</p>
		</div>
	)
}

export default ErrorPage