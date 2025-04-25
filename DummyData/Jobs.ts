import { dummyLogo } from "../src/assets/images/images";
import { ContractType, ExperienceLevel, JobCategory, JobStatus } from "../src/lib/enums";
import { Job } from "../src/lib/job";
import { parseSalaryString } from "../src/utils/helpers";

export const mockJobsData: Job[] = [
    {
      id: "1",
      position: "Frontend Developer",
      postedAt: "2025-04-15",
      contract: ContractType.FULL_TIME,
      category: JobCategory.SOFTWARE_DEVELOPMENT,
      experienceLevel: ExperienceLevel.MID,
      location: "Remote",
      locationDetails: {
        isRemote: true,
        displayText: "Remote"
      },
      salary: "$80,000 - $100,000",
      salaryRange: parseSalaryString("$80,000 - $100,000"),
      description: "Join our team to build engaging user interfaces using React, TypeScript, and modern frontend technologies. Collaborate with designers and backend engineers to deliver exceptional user experiences.",
      shortDescription: "Create modern web interfaces using React and TypeScript in a collaborative environment.",
      company: {
        name: "CodeCraft Solutions",
        logo: dummyLogo,
        logoBackground: "#4A90E2",
        website: "https://codecraft.com"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "3+ years experience with React and TypeScript",
          "Strong knowledge of CSS/SCSS and responsive design principles",
          "Experience with testing frameworks like Jest and Cypress",
          "Understanding of state management solutions (Redux, Context API)",
          "Bachelor's degree in Computer Science or related field (or equivalent experience)",
          "Portfolio demonstrating frontend development skills"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Develop responsive, accessible user interfaces",
          "Collaborate with UX/UI designers to implement designs",
          "Write clean, maintainable code with proper documentation",
          "Optimize application performance for maximum speed",
          "Participate in code reviews and team discussions"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Competitive salary and benefits package",
          "Remote-friendly work environment",
          "Continuous learning opportunities",
          "Modern tech stack and tools"
        ]
      },
      applicationDeadline: "2025-05-20",
      applicants: 27,
      applyUrl: "https://codecraft.com/careers/frontend-developer",
      views: 432,
      clickThroughRate: 0.18,
      applicationRate: 0.062,
      keywords: ["React", "TypeScript", "Frontend", "UI/UX", "Web Development"],
      tags: ["React", "Remote", "Mid-Level"]
    },
    {
      id: "2",
      position: "Backend Developer",
      postedAt: "2025-04-17",
      contract: ContractType.FULL_TIME,
      category: JobCategory.SOFTWARE_DEVELOPMENT,
      experienceLevel: ExperienceLevel.SENIOR,
      location: "Kigali, Rwanda (Hybrid)",
      locationDetails: {
        city: "Kigali",
        country: "Rwanda",
        region: "East Africa",
        isRemote: false,
        displayText: "Kigali, Rwanda (Hybrid)"
      },
      salary: "$85,000 - $110,000",
      salaryRange: parseSalaryString("$85,000 - $110,000"),
      description: "Develop robust server-side applications using Node.js and Express. Design and implement RESTful APIs, optimize database performance, and ensure scalability of our growing platform.",
      shortDescription: "Build scalable backend systems and RESTful APIs using Node.js and Express.",
      company: {
        name: "DataFlow Systems",
        logo: dummyLogo,
        logoBackground: "#50C878",
        website: "https://dataflow.rw"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "4+ years experience with Node.js and Express",
          "Strong knowledge of MongoDB and SQL databases",
          "Experience designing and implementing RESTful APIs",
          "Familiarity with Docker and containerization",
          "Understanding of authentication and security best practices",
          "Bachelor's degree in Computer Science or equivalent experience"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Design and implement robust server-side applications",
          "Optimize database performance and data structures",
          "Develop secure, well-documented APIs",
          "Collaborate with frontend developers to integrate services", 
          "Implement efficient error handling and logging"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Health insurance and retirement plans",
          "Hybrid work arrangement",
          "Professional growth opportunities",
          "Team building events and activities"
        ]
      },
      applicationDeadline: "2025-05-15",
      applicants: 14,
      applyUrl: "https://dataflow.rw/jobs/backend-developer",
      views: 285,
      clickThroughRate: 0.15,
      applicationRate: 0.049,
      keywords: ["Node.js", "Express", "API", "Backend", "Database"],
      tags: ["Node.js", "Hybrid", "Senior-Level"]
    },
    {
      id: "3",
      position: "UX/UI Designer",
      postedAt: "2025-04-18",
      contract: "Part Time",
      location: "Remote",
      salary: "$50,000 - $70,000",
      description: "Create beautiful, intuitive designs for web and mobile applications. Work closely with product managers and developers to bring designs to life. Focus on user-centered design principles.",
      shortDescription: "Design intuitive user experiences for web and mobile applications.",
      company: {
        name: "Pixel Perfect Design",
        logo: dummyLogo,
        logoBackground: "#FF6B6B",
        website: "https://pixelperfect.design"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "3+ years of UX/UI design experience for digital products", 
          "Proficiency with Figma, Adobe XD, or similar design tools",
          "Strong portfolio demonstrating user-centered design approach",
          "Experience conducting user research and usability testing",
          "Knowledge of design systems and component libraries",
          "Understanding of accessibility standards and best practices"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Create wireframes, prototypes, and high-fidelity designs",
          "Collaborate with product managers to refine user requirements",
          "Conduct user research and translate findings into design solutions",
          "Work closely with developers during implementation",
          "Maintain and evolve our design system"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Flexible working hours",
          "Remote work options",
          "Access to design resources and tools",
          "Opportunities to attend design conferences"
        ]
      },
      applicationDeadline: "2025-05-30",
      applicants: 9,
      applyUrl: "https://pixelperfect.design/careers/ux-ui-designer",
      views: 198,
      clickThroughRate: 0.12,
      applicationRate: 0.045,
      keywords: ["UX Design", "UI Design", "Figma", "Prototyping", "User Research"],
      tags: ["Figma", "Remote", "Mid-Level"]
    },
    {
      id: "4",
      position: "DevOps Engineer",
      postedAt: "2025-04-20",
      contract: "Full Time",
      location: "Kigali, Rwanda",
      salary: "$90,000 - $120,000",
      description: "Implement and maintain CI/CD pipelines, manage cloud infrastructure, and optimize deployment processes. Ensure system reliability and security across all environments.",
      shortDescription: "Optimize deployment pipelines and manage cloud infrastructure for maximum reliability.",
      company: {
        name: "CloudStack Technologies",
        logo: dummyLogo,
        logoBackground: "#9B59B6",
        website: "https://cloudstack.tech"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "3+ years experience with AWS/Azure cloud infrastructure",
          "Strong knowledge of Kubernetes and container orchestration",
          "Experience with infrastructure as code tools (Terraform, CloudFormation)",
          "Proficiency with CI/CD pipelines (Jenkins, GitHub Actions)",
          "Linux system administration skills",
          "Understanding of security best practices for cloud environments"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Design, implement, and maintain CI/CD pipelines",
          "Manage cloud infrastructure and containerized environments",
          "Implement infrastructure as code and automation",
          "Monitor system performance and ensure reliability",
          "Collaborate with development teams to improve deployment processes"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Attractive salary and performance bonuses",
          "Comprehensive health coverage",
          "Training and certification programs",
          "Work-life balance initiatives"
        ]
      },
      applicationDeadline: "2025-05-25",
      applicants: 11,
      applyUrl: "https://cloudstack.tech/jobs/devops-engineer",
      views: 350,
      clickThroughRate: 0.2,
      applicationRate: 0.057,
      keywords: ["DevOps", "AWS", "CI/CD", "Kubernetes", "Terraform"],
      tags: ["AWS", "On-Site", "Mid-Level"]
    },
    {
      id: "5",
      position: "Data Scientist",
      postedAt: "2025-04-21",
      contract: "Full Time",
      location: "Hybrid (Musanze, Rwanda)",
      salary: "$95,000 - $125,000",
      description: "Apply statistical analysis and machine learning techniques to extract valuable insights from complex datasets. Develop models to predict customer behavior and optimize business operations.",
      shortDescription: "Turn complex data into actionable insights through machine learning and analytics.",
      company: {
        name: "DataMinds Analytics",
        logo: dummyLogo,
        logoBackground: "#3498DB",
        website: "https://dataminds.ai"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "Master's degree or PhD in Data Science, Statistics, or related field",
          "3+ years experience in applied data science or machine learning",
          "Strong programming skills in Python and SQL",
          "Experience with machine learning libraries (scikit-learn, TensorFlow)",
          "Knowledge of data visualization tools and techniques",
          "Ability to communicate complex findings to non-technical stakeholders"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Analyze complex datasets to extract actionable insights",
          "Develop and deploy machine learning models",
          "Create data visualizations and reports for stakeholders",
          "Collaborate with product and engineering teams",
          "Stay current with latest advancements in data science"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Competitive salary and equity options",
          "Flexible work hours and location",
          "Access to cutting-edge tools and technologies",
          "Support for attending industry conferences"
        ]
      },
      applicationDeadline: "2025-06-10",
      applicants: 19,
      applyUrl: "https://dataminds.ai/careers/data-scientist",
      views: 450,
      clickThroughRate: 0.22,
      applicationRate: 0.067,
      keywords: ["Data Science", "Machine Learning", "Python", "SQL", "Statistics"],
      tags: ["Python", "Remote", "Senior-Level"]
    },
    {
      id: "6",
      position: "Mobile App Developer",
      postedAt: "2025-04-22",
      contract: "Full Time",
      location: "Kigali - Gikondo",
      salary: "$75,000 - $95,000",
      description: "Build native and cross-platform mobile applications for iOS and Android devices. Focus on performance optimization, user experience, and offline functionality.",
      shortDescription: "Develop high-performance native and cross-platform mobile apps for iOS and Android.",
      company: {
        name: "AppWave Solutions",
        logo: dummyLogo,
        logoBackground: "#F39C12",
        website: "https://appwave.co"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "3+ years experience in mobile app development",
          "Proficiency in React Native, Swift, and Kotlin",
          "Experience with Firebase or similar backend services",
          "Understanding of mobile app design principles and guidelines",
          "Familiarity with App Store and Google Play submission processes",
          "Strong problem-solving skills and attention to detail"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Develop and maintain mobile applications for iOS and Android",
          "Optimize applications for maximum speed and scalability",
          "Implement new features and improve existing functionality",
          "Collaborate with cross-functional teams to define, design, and ship new features",
          "Ensure the performance, quality, and responsiveness of applications"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Salary commensurate with experience",
          "Health and wellness programs",
          "Professional development resources",
          "Dynamic and inclusive work environment"
        ]
      },
      applicationDeadline: "2025-05-20",
      applicants: 33,
      applyUrl: "https://appwave.co/jobs/mobile-developer",
      views: 512,
      clickThroughRate: 0.25,
      applicationRate: 0.075,
      keywords: ["Mobile Development", "iOS", "Android", "React Native", "Swift"],
      tags: ["React Native", "On-Site", "Mid-Level"]
    },
    {
      id: "7",
      position: "Product Manager",
      postedAt: "2025-04-23",
      contract: "Full Time",
      location: "Remote",
      salary: "$100,000 - $130,000",
      description: "Lead the development of innovative products from conception to launch. Define product vision, gather requirements, and collaborate with cross-functional teams to deliver exceptional user experiences.",
      shortDescription: "Guide product development from concept to launch with a focus on user needs.",
      company: {
        name: "Innovation Labs",
        logo: dummyLogo,
        logoBackground: "#2ECC71",
        website: "https://innovationlabs.tech"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "5+ years experience in product management or related field",
          "Strong understanding of software development lifecycle",
          "Experience with Agile methodologies and project management tools",
          "Excellent communication, presentation, and leadership skills",
          "Ability to analyze complex data and market trends",
          "Strong problem-solving skills and attention to detail"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Define product vision and roadmap",
          "Gather and prioritize product and customer requirements",
          "Collaborate with engineering, marketing, and sales teams",
          "Conduct market research and competitive analysis",
          "Drive product launches and manage post-launch performance"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Attractive salary and performance bonuses",
          "Comprehensive health coverage",
          "Training and development programs",
          "Flexible working conditions"
        ]
      },
      applicationDeadline: "2025-06-01",
      applicants: 8,
      applyUrl: "https://innovationlabs.tech/careers/product-manager",
      views: 150,
      clickThroughRate: 0.1,
      applicationRate: 0.03,
      keywords: ["Product Management", "Agile", "Market Research", "Leadership"],
      tags: ["Agile", "Remote", "Senior-Level"]
    },
    {
      id: "8",
      position: "QA Engineer",
      postedAt: "2025-04-24",
      contract: "Full Time",
      location: "Hybrid",
      salary: "$70,000 - $90,000",
      description: "Ensure software quality through comprehensive testing strategies. Design and implement automated tests, conduct manual testing, and collaborate with developers to resolve issues.",
      shortDescription: "Ensure product quality through automated testing and comprehensive QA processes.",
      company: {
        name: "Quality First Tech",
        logo: dummyLogo,
        logoBackground: "#E74C3C",
        website: "https://qualityfirst.tech"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "3+ years experience in software quality assurance",
          "Strong knowledge of testing methodologies and tools",
          "Experience with automated testing frameworks (Selenium, Cypress)",
          "Familiarity with bug tracking and test management tools",
          "Understanding of API testing and performance testing",
          "Bachelor's degree in Computer Science or related field"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Design and execute test plans, test cases, and test scripts",
          "Identify, record, and track software defects",
          "Collaborate with developers to reproduce and resolve issues",
          "Perform regression, integration, and system testing",
          "Ensure software is released with high quality and meets requirements"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Competitive salary and benefits package",
          "Flexible working hours",
          "Remote work options",
          "Access to training and development resources"
        ]
      },
      applicationDeadline: "2025-05-15",
      applicants: 22,
      applyUrl: "https://qualityfirst.tech/careers/qa-engineer",
      views: 378,
      clickThroughRate: 0.2,
      applicationRate: 0.055,
      keywords: ["QA", "Software Testing", "Automation", "Selenium", "Cypress"],
      tags: ["QA", "Hybrid", "Mid-Level"]
    },
    {
      id: "9",
      position: "Cybersecurity Analyst",
      postedAt: "2025-04-25",
      contract: "Full Time",
      location: "Kigali (On-site)",
      salary: "$85,000 - $115,000",
      description: "Protect organizational data and systems from security threats. Implement security measures, conduct vulnerability assessments, and respond to security incidents.",
      shortDescription: "Defend systems and data through security monitoring and incident response.",
      company: {
        name: "SecureNet Defenders",
        logo: dummyLogo,
        logoBackground: "#34495E",
        website: "https://securenet.defense"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "3+ years experience in cybersecurity or information security",
          "Strong knowledge of network security, firewalls, and VPNs",
          "Experience with security tools and technologies (SIEM, IDS/IPS)",
          "Familiarity with vulnerability assessment tools and techniques",
          "Understanding of incident response and disaster recovery",
          "Bachelor's degree in Cybersecurity, Information Technology, or related field"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Monitor network traffic for suspicious activities",
          "Conduct vulnerability assessments and penetration tests",
          "Respond to security incidents and breaches",
          "Implement and maintain security policies and procedures",
          "Provide security awareness training to employees"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Salary based on experience and qualifications",
          "Health and wellness benefits",
          "Opportunities for professional development",
          "Supportive and inclusive work environment"
        ]
      },
      applicationDeadline: "2025-05-30",
      applicants: 5,
      applyUrl: "https://securenet.defense/jobs/cyber-analyst",
      views: 220,
      clickThroughRate: 0.1,
      applicationRate: 0.025,
      keywords: ["Cybersecurity", "Network Security", "Incident Response", "SIEM"],
      tags: ["Cybersecurity", "On-Site", "Mid-Level"]
    },
    {
      id: "10",
      position: "Technical Writer",
      postedAt: "2025-04-26",
      contract: "Part Time",
      location: "Remote",
      salary: "$45,000 - $60,000",
      description: "Create clear, concise documentation for software products, APIs, and internal systems. Collaborate with developers to ensure accuracy and comprehensiveness of technical content.",
      shortDescription: "Transform complex technical concepts into clear, user-friendly documentation.",
      company: {
        name: "Clear Docs",
        logo: dummyLogo,
        logoBackground: "#1ABC9C",
        website: "https://cleardocs.io"
      },
      status: JobStatus.ACTIVE,
      qualifications: {
        content: "Qualifications & Required Skills:",
        items: [
          "3+ years experience in technical writing or related field",
          "Strong writing, editing, and proofreading skills",
          "Familiarity with software development and API documentation",
          "Proficiency in Markdown, HTML, and documentation tools",
          "Ability to understand complex technical concepts",
          "Bachelor's degree in Technical Communication, English, or related field"
        ]
      },
      responsibilities: {
        content: "Responsibilities:",
        items: [
          "Create and maintain user manuals, API documentation, and online help",
          "Collaborate with developers and product managers to gather information",
          "Ensure consistency and clarity in technical documentation",
          "Review and edit documentation produced by other team members",
          "Stay up-to-date with product changes and industry trends"
        ]
      },
      benefits: {
        content: "Benefits:",
        items: [
          "Competitive hourly rate",
          "Flexible working hours and location",
          "Access to company-sponsored training and development",
          "Opportunity to work with a talented and dynamic team"
        ]
      },
      applicationDeadline: "2025-06-15",
      applicants: 12,
      applyUrl: "https://cleardocs.io/careers/tech-writer",
      views: 160,
      clickThroughRate: 0.08,
      applicationRate: 0.02,
      keywords: ["Technical Writing", "Documentation", "API", "Markdown"],
      tags: ["Technical Writing", "Remote", "Part-Time"]
    }
];
