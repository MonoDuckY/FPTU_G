import React from 'react';

const CampusLife = () => {
    const features = [
        {
            id: 1,
            title: "Diverse Community",
            description: "Students from over 100 countries.",
            icon: "bi-people-fill",
        },
        {
            id: 2,
            title: "Student Success",
            description: "Comprehensive support and mentorship.",
            icon: "bi-house-heart-fill",
        },
        {
            id: 3,
            title: "Global Opportunities",
            description: "Study abroad in 50+ countries.",
            icon: "bi-globe-americas",
        },
    ];

    return (
        <section className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Experience Campus Life
                    </h2>
                    <p className="text-gray-500 text-lg mb-10">
                        Our vibrant campus community offers endless opportunities for growth,
                        connection, and discovery. With over 200 student organizations,
                        state-of-the-art facilities, and a diverse student body,
                        you'll find your place here.
                    </p>

                    <div className="space-y-8">
                        {features.map((item) => (
                            <div key={item.id} className="flex items-start gap-4 group">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <i className={`bi ${item.icon} text-xl`}></i>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h5>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="order-1 lg:order-2 relative">
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                        <img
                            src="/images/playground.png"
                            alt="Campus Life"
                            className="w-full h-full object-cover aspect-[4/3]"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CampusLife;