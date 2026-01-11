import React from "react";
import { FaVial } from "react-icons/fa";

const Test = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <FaVial className="text-blue-500" /> Tests & Quizzes
      </h1>
      <p className="text-gray-600">
        No tests are available at this moment. Please check back later.
      </p>
      {/* List of available tests will be rendered here */}
    </div>
  );
};

export default Test;