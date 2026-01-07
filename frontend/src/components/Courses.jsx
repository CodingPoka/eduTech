import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  FaBook,
  FaSpinner,
  FaClock,
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* Thumbnail with Level Badge */}
                <div className="relative overflow-hidden">
                  {course.thumbnailURL ? (
                    <img
                      src={course.thumbnailURL}
                      alt={course.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <FaBook className="text-6xl text-white opacity-50" />
                    </div>
                  )}

                  {/* Level Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg backdrop-blur-sm ${
                        course.level === "Beginner"
                          ? "bg-green-500/90"
                          : course.level === "Intermediate"
                          ? "bg-yellow-500/90"
                          : "bg-red-500/90"
                      }`}
                    >
                      {course.level || "Beginner"}
                    </span>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-indigo-600">
                      ${course.price || "49.99"}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                    {course.title}
                  </h3>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(course.rating || 4.5)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {course.rating || "4.5"}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({course.totalReviews || course.enrolledStudents || "120"}{" "}
                      reviews)
                    </span>
                  </div>

                  {/* Duration and Enrolled Students */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-indigo-600" />
                      <span className="text-sm font-medium">
                        {course.duration || "10"} weeks
                      </span>
                    </div>

                    {/* Enrolled Students */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaUserGraduate className="text-indigo-600" />
                      <span className="text-sm font-medium">
                        {course.enrolledStudents || "0"} enrolled
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    className="w-full mt-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    style={{ backgroundColor: "#E5590D" }}
                  >
                    View Details
                  </button>
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
