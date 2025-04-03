import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { generateCareerSuggestions } from '../services/aiService';

const GuidanceHub = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateCareerSuggestions({
        skills: skills.split(',').map(s => s.trim()),
        interests: interests.split(',').map(i => i.trim()),
        userId: user.id
      });
      setSuggestions(result);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Guidance Hub</h1>
      
      <section className="bg-blue-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Personalized Career Suggestions</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="skills" className="block text-gray-700 font-medium mb-2">
              Your Skills (comma separated)
            </label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="interests" className="block text-gray-700 font-medium mb-2">
              Your Interests (comma separated)
            </label>
            <input
              type="text"
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Get Career Suggestions'}
          </button>
          
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </section>

      {suggestions && (
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Your Career Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">{suggestion.career}</h3>
                <p className="text-gray-600 mb-4">{suggestion.description}</p>
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Match Score: </span>
                  <span className="font-bold text-orange-500">{suggestion.matchScore}%</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Why this career?</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {suggestion.reasons.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Next Steps:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {suggestion.nextSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/example1"
                title="Success Story 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">From Beginner to Tech Lead</h3>
              <p className="text-gray-600">
                John shares his journey from learning to code to becoming a tech lead at a major company.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/example2"
                title="Success Story 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Career Change Success</h3>
              <p className="text-gray-600">
                Sarah explains how she transitioned from marketing to data science in her 30s.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Expert Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/example3"
                title="Expert Interview 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">AI Industry Insights</h3>
              <p className="text-gray-600">
                Dr. Smith discusses the current state and future of AI careers.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/example4"
                title="Expert Interview 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Web Development Trends</h3>
              <p className="text-gray-600">
                Senior developer Maria talks about the most in-demand web development skills.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidanceHub;