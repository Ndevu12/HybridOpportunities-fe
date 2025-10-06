import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Home/HomePage";
import JobsPage from "./pages/Jobs/JobsPage";
import SingleJobPage from "./pages/Jobs/SingleJobPage";
import Auth from "./pages/Auth/Auth";
import ProfilePage from "./pages/profile/ProfilePage";
import UserJobsPage from "./pages/Jobs/userJobsPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import NotFound from "./pages/Auth/NotFound";
import ApplicantsPage from "./pages/Jobs/ApplicantsPage";
import { JobsProvider } from "./context/jobs/JobsContext";

const App: React.FC = () => {
  return (
    <JobsProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:jobId" element={<SingleJobPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/jobs/:jobId/applicants"
                element={<ApplicantsPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/user/jobs" element={<UserJobsPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </JobsProvider>
  );
};

export default App;
