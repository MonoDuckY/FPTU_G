export default function Stats() {
    const stats = [
        {label: 'Students', value: '25,000+'},
        {label: 'Faculty Member', value: '1,200+'},
        {label: 'Programs', value: '150+'},
        {label: 'Employment Rate', value: '95%'},
    ];

    return (
        <div className="bg-blue-600 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {stats.map((item,index) => (
                        <div key={index}>
                            <h3 className="text-4xl font-bold mb-2">{item.value}</h3>
                            <p className="text-blue-100 uppercase tracking-wider text-sm">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}