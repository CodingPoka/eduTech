import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaBook, FaSpinner } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedCourses();
  }, []);

  const fetchApprovedCourses = async () => {
    try {
      setLoading(true);
      // Fetch all courses, then filter on client side
      // This allows showing approved courses + old courses without status field
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesList = coursesSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((course) => {
          // Show if: approved, OR active (old courses), OR no status field (very old courses)
          return (
            course.status === "approved" ||
            course.status === "active" ||
            !course.status
          );
        });
      setCourses(coursesList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Banner Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/courseImage/courses.jpg"
          alt="Our Courses"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="absolute inset-0 hidden items-center justify-center"
          style={{ background: "rgba(15, 13, 53, 0.9)" }}
        >
          <div className="text-center text-white px-4">
            <FaBook className="text-6xl mx-auto mb-4 opacity-30" />
          </div>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(15, 13, 53, 0.88)" }}
        >
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
              Our Courses
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light">
              Learn new skills with expert-led online courses
            </p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto p-6 py-16">
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                {course.thumbnailURL && (
                  <img
                    src={course.thumbnailURL}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-semibold">
                    {course.category}
                  </span>
                  <span className="text-gray-500 text-sm">{course.level}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No approved courses available yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
