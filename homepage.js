import React, { useState, useEffect } from 'react';
import CareerCard from '../components/CareerCard';
import SearchBar from '../components/SearchBar';
import { fetchPopularCareers } from '../services/careerService';

const HomePage = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const data = await fetchPopularCareers();
        setCareers(data);
      } catch (error) {
        console.error('Error loading careers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCareers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Choose Your Career</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover your perfect career path with AI-powered guidance
        </p>
        <SearchBar />
        <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
          Discover Your Path
        </button>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
          Popular Career Paths
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career) => (
              <CareerCard key={career._id} career={career} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-blue-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">AI-Powered Guidance</h3>
            <p className="text-gray-600">
              Get personalized career recommendations based on your skills and interests.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">Growth Insights</h3>
            <p className="text-gray-600">
              Understand career trajectories with our AI-generated growth charts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">Free Resources</h3>
            <p className="text-gray-600">
              Access curated free courses and learning materials for your chosen path.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;