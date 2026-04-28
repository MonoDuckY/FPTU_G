export default function Hero() {
    return (
        <header className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/building.png"
                    className="w-full h-full object-cover"
                    alt="Campus Building"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Shape Your Future <br /> at Excellence University
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                    Empowering students to achieve excellence through innovation, research, and community engagement.
                </p>
                <div className="flex gap-4 justify-center">
                    <button className="bg-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Explore Programs</button>
                    <button
                        className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Schedule a Visit</button>
                </div>
            </div>
        </header>
    );
}