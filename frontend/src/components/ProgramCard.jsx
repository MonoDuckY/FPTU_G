export default function ProgramCard({ program }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
            <div className="h-48 bg-gray-200 overflow-hidden">
                <img src={`/images/${program.title.toLowerCase()}.jpg`} className="w-full h-full object-cover group-hover:scale-110 transition" alt={program.title} />
            </div>
            <div className="p-6">
                <h5 className="text-xl font-bold mb-2">{program.title}</h5>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">{program.description}</p>
                <a href="#" className="text-blue-600 font-bold text-sm">Learn More {'>'}</a>
            </div>
        </div>
    );
}