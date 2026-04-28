export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
                    <span className="text-xl font-bold text-blue-900">Excellence University</span>
                </div>
                <div className="hidden md:flex gap-8 font-medium text-gray-600">
                    <a href="#" className="hover:text-blue-600">Home</a>
                    <a href="#" className="hover:text-blue-600">Blog</a>
                    <a href="#" className="hover:text-blue-600">About Us</a>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700">Apply Now</button>
            </div>
        </nav>
    );
}