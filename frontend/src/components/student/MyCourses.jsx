import React from "react";
import { FaBookOpen } from "react-icons/fa";

const MyCourses = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <FaBookOpen className="text-green-500" /> My Courses
      </h1>
      <p className="text-gray-600">
        You are not enrolled in any courses yet.
      </p>
      {/* List of enrolled courses will be rendered here */}
    </div>
  );
};

export default MyCourses;
