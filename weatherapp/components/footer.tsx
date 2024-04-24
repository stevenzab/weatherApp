import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-black text-white py-6">
			<div className="max-w-7xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Navigation Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Navigation</h4>
						<ul>
							<li><a href="#" className="hover:text-gray-400">Home</a></li>
							<li><a href="#" className="hover:text-gray-400">About Us</a></li>
							{/* Add more navigation links here */}
						</ul>
					</div>

					{/* Contact Information */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Contact Us</h4>
						<p>Email: example@example.com</p>
						<p>Phone: 123-456-7890</p>
					</div>

					{/* Social Media Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Follow Me</h4>
						<ul>
							<li><Link href="https://www.linkedin.com/in/steven-zabandith-53b95b231/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Linkedin</Link></li>
							<li><Link href="https://github.com/stevenzab" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Github</Link></li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
