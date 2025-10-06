import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dummyJobData } from "../../../DummyData/detailedJob";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";
import Button from "../../components/atoms/Button/Button";
import Typography from "../../components/atoms/Typography/Typography";
import Badge from "../../components/atoms/Badge/Badge";
import Icon from "../../components/atoms/Icon/Icon";
import Spinner from "../../components/atoms/Spinner/Spinner";
import Card from "../../components/molecules/Card/Card";
import Navigation from "../../components/organisms/Navigation/Navigation";
import JobsContext from "../../context/jobs/JobsContext";

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const SingleJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applyText, setApplyText] = useState("Apply Now");
  const [btnDisable, setBtnDisable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // Use JobsContext instead of direct API calls
  const { getJobById, isLoading: contextLoading } = useContext(JobsContext);

  // Fetch job data using JobsContext
  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) return;

      try {
        setLoading(true);
        const job = await getJobById(jobId);
        if (job) {
          setJobData(job);
        } else {
          toast.error("Failed to fetch job data");
          setJobData(dummyJobData);
        }
      } catch (error) {
        toast.error("Something went wrong, Try again!");
        setJobData(dummyJobData);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId, getJobById]);

  // Company website handler
  const companyWebsiteHandler = () => {
    const website = jobData?.company?.website;
    const formattedWebsite = website?.startsWith("http")
      ? website
      : `https://${website}`;
    window.open(formattedWebsite, "_blank", "noopener,noreferrer");
  };

  // Check if user has already applied
  useEffect(() => {
    const fetchAccountInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await fetch(`${API_BASE_URL}/account/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const account = (await response.json()).account;
            const hasApplied = jobData?.appliedJobs?.some(
              (appliedJob: any) => appliedJob.userId === account._id
            );
            if (hasApplied) {
              setApplyText("Applied");
            }
          }
        } catch (error) {
          toast.error("Error fetching account info");
        }
      }
      setBtnDisable(false);
    };

    if (jobData) {
      fetchAccountInfo();
    }
  }, [jobData]);

  // Apply now button handler
  const applyNowHandler = () => {
    const token = localStorage.getItem("token");
    const local_token = localStorage.getItem("local_token");
    if (!token && !local_token) {
      toast.info("Login is required");
      navigate("/auth?type=login");
      return;
    } else if (local_token) {
      toast.error("Login using local data is not supported for this feature.");
      return;
    }
    setIsModalOpen(true);
  };

  // Use existing CV
  const handleUseProfileCV = async () => {
    setIsModalOpen(false);
    const token = localStorage.getItem("token");
    if (!jobData?._id) {
      toast.error("Job ID is missing");
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/jobs/${jobData._id}/apply/existing`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        toast.success("Successfully applied for the job");
        setApplyText("Applied");
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message === "Your CV not found"
            ? errorData.message + ". Upload CV to apply."
            : errorData.message
        );
      }
    } catch (error) {
      const local_token = localStorage.getItem("local_token");
      if (local_token) {
        const appliedJobs = JSON.parse(
          localStorage.getItem("appliedJobs") || "[]"
        );
        appliedJobs.push({ jobId: jobData.id, method: "profileCV" });
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
        toast.info("Job application stored locally");
      }
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Upload new CV
  const handleUploadCV = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const token = localStorage.getItem("token");
    if (!jobData?._id) {
      toast.error("Job ID is missing");
      return;
    }
    const formData = new FormData();
    formData.append("cv", selectedFile);

    try {
      const response = await fetch(
        `${API_BASE_URL}/jobs/${jobData._id}/apply/new`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Successfully applied for the job");
        setApplyText("Applied");
      } else {
        throw new Error("Failed to apply for the job");
      }
    } catch (error) {
      toast.error("Failed to apply for this job. Try again later.");
      const appliedJobs = JSON.parse(
        localStorage.getItem("appliedJobs") || "[]"
      );
      appliedJobs.push({
        jobId: jobData._id || jobData.id,
        method: "uploadedCV",
        fileName: selectedFile.name,
      });
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      toast.success("Successfully applied for the job (stored locally)");
      setApplyText("Applied");
    } finally {
      setIsModalOpen(false);
    }
  };

  // Format date to relative time
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  };

  if (loading || contextLoading) {
    return (
      <>
        <Navigation />
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner size="xl" color="primary" />
          <Typography variant="body1" color="textSecondary" className="mt-4">
            Loading job details...
          </Typography>
        </div>
      </>
    );
  }

  if (!jobData) {
    return (
      <>
        <Navigation />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-red-100 p-4 rounded-full">
            <Icon name="error" color="secondary" size="lg" />
          </div>
          <Typography variant="h5" color="error" className="mt-4">
            Error loading job
          </Typography>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/jobs")}
          >
            Back to Jobs
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-neutral-50 min-h-screen py-8">
        <div className="container-fluid max-w-4xl mx-auto px-4">
          {/* Company Header Card */}
          <Card elevation="md" className="mb-8 overflow-visible">
            <div className="flex flex-col md:flex-row items-center">
              {/* Company Logo */}
              <div
                className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-lg -mt-12 md:-mt-0 md:rounded-l-lg md:rounded-r-none mb-4 md:mb-0 shadow-md md:shadow-none"
                style={{
                  backgroundColor:
                    jobData?.company?.logoBackground || "#f0f0f0",
                }}
              >
                {jobData?.company?.logo ? (
                  <img
                    src={jobData.company.logo}
                    alt={`${jobData.company.name} logo`}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                ) : (
                  <Typography variant="h2" weight="bold" color="white">
                    {jobData?.company?.name?.charAt(0)}
                  </Typography>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-grow text-center md:text-left md:ml-6">
                <Typography variant="h4" weight="bold" gutterBottom>
                  {jobData?.company?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {jobData?.company?.website && (
                    <span
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={companyWebsiteHandler}
                    >
                      {jobData.company.website
                        .replace(/^https?:\/\/(www\.)?/, "")
                        .replace(/\/$/, "")}
                    </span>
                  )}
                </Typography>
              </div>

              {/* Company Site Button */}
              <div className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  onClick={companyWebsiteHandler}
                  leftIcon={<Icon name="language" />}
                >
                  Company Site
                </Button>
              </div>
            </div>
          </Card>

          {/* Job Details Card */}
          <Card elevation="md" className="mb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(jobData?.postedAt)}
                  </Typography>
                  <span className="mx-2 text-neutral-400">•</span>
                  <Typography variant="body2" color="textSecondary">
                    {jobData?.contract}
                  </Typography>
                </div>

                <Typography variant="h4" weight="bold" gutterBottom>
                  {jobData?.position}
                </Typography>

                <div className="flex items-center mb-4">
                  <Icon
                    name="location_on"
                    size="sm"
                    color="primary"
                    className="mr-1"
                  />
                  <Typography variant="body2" weight="medium" color="primary">
                    {jobData?.location}
                  </Typography>
                </div>
              </div>

              <Button
                variant="primary"
                className="md:self-start mt-4 md:mt-0"
                disabled={btnDisable || applyText === "Applied"}
                onClick={applyNowHandler}
              >
                {applyText}
              </Button>
            </div>

            <Typography variant="body1" className="mb-6">
              {jobData?.description}
            </Typography>

            {/* Qualifications Section */}
            {jobData?.qualifications?.items?.length > 0 && (
              <div className="mb-6">
                <Typography variant="h5" weight="bold" gutterBottom>
                  Qualifications & Skills
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {jobData?.qualifications?.content}
                </Typography>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  {jobData?.qualifications?.items?.map(
                    (item: string, index: number) => (
                      <li key={`qual-${index}`} className="text-neutral-700">
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Responsibilities Section */}
            {jobData?.responsibilities?.items?.length > 0 && (
              <div className="mb-6">
                <Typography variant="h5" weight="bold" gutterBottom>
                  Responsibilities
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {jobData?.responsibilities?.content}
                </Typography>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  {jobData?.responsibilities?.items?.map(
                    (item: string, index: number) => (
                      <li key={`resp-${index}`} className="text-neutral-700">
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Benefits Section */}
            {jobData?.benefits?.items?.length > 0 && (
              <div className="mb-6">
                <Typography variant="h5" weight="bold" gutterBottom>
                  Benefits
                </Typography>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <ul className="list-disc list-inside space-y-2">
                    {jobData?.benefits?.items?.map(
                      (item: string, index: number) => (
                        <li key={`benefit-${index}`} className="text-blue-700">
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </Card>

          {/* Apply Now Footer */}
          <Card
            elevation="sm"
            className="bg-gradient-primary text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <Typography
                  variant="h5"
                  weight="bold"
                  color="white"
                  gutterBottom
                >
                  Interested in this position?
                </Typography>
                <Typography variant="body2" color="white">
                  Apply now and join the {jobData?.company?.name} team!
                </Typography>
              </div>
              <Button
                variant={applyText === "Applied" ? "neutral" : "primary"}
                disabled={btnDisable || applyText === "Applied"}
                onClick={applyNowHandler}
                size="lg"
              >
                {applyText}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={true}
        contentLabel="Apply for Job"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl max-w-md w-full z-50 outline-none"
        overlayClassName="fixed inset-0 bg-neutral-900 bg-opacity-75 z-40"
      >
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-0 mt-0 mr-0 text-neutral-500 hover:text-neutral-700"
            aria-label="Close modal"
          >
            <Icon name="close" />
          </button>

          <Typography variant="h4" weight="bold" gutterBottom>
            Apply for {jobData?.position}
          </Typography>

          <div className="border-b border-neutral-200 my-4"></div>

          <Typography variant="body1" gutterBottom className="mb-6">
            How would you like to apply for this position?
          </Typography>

          <div className="space-y-4">
            <Button
              variant="outline"
              isFullWidth
              leftIcon={<Icon name="description" />}
              onClick={handleUseProfileCV}
            >
              Use CV from Profile
            </Button>

            <Button
              variant="outline"
              isFullWidth
              leftIcon={<Icon name="upload" />}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Upload New CV
            </Button>
          </div>

          <input
            type="file"
            id="file-upload"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center">
                <Icon name="file_present" color="primary" className="mr-2" />
                <Typography variant="body2" weight="medium">
                  {selectedFile.name}
                </Typography>
              </div>

              <Button
                variant="primary"
                isFullWidth
                className="mt-4"
                onClick={handleUploadCV}
              >
                Upload CV & Apply
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SingleJobPage;
