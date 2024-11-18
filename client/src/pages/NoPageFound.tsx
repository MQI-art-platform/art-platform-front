export const NoPageFound = () => {
	return (
		<div>
			<h1 className="text-5xl font-title text-neutral-950 mb-6">404</h1>
			<p className="text-xl text-neutral-950 mb-6">Oops! The page you're looking for doesn't exist.</p>
			<img src="https://tools-api.webcrumbs.org/image-placeholder/600/400/doodles/4" alt="Page Not Found" className="w-[600px] h-[400px] object-cover mx-auto rounded-md" />

			<div className="mt-8">
				<a href="/" className="bg-primary text-white py-3 px-8 rounded-full">
					Go Back Home
				</a>
			</div>
		</div>
	)
}

