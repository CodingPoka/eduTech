import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Fetch instructors from database
  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);

      // Fetch faculty data from Firebase Firestore users collection
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);

      // Filter only faculty members who are approved (isActive can be true or false)
      const facultyList = usersSnapshot.docs
        .filter(
          (doc) =>
            doc.data().role === "faculty" && doc.data().status === "approved"
        )
        .map((doc) => {
          const data = doc.data();
          // Handle expertise as string or array
          let expertiseArr = [];
          if (Array.isArray(data.expertise)) {
            expertiseArr = data.expertise;
          } else if (
            typeof data.expertise === "string" &&
            data.expertise.trim() !== ""
          ) {
            expertiseArr = [data.expertise];
          }
          return {
            id: doc.id,
            ...data,
            name:
              (data.fullName && data.fullName.trim()) ||
              (
                (data.firstName || "").trim() +
                " " +
                (data.lastName || "").trim()
              ).trim() ||
              "Unknown Name",
            title: data.highestQualification || "Instructor",
            specialty:
              data.specialization ||
              data.department ||
              data.expertise ||
              "General",
            image:
              data.photoURL ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            rating: data.rating || 4.5,
            students: data.students || data.totalStudents || 0,
            courses: data.courses || data.totalCourses || 0,
            bio: data.bio || "Experienced educator",
            expertise: expertiseArr,
          };
        });

      setInstructors(facultyList);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching instructors:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Meet Our Expert Instructors
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Learn from industry professionals and experienced educators
              passionate about your success
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Instructors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {instructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedInstructor(instructor)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Specialty Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {instructor.specialty}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors text-center">
                      {instructor.name}
                    </h3>
                    <p className="text-indigo-600 font-semibold mb-3 text-center">
                      {instructor.title}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for instructor details - rendered once, outside the grid */}
            {selectedInstructor && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    onClick={() => setSelectedInstructor(null)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedInstructor.image}
                      alt={selectedInstructor.name}
                      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-200"
                    />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                      {selectedInstructor.name}
                    </h2>
                    <p className="text-indigo-600 font-semibold mb-2 text-center">
                      {selectedInstructor.title}
                    </p>
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow mb-4">
                      {selectedInstructor.specialty}
                    </div>
                    <p className="text-gray-700 text-base mb-4 text-center">
                      {selectedInstructor.bio}
                    </p>
                    {/* Show more details if available */}
                    {selectedInstructor.email && (
                      <p className="text-gray-500 text-sm mb-1">
                        <span className="font-semibold">Email:</span>{" "}
                        {selectedInstructor.email}
                      </p>
                    )}
                    {selectedInstructor.phone && (
                      <p className="text-gray-500 text-sm mb-1">
                        <span className="font-semibold">Phone:</span>{" "}
                        {selectedInstructor.phone}
                      </p>
                    )}
                    {selectedInstructor.expertise &&
                      selectedInstructor.expertise.length > 0 && (
                        <div className="mt-4 w-full">
                          <h4 className="font-semibold text-gray-800 mb-2 text-center">
                            Expertise
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {selectedInstructor.expertise.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {instructors.length === 0 && (
              <div className="text-center py-20">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300 mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No instructors found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Instructor;
