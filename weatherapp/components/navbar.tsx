import Link from "next/link";

export default function Navbar() {
	return (
		<div className="bg-blue-300">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<a href="#" className="text-white font-bold text-lg">Logo</a>
					</div>
					<div className="flex items-center space-x-4">
						<Link href="/" className="text-white font-bold hover:text-gray-200">Home</Link>
						<Link href="/about-page" className="text-white font-bold hover:text-gray-200">About</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
