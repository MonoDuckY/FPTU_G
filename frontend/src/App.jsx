import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import ProgramCard from './components/ProgramCard.jsx';
import Contact from './components/Contact.jsx';
import CampusLife from "./components/CampusLife.jsx";
import News from "./components/News.jsx";

function App() {
    const [programs, setPrograms] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Gọi cả 2 API cùng lúc
        const fetchData = async () => {
            try {
                const [progRes, newsRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/programs'),
                    axios.get('http://localhost:8080/api/news')
                ]);
                setPrograms(progRes.data);
                setNews(newsRes.data);
            } catch (err) {
                console.error("Lỗi lấy dữ liệu:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Stats />

            {/* Phần Programs */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our Programs</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programs.map(p => (
                        <ProgramCard key={p.id} program={p} />
                    ))}
                </div>
            </section>
            <CampusLife/>
            {/*Latest News*/}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Latest News</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {news.map(n => (
                        <News key={n.id} news={n} />
                    ))}
                </div>
            </section>
            <Contact />
        </div>
    );
}

export default App;