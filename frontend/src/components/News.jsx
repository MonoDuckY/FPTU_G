const News = ({ news }) => {
    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day:'numeric'};
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="p-6">
                <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <i className="bi bi-calendar3"></i>
                        <span>{formatDate(news.publishedDate)}</span>
                    </div>
                    <span className="text-xs w-fit font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {news.category}
        </span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">{news.title}</h4>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{news.summary}</p>
                <a href="#" className="text-blue-600 font-bold text-sm hover:underline">Read More {'>'}</a>
            </div>
        </div>
    );
};

export default News;