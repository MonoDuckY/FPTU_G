export default function Contact() {
    return (
        <section className="bg-slate-900 text-white py-20">
            <div className="conatiner mx-auto px-6 grid md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl font-bold mb-6">Get in touch</h2>
                    <p className="text-gray-400 mb-8">Reach out to us and we'll get back to you as soon as possible.</p>
                    <div className="space-y-4">
                        <p>📍 123 University Avenue, City, State 12345</p>
                        <p>📞 +1 (555) 123-4567</p>
                        <p>✉️ info@excellenceuniversity.edu</p>
                    </div>
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl">
                    <form  className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full p-3 bg-slate-700 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <textarea placeholder="Message" rows="4" className="w-full p-3 bg-slate-700 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        <button className="w-full bg-blue-600 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
}