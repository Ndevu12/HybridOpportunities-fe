import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JobForm from "../../components/Froms/JobForm";
import { Job } from "../../lib/job";
import { truncateText } from "../../utils/truncateText";
import { jwtDecode } from "jwt-decode";
import useJobsContext from "../../context/jobs/JobsContext";

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

export type ArrayKeys =
  | "requirements"
  | "qualifications"
  | "responsibilities"
  | "skills"
  | "benefits"
  | "role";

const UserJobsPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { jobs, fetchJobs, fetchJobById, postJob, updateJobStatus } =
    useJobsContext();
  const [activeTab, setActiveTab] = useState("postedJobs");
  const [userPostedJobs, setUserPostedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<Job>({
    position: "",
    description: "",
    company: {
      name: "",
      logo: "",
      website: "",
      logoBackground: "",
    },
    contract: "",
    location: "",
    status: "open",
    requirements: { content: "", items: [""] },
    qualifications: { content: "", items: [""] },
    responsibilities: { content: "", items: [""] },
    skills: { content: "", items: [""] },
    benefits: { content: "", items: [""] },
    role: { content: "", items: [""] },
  });
  const [appliedJobsDetails, setAppliedJobsDetails] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth?type=login");
      return;
    }

    // Use the fetchJobs from JobsContext instead of direct API call
    fetchJobs();
  }, [isLoggedIn, navigate, fetchJobs]);

  // Filter jobs for the current user once jobs are loaded
  useEffect(() => {
    if (jobs.length > 0) {
      const token = localStorage.getItem("token");
      if (token) {
        // Decode the token to get the userId
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        // Filter jobs posted by the current user
        const userJobs = jobs.filter((job) => job.postedBy === userId);
        setUserPostedJobs(userJobs);
      }
    }
  }, [jobs]);

  const fetchAccountInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token to get the userId
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await fetch(`${API_BASE_URL}/account/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const account = (await response.json()).account;
          const appliedJobs = account.appliedJobs || [];
          setAppliedJobs(appliedJobs);
        } else {
          toast.error("Error fetching account info");
        }
      } catch (error) {
        toast.error("Error fetching account info");
      }
    }
  };

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const appliedJobsDetails: Job[] = [];
        for (const jobId of appliedJobs.map((job) => job.jobId)) {
          // Use fetchJobById from context instead of direct API call
          const job = await fetchJobById(jobId);
          if (job) {
            appliedJobsDetails.push(job);
          }
        }
        setAppliedJobsDetails(appliedJobsDetails);
      } catch (error) {
        toast.error("Something went wrong, Try again!");
      }
    };

    if (appliedJobs.length > 0) {
      fetchAppliedJobs();
    }
  }, [appliedJobs, fetchJobById]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const nameParts: string[] = name.split(".");

    if (nameParts.length === 2) {
      setNewJob((prevState) => ({
        ...prevState,
        [nameParts[0]]: {
          ...(prevState[nameParts[0] as keyof Job] as any),
          [nameParts[1]]: value,
        },
      }));
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  const handleArrayInputChange = (
    arrayName: ArrayKeys,
    index: number,
    value: string
  ) => {
    setNewJob((prevState) => {
      const updatedArray = [...prevState[arrayName].items];
      updatedArray[index] = value;
      return {
        ...prevState,
        [arrayName]: { ...prevState[arrayName], items: updatedArray },
      };
    });
  };

  const addArrayItem = (arrayName: ArrayKeys) => {
    setNewJob((prevState) => {
      const updatedArray = [...prevState[arrayName].items, ""];
      return {
        ...prevState,
        [arrayName]: { ...prevState[arrayName], items: updatedArray },
      };
    });
  };

  const removeArrayItem = (arrayName: ArrayKeys, index: number) => {
    setNewJob((prevState) => {
      const updatedArray = prevState[arrayName].items.filter(
        (_, i) => i !== index
      );
      return {
        ...prevState,
        [arrayName]: { ...prevState[arrayName], items: updatedArray },
      };
    });
  };

  const defaultJobKey = () => {
    return `${Math.random().toString(36).substr(2, 9)}`;
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        company: {
          name: newJob.company.name,
          website: newJob.company.website,
          logo: newJob.company.logo,
          logoBackground: "#FFFFFF",
        },
        contract: newJob.contract,
        position: newJob.position,
        location: newJob.location,
        description: newJob.description,
        requirements: newJob.requirements,
        qualifications: newJob.qualifications,
        responsibilities: newJob.responsibilities,
        skills: newJob.skills,
        benefits: newJob.benefits,
        role: newJob.role,
        status: newJob.status,
        appliedJobs: [],
      };

      // Use postJob from context instead of direct API call
      const success = await postJob(jobData);

      if (success) {
        toast.success("Job posted successfully");
        setNewJob({
          position: "",
          description: "",
          company: {
            name: "",
            logo: "",
            website: "",
            logoBackground: "",
          },
          contract: "",
          location: "",
          status: "open",
          requirements: { content: "", items: [""] },
          qualifications: { content: "", items: [""] },
          responsibilities: { content: "", items: [""] },
          skills: { content: "", items: [""] },
          benefits: { content: "", items: [""] },
          role: { content: "", items: [""] },
        });
        // Refresh jobs list
        fetchJobs();
      } else {
        toast.error("Failed to post job");
      }
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  const handleJobStatusChange = async (jobId: string, newStatus: string) => {
    try {
      // Use updateJobStatus from context instead of direct API call
      const success = await updateJobStatus(jobId, newStatus);

      if (success) {
        toast.success("Job status updated successfully");
        // Update local state to reflect the change
        setUserPostedJobs(
          userPostedJobs.map((job) =>
            job._id === jobId ? { ...job, status: newStatus } : job
          )
        );
      } else {
        toast.error("Failed to update job status");
      }
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  const handleViewApplicants = (jobId: string) => {
    navigate(`/jobs/${jobId}/applicants`);
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="className='mt-7 mb-7 p-6 rounded-lg mx-auto max-w-4xl">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Jobs Page</h1>
      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "postedJobs"
                ? "bg-blue-400 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("postedJobs")}
          >
            Posted Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "appliedJobs"
                ? "bg-blue-400 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("appliedJobs")}
          >
            Applied Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "postJob" ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("postJob")}
          >
            Post New Job
          </button>
        </div>
        {activeTab === "postedJobs" && (
          <div className="mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Jobs Statistics</h2>
            {userPostedJobs.length > 0 ? (
              <ul>
                {userPostedJobs.map((job) => (
                  <li
                    key={defaultJobKey()}
                    className="mb-4 border p-4 rounded cursor-pointer"
                    onClick={() => handleJobClick(job._id || "")}
                  >
                    <div className="flex items-center rounded mb-4">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-16 h-16 rounded mr-4"
                        style={{ backgroundColor: job.company.logoBackground }}
                      />
                      <div>
                        <p>
                          <strong>Company:</strong> {job.company.name}
                        </p>
                        <p>
                          <strong>Website:</strong>{" "}
                          <a
                            href={job.company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job.company.website}
                          </a>
                        </p>
                      </div>
                    </div>
                    <p>
                      <strong>Title:</strong> {job.position}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Posted At:</strong> {job.postedAt}
                    </p>
                    <p>
                      <strong>Contract:</strong> {job.contract}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {truncateText(job.description, 150)}
                    </p>
                    <p>
                      <strong>Status:</strong> {job.status}
                    </p>
                    <button
                      onClick={() =>
                        handleJobStatusChange(
                          job._id!,
                          job.status === "open" ? "closed" : "open"
                        )
                      }
                      className="bg-primary text-white px-4 py-2 rounded mt-2"
                    >
                      {job.status === "open" ? "Close Job" : "Reopen Job"}
                    </button>
                    <button
                      onClick={() => handleViewApplicants(job._id!)}
                      className="bg-success text-white px-4 py-2 rounded mt-2 ml-2"
                    >
                      View Applicants
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs posted yet.</p>
            )}
          </div>
        )}
        {activeTab === "appliedJobs" && (
          <div className="mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
            {appliedJobsDetails.length > 0 ? (
              <ul>
                {appliedJobsDetails.map((job) => (
                  <li key={job._id} className="mb-4 border p-4 rounded">
                    <div className="flex items-center mb-4">
                      <img
                        src={job?.company?.logo}
                        alt={job?.company?.name}
                        className="w-16 h-16 mr-4"
                        style={{
                          backgroundColor: job?.company?.logoBackground,
                        }}
                      />
                      <div>
                        <p>
                          <strong>Company:</strong> {job?.company?.name}
                        </p>
                        <p>
                          <strong>Website:</strong>{" "}
                          <a
                            href={job?.company?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job?.company?.website}
                          </a>
                        </p>
                      </div>
                    </div>
                    <p>
                      <strong>Title:</strong> {job?.position}
                    </p>
                    <p>
                      <strong>Location:</strong> {job?.location}
                    </p>
                    <p>
                      <strong>Posted At:</strong> {job?.postedAt}
                    </p>
                    <p>
                      <strong>Contract:</strong> {job?.contract}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {truncateText(job?.description, 150)}
                    </p>
                    <p>
                      <strong>Status:</strong> {job?.status}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs applied for yet.</p>
            )}
          </div>
        )}
        {activeTab === "postJob" && (
          <div className="mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
            <JobForm
              job={newJob}
              onChange={handleInputChange}
              onArrayChange={handleArrayInputChange}
              onAddArrayItem={addArrayItem}
              onRemoveArrayItem={removeArrayItem}
              onSubmit={handlePostJob}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserJobsPage;
