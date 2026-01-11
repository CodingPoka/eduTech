import React from "react";
import { FaCertificate } from "react-icons/fa";

const MyCertificate = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <FaCertificate className="text-yellow-500" /> My Certificates
      </h1>
      <p className="text-gray-600">
        You have not earned any certificates yet. Keep learning to unlock them!
      </p>
      {/* List of certificates will be rendered here */}
    </div>
  );
};

export default MyCertificate;
