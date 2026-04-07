import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateResume from "./pages/CreateResume";
import EditResume from "./pages/EditResume";
import ResumeResult from "./ResumeResult";
import JobVacancies from "./pages/JobVacancies";
import InterviewPrep from "./pages/InterviewPrep";
import SavedJobs from "./pages/SavedJobs";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/edit" element={<EditResume />} />
        <Route path="/resume-result" element={<ResumeResult />} />
        <Route path="/jobs" element={<JobVacancies />} />
        <Route path="/interview" element={<InterviewPrep />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      </Routes>
    </Router>
  );
}

export default App;