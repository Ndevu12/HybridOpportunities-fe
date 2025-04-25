import { logo } from "../src/assets/images/images";

export const dummyJobData = {
  id: "job-12345",
  company: {
    name: "Tech Innovators Inc.",
    website: "www.techinnovators.com",
    logo: logo,
    logoBackground: "#1E90FF",
  },
  postedAt: "2025-04-15",
  contract: "Full Time",
  position: "Senior Software Engineer",
  location: "San Francisco, CA (Remote Available)",
  salary: "$120,000 - $150,000",
  description: "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for developing high-quality applications, collaborating with cross-functional teams, and mentoring junior developers.",
  shortDescription: "Lead development of cutting-edge applications while mentoring junior engineers in a collaborative team.",
  qualifications: {
    content: "Qualifications & Required Skills:",
    items: [
      "5+ years of experience in software development",
      "Proficiency in JavaScript, React, and Node.js",
      "Strong understanding of RESTful APIs and web services",
      "Experience with cloud platforms such as AWS or Azure",
      "Bachelor's degree in Computer Science or related field (or equivalent experience)",
      "Strong problem-solving and analytical thinking skills",
      "Excellent communication and collaboration abilities",
    ],
  },
  responsibilities: {
    content: "Responsibilities:",
    items: [
      "Designing and developing high-quality software applications",
      "Collaborating with product managers and designers",
      "Writing clean, maintainable code and conducting code reviews",
      "Mentoring junior developers",
      "Participating in architectural discussions and technical planning",
      "Implementing best practices and coding standards",
    ],
  },
  benefits: {
    content: "Benefits:",
    items: [
      "Competitive salary",
      "Health insurance",
      "Flexible working hours",
      "Remote work options",
      "Professional development opportunities",
      "401(k) matching",
      "Generous paid time off",
    ],
  },
  status: "active",
  applicants: 12,
  applicationDeadline: "2025-05-30",
  applyUrl: "https://techinnovators.com/careers/apply",
};