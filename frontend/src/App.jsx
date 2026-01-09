import React from "react";
import Home from "./components/Home";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Testimonial from "./components/Testimonial";
import Courses from "./components/Courses";
import PopularCategories from "./components/PopularCategories";
import Hcourses from "./components/Hcourses";
import StudentLogin from "./components/student/StudentLogin";
import StudentRegister from "./components/student/StudentRegister";
import FacultyLogin from "./components/faculty/FacultyLogin";
import FacultyRegister from "./components/faculty/FacultyRegister";
import FacultyNavbar from "./components/faculty/FacutlyNavbar";
import FacultyDashboard from "./components/faculty/FacultyDashboard";
import FacultyProfile from "./components/faculty/FacutlyProfile";
import FacultyAddCourse from "./components/faculty/FacultyAddCourse";
import FacultyMyCourses from "./components/faculty/FacultyMyCourses";
import FacultyEditCourse from "./components/faculty/FacultyEditCourse";
import CourseDetail from "./components/CourseDetail";
import ScourseDetails from "./components/ScourseDetails";
import AdminLogin from "./components/admin/AdminLogin";
import AdminProfile from "./components/admin/AdminProfile";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminFooter from "./components/admin/AdminFooter";
import ManageStudent from "./components/admin/ManageStudent";
import ManageFaculty from "./components/admin/ManageFaculty";
import ManageCourse from "./components/admin/ManageCourse";
import PendingApprovals from "./components/admin/PendingApprovals";
import LiveCount from "./components/LiveCount";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <Home />
        </div>
        <PopularCategories />
        <Hcourses />
        <LiveCount />
        <Footer />
      </div>
    ),
  },
  {
    path: "/course/:id",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <ScourseDetails />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/courses",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <Courses />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <About />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/contact",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <Contact />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/testimonial",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <Testimonial />
        </div>
        <Footer />
      </div>
    ),
  },

  {
    path: "/student/login",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <StudentLogin />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/student/register",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <StudentRegister />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/faculty/login",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <FacultyLogin />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/faculty/register",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <FacultyRegister />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/faculty/dashboard",
    element: (
      <div className="min-h-screen flex flex-col">
        <FacultyNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <FacultyDashboard />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/faculty/profile",
    element: (
      <div className="min-h-screen flex flex-col">
        <FacultyNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <FacultyProfile />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/faculty/add-course",
    element: (
      <div className="min-h-screen flex flex-col">
        <FacultyNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <FacultyAddCourse />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/faculty/my-courses",
    element: (
      <div className="min-h-screen flex flex-col">
        <FacultyNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <FacultyMyCourses />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/faculty/course/:id",
    element: (
      <div className="min-h-screen flex flex-col">
        <FacultyNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <CourseDetail />
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/faculty/course/:id/edit",
    element: (
      <div className="min-h-screen flex flex-col">
        <FacultyNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <FacultyEditCourse />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <div>
        <Navbar />
        <div className="pt-[160px] sm:pt-[150px] lg:pt-[140px]">
          <AdminLogin />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <AdminProfile />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <AdminDashboard />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/admin/manage-students",
    element: (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <ManageStudent />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/admin/manage-faculty",
    element: (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <ManageFaculty />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/admin/pending-approvals",
    element: (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <PendingApprovals />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/admin/manage-courses",
    element: (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 lg:ml-64 pt-16 pb-16">
            <div className="p-6">
              <ManageCourse />
            </div>
          </div>
        </div>
      </div>
    ),
  },
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
