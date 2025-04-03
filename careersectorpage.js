import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CareerGrowthChart from '../components/CareerGrowthChart';
import ResourceCard from '../components/ResourceCard';
import TestimonialCard from '../components/TestimonialCard';
import { fetchCareerDetails } from '../services/careerService';

const CareerSectorPage = () => {
  const { sector } = useParams();
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCareerData = async () => {
      try {
        const data = await fetchCareerDetails(sector);
        setCareerData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCareerData();
  }, [sector]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  if (!careerData) {
    return <div className="text-center py-8">No data available for this career sector.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-2 capitalize">{careerData.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{careerData.description}</p>
        <div className="flex flex-wrap gap-4 mb-8">
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
            {careerData.category}
          </span>
          <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full">
            {careerData.difficulty}
          </span>
          <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full">
            {careerData.jobGrowth} Job Growth
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Future Study Guidance</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {careerData.studyGuidance.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Future Scope</h2>
            <p className="text-gray-700 mb-4">{careerData.futureScope.description}</p>
            <div className="space-y-4">
              {careerData.futureScope.trends.map((trend, index) => (
                <div key={index} className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-blue-800">{trend.title}</h3>
                  <p className="text-gray-600">{trend.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Career Growth</h2>
            <div className="h-64">
              <CareerGrowthChart data={careerData.growthChart} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Related Jobs</h2>
            <div className="space-y-3">
              {careerData.relatedJobs.map((job, index) => (
                <a
                  key={index}
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-blue-50 p-3 rounded-lg transition"
                >
                  <h3 className="font-medium text-blue-700">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </a>
              ))}
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
              View More Jobs
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Expert Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerData.expertExperiences.map((experience, index) => (
            <TestimonialCard key={index} testimonial={experience} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Free Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerData.freeCourses.map((course, index) => (
            <ResourceCard key={index} resource={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerSectorPage;