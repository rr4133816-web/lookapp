import type { Professional } from "@/types";

export const professionals: Professional[] = [
  {
    id: "p-01",
    name: "Amara Okafor",
    avatar: "/assets/generated/avatar-01.dim_512x512.jpg",
    profession: "Cloud Solutions Architect",
    category: "it",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviewCount: 214,
    location: "Austin, TX",
    timezone: "CST",
    yearsExperience: 11,
    startingPrice: 145,
    responseTime: "under 1 hour",
    completedJobs: 486,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    bio: "I design and migrate production workloads onto AWS and Azure for teams that have outgrown their first architecture. Most of my engagements start with a cost and reliability audit, then move into a phased migration plan your engineers can actually execute.",
    languages: ["English", "Igbo"],
    services: [
      {
        id: "s-01-1",
        name: "Cloud Architecture Audit",
        description:
          "A full review of your current infrastructure with a prioritised remediation roadmap and cost forecast.",
        price: 420,
        durationMinutes: 90,
        popular: true,
      },
      {
        id: "s-01-2",
        name: "Migration Strategy Session",
        description:
          "Hands-on planning for moving a specific workload to the cloud, including rollback and cutover steps.",
        price: 260,
        durationMinutes: 60,
      },
      {
        id: "s-01-3",
        name: "Kubernetes Readiness Review",
        description:
          "Assess whether your services are ready for Kubernetes and what to change before you commit.",
        price: 320,
        durationMinutes: 75,
      },
    ],
    portfolio: [
      {
        id: "pf-01-1",
        title: "Fintech platform migration",
        description:
          "Moved a 40-service payments platform to multi-region ECS with zero customer-visible downtime.",
        image: "/assets/generated/portfolio-cloud.dim_960x640.jpg",
      },
      {
        id: "pf-01-2",
        title: "Cost reduction programme",
        description:
          "Cut monthly cloud spend by 38% across three business units without reducing capacity.",
        image: "/assets/generated/portfolio-analytics.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-01-1",
        title: "AWS Solutions Architect Professional",
        issuer: "Amazon Web Services",
        year: 2022,
      },
      {
        id: "c-01-2",
        title: "Certified Kubernetes Administrator",
        issuer: "CNCF",
        year: 2021,
      },
    ],
    reviewIds: ["r-01", "r-02"],
  },
  {
    id: "p-02",
    name: "Daniel Whitfield",
    avatar: "/assets/generated/avatar-02.dim_512x512.jpg",
    profession: "Full-Stack Engineer",
    category: "it",
    verified: true,
    topRated: false,
    rating: 4.8,
    reviewCount: 168,
    location: "Denver, CO",
    timezone: "MST",
    yearsExperience: 8,
    startingPrice: 120,
    responseTime: "under 2 hours",
    completedJobs: 312,
    availability: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    bio: "I build and rescue React and Node applications. Half my work is greenfield product development, the other half is stepping into a codebase that has stalled and getting it shipping again.",
    languages: ["English"],
    services: [
      {
        id: "s-02-1",
        name: "Codebase Rescue Review",
        description:
          "A structured read of your repository with a prioritised list of what is blocking delivery.",
        price: 240,
        durationMinutes: 60,
        popular: true,
      },
      {
        id: "s-02-2",
        name: "Feature Build Sprint",
        description:
          "A focused build session on one well-scoped feature, delivered as a reviewed pull request.",
        price: 380,
        durationMinutes: 120,
      },
    ],
    portfolio: [
      {
        id: "pf-02-1",
        title: "Marketplace checkout rebuild",
        description:
          "Replaced a fragile checkout with a tested flow, lifting completed orders by 22%.",
        image: "/assets/generated/portfolio-code.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-02-1",
        title: "Meta Front-End Developer Professional",
        issuer: "Meta",
        year: 2020,
      },
    ],
    reviewIds: ["r-03"],
  },
  {
    id: "p-03",
    name: "Priya Raghunathan",
    avatar: "/assets/generated/avatar-03.dim_512x512.jpg",
    profession: "Application Security Engineer",
    category: "it",
    verified: true,
    topRated: true,
    rating: 5.0,
    reviewCount: 97,
    location: "Seattle, WA",
    timezone: "PST",
    yearsExperience: 9,
    startingPrice: 165,
    responseTime: "under 3 hours",
    completedJobs: 154,
    availability: ["Mon", "Wed", "Fri"],
    bio: "I run threat models and penetration tests for product teams preparing for enterprise security reviews. You leave with a findings report your engineers can act on, not a wall of scanner output.",
    languages: ["English", "Tamil"],
    services: [
      {
        id: "s-03-1",
        name: "Threat Model Workshop",
        description:
          "A collaborative session mapping your attack surface and agreeing the controls that matter.",
        price: 480,
        durationMinutes: 120,
        popular: true,
      },
      {
        id: "s-03-2",
        name: "Web Application Penetration Test",
        description:
          "Manual testing of your web app with a written report and a remediation call.",
        price: 890,
        durationMinutes: 240,
      },
    ],
    portfolio: [
      {
        id: "pf-03-1",
        title: "SOC 2 readiness programme",
        description:
          "Took a 60-person SaaS company from no security programme to a clean SOC 2 Type II.",
        image: "/assets/generated/portfolio-security.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-03-1",
        title: "Offensive Security Certified Professional",
        issuer: "OffSec",
        year: 2019,
      },
      { id: "c-03-2", title: "CISSP", issuer: "ISC2", year: 2021 },
    ],
    reviewIds: ["r-04"],
  },
  {
    id: "p-04",
    name: "Marcus Delgado",
    avatar: "/assets/generated/avatar-04.dim_512x512.jpg",
    profession: "Certified Public Accountant",
    category: "accounting",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviewCount: 231,
    location: "Chicago, IL",
    timezone: "CST",
    yearsExperience: 14,
    startingPrice: 110,
    responseTime: "under 4 hours",
    completedJobs: 604,
    availability: ["Mon", "Tue", "Wed", "Thu"],
    bio: "I work with owner-operated businesses on bookkeeping, quarterly estimates and year-end filings. My clients tend to be between one and forty employees and want a straight answer about what they owe.",
    languages: ["English", "Spanish"],
    services: [
      {
        id: "s-04-1",
        name: "Small Business Tax Review",
        description:
          "A line-by-line review of your return before filing, with planning notes for next year.",
        price: 340,
        durationMinutes: 90,
        popular: true,
      },
      {
        id: "s-04-2",
        name: "Monthly Bookkeeping Setup",
        description:
          "Chart of accounts, reconciliation workflow and a clean opening balance in your accounting software.",
        price: 290,
        durationMinutes: 120,
      },
      {
        id: "s-04-3",
        name: "Quarterly Estimate Consultation",
        description:
          "A short session to calculate and schedule your quarterly estimated payments.",
        price: 150,
        durationMinutes: 45,
      },
    ],
    portfolio: [
      {
        id: "pf-04-1",
        title: "Restaurant group restructuring",
        description:
          "Reorganised four entities into a single filing structure, saving $41k in the first year.",
        image: "/assets/generated/portfolio-finance.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-04-1",
        title: "Certified Public Accountant",
        issuer: "Illinois Board of Examiners",
        year: 2012,
      },
      {
        id: "c-04-2",
        title: "Chartered Global Management Accountant",
        issuer: "AICPA",
        year: 2016,
      },
    ],
    reviewIds: ["r-05", "r-06"],
  },
  {
    id: "p-05",
    name: "Hannah Lindqvist",
    avatar: "/assets/generated/avatar-05.dim_512x512.jpg",
    profession: "Forensic Accountant",
    category: "accounting",
    verified: true,
    topRated: false,
    rating: 4.7,
    reviewCount: 64,
    location: "Boston, MA",
    timezone: "EST",
    yearsExperience: 10,
    startingPrice: 175,
    responseTime: "under 6 hours",
    completedJobs: 88,
    availability: ["Tue", "Thu", "Fri"],
    bio: "I trace where money went. Most of my work is dispute support, internal investigations and reconstructing records when the bookkeeping has fallen apart.",
    languages: ["English", "Swedish"],
    services: [
      {
        id: "s-05-1",
        name: "Financial Records Reconstruction",
        description:
          "Rebuild a defensible set of accounts from incomplete or unreliable records.",
        price: 520,
        durationMinutes: 150,
        popular: true,
      },
      {
        id: "s-05-2",
        name: "Dispute Support Consultation",
        description:
          "Review of the financial evidence in a commercial dispute and a written summary of findings.",
        price: 380,
        durationMinutes: 90,
      },
    ],
    portfolio: [
      {
        id: "pf-05-1",
        title: "Partnership dispute analysis",
        description:
          "Reconstructed three years of commingled accounts, supporting a settlement within six weeks.",
        image: "/assets/generated/portfolio-finance.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-05-1",
        title: "Certified Fraud Examiner",
        issuer: "ACFE",
        year: 2018,
      },
    ],
    reviewIds: ["r-07"],
  },
  {
    id: "p-06",
    name: "Tomasz Kowalski",
    avatar: "/assets/generated/avatar-06.dim_512x512.jpg",
    profession: "Mechanical Design Engineer",
    category: "engineering",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviewCount: 142,
    location: "Detroit, MI",
    timezone: "EST",
    yearsExperience: 13,
    startingPrice: 135,
    responseTime: "under 3 hours",
    completedJobs: 267,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    bio: "I take products from concept sketch to manufacturable CAD. My background is consumer hardware and light industrial equipment, and I care a great deal about parts that can actually be made.",
    languages: ["English", "Polish"],
    services: [
      {
        id: "s-06-1",
        name: "Design for Manufacture Review",
        description:
          "A manufacturability pass on your CAD with tolerance, material and cost recommendations.",
        price: 360,
        durationMinutes: 90,
        popular: true,
      },
      {
        id: "s-06-2",
        name: "Concept to CAD Package",
        description:
          "Turn a concept sketch into a parametric CAD model ready for prototyping.",
        price: 640,
        durationMinutes: 180,
      },
    ],
    portfolio: [
      {
        id: "pf-06-1",
        title: "Modular enclosure system",
        description:
          "Designed a tool-free enclosure family that cut assembly time by 30%.",
        image: "/assets/generated/portfolio-engineering.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-06-1",
        title: "Professional Engineer (Mechanical)",
        issuer: "NCEES",
        year: 2015,
      },
      {
        id: "c-06-2",
        title: "Certified SolidWorks Professional",
        issuer: "Dassault Systèmes",
        year: 2013,
      },
    ],
    reviewIds: ["r-08"],
  },
  {
    id: "p-07",
    name: "Aisha Rahman",
    avatar: "/assets/generated/avatar-07.dim_512x512.jpg",
    profession: "Electrical Systems Engineer",
    category: "engineering",
    verified: true,
    topRated: false,
    rating: 4.8,
    reviewCount: 76,
    location: "Phoenix, AZ",
    timezone: "MST",
    yearsExperience: 7,
    startingPrice: 125,
    responseTime: "under 5 hours",
    completedJobs: 119,
    availability: ["Mon", "Wed", "Fri", "Sat"],
    bio: "I design power distribution and control systems for commercial fit-outs and small industrial sites. I can review an existing single-line diagram or produce one from scratch.",
    languages: ["English", "Urdu"],
    services: [
      {
        id: "s-07-1",
        name: "Electrical Load Assessment",
        description:
          "Calculate demand, verify capacity and document what your panel can safely support.",
        price: 300,
        durationMinutes: 90,
        popular: true,
      },
      {
        id: "s-07-2",
        name: "Control Panel Design Review",
        description:
          "Review of a control panel design against code and maintainability requirements.",
        price: 340,
        durationMinutes: 75,
      },
    ],
    portfolio: [
      {
        id: "pf-07-1",
        title: "Warehouse power upgrade",
        description:
          "Redesigned distribution for a 60,000 sq ft facility to support a new conveyor line.",
        image: "/assets/generated/portfolio-engineering.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-07-1",
        title: "Professional Engineer (Electrical)",
        issuer: "NCEES",
        year: 2020,
      },
    ],
    reviewIds: ["r-09"],
  },
  {
    id: "p-08",
    name: "Sofia Marchetti",
    avatar: "/assets/generated/avatar-08.dim_512x512.jpg",
    profession: "Licensed Architect",
    category: "architecture",
    verified: true,
    topRated: true,
    rating: 5.0,
    reviewCount: 118,
    location: "Portland, OR",
    timezone: "PST",
    yearsExperience: 16,
    startingPrice: 190,
    responseTime: "under 4 hours",
    completedJobs: 203,
    availability: ["Tue", "Wed", "Thu"],
    bio: "I design residential and small commercial buildings with a focus on daylight and durable materials. I handle permit sets end to end and enjoy the unglamorous detailing that makes a building last.",
    languages: ["English", "Italian"],
    services: [
      {
        id: "s-08-1",
        name: "Concept Design Consultation",
        description:
          "Site review, massing options and a clear brief for your project before you commit to drawings.",
        price: 450,
        durationMinutes: 120,
        popular: true,
      },
      {
        id: "s-08-2",
        name: "Permit Set Review",
        description:
          "Technical review of your drawing set against local code before submission.",
        price: 380,
        durationMinutes: 90,
      },
    ],
    portfolio: [
      {
        id: "pf-08-1",
        title: "Hillside residence",
        description:
          "A 2,400 sq ft home on a steep lot, permitted first submission with no revisions.",
        image: "/assets/generated/portfolio-architecture.dim_960x640.jpg",
      },
      {
        id: "pf-08-2",
        title: "Adaptive reuse studio",
        description:
          "Converted a 1920s warehouse bay into a daylight-filled design studio.",
        image: "/assets/generated/portfolio-interior.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-08-1",
        title: "Licensed Architect",
        issuer: "Oregon Board of Architect Examiners",
        year: 2011,
      },
      {
        id: "c-08-2",
        title: "LEED Accredited Professional",
        issuer: "USGBC",
        year: 2014,
      },
    ],
    reviewIds: ["r-10", "r-11"],
  },
  {
    id: "p-09",
    name: "Elias Bergström",
    avatar: "/assets/generated/avatar-09.dim_512x512.jpg",
    profession: "Interior Architect",
    category: "architecture",
    verified: false,
    topRated: false,
    rating: 4.6,
    reviewCount: 52,
    location: "Minneapolis, MN",
    timezone: "CST",
    yearsExperience: 6,
    startingPrice: 140,
    responseTime: "under 8 hours",
    completedJobs: 71,
    availability: ["Mon", "Thu", "Fri"],
    bio: "I work on interiors for homes and hospitality spaces — spatial planning, material palettes and lighting. I like projects where the budget is real and the constraints are interesting.",
    languages: ["English", "Swedish"],
    services: [
      {
        id: "s-09-1",
        name: "Space Planning Session",
        description:
          "Rework a floor plan for better flow, storage and light, with two layout options.",
        price: 280,
        durationMinutes: 90,
        popular: true,
      },
      {
        id: "s-09-2",
        name: "Material & Finish Palette",
        description:
          "A coordinated palette of finishes, fixtures and paint colours for your space.",
        price: 220,
        durationMinutes: 60,
      },
    ],
    portfolio: [
      {
        id: "pf-09-1",
        title: "Boutique hotel lobby",
        description:
          "Replanned a 1,200 sq ft lobby around a central lounge, doubling usable seating.",
        image: "/assets/generated/portfolio-interior.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-09-1",
        title: "NCIDQ Certification",
        issuer: "CIDQ",
        year: 2021,
      },
    ],
    reviewIds: ["r-12"],
  },
  {
    id: "p-10",
    name: "Dr. Nadia Haddad",
    avatar: "/assets/generated/avatar-10.dim_512x512.jpg",
    profession: "Registered Dietitian",
    category: "healthcare",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviewCount: 187,
    location: "Miami, FL",
    timezone: "EST",
    yearsExperience: 12,
    startingPrice: 95,
    responseTime: "under 2 hours",
    completedJobs: 421,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    bio: "I help people manage metabolic conditions and build eating habits that survive a busy week. Every plan starts from your actual routine, not an idealised one.",
    languages: ["English", "Arabic", "French"],
    services: [
      {
        id: "s-10-1",
        name: "Initial Nutrition Assessment",
        description:
          "A full review of your history, labs and goals, ending with a written plan you can follow.",
        price: 180,
        durationMinutes: 75,
        popular: true,
      },
      {
        id: "s-10-2",
        name: "Follow-Up Coaching Session",
        description:
          "Review progress, adjust the plan and work through the obstacles that came up.",
        price: 110,
        durationMinutes: 45,
      },
    ],
    portfolio: [
      {
        id: "pf-10-1",
        title: "Type 2 diabetes programme",
        description:
          "A 12-week cohort programme that brought 78% of participants into target range.",
        image: "/assets/generated/portfolio-health.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-10-1",
        title: "Registered Dietitian Nutritionist",
        issuer: "Commission on Dietetic Registration",
        year: 2014,
      },
      {
        id: "c-10-2",
        title: "Certified Diabetes Care and Education Specialist",
        issuer: "CBDCE",
        year: 2018,
      },
    ],
    reviewIds: ["r-13", "r-14"],
  },
  {
    id: "p-11",
    name: "Owen Fitzgerald",
    avatar: "/assets/generated/avatar-11.dim_512x512.jpg",
    profession: "Physiotherapist",
    category: "healthcare",
    verified: true,
    topRated: false,
    rating: 4.8,
    reviewCount: 143,
    location: "Nashville, TN",
    timezone: "CST",
    yearsExperience: 9,
    startingPrice: 105,
    responseTime: "under 3 hours",
    completedJobs: 356,
    availability: ["Tue", "Wed", "Thu", "Sat"],
    bio: "I treat sports and repetitive-strain injuries with a heavy emphasis on loading programmes you can do at home. Expect an assessment, a diagnosis in plain language and a plan with dates.",
    languages: ["English"],
    services: [
      {
        id: "s-11-1",
        name: "Injury Assessment & Treatment",
        description:
          "Hands-on assessment, treatment and a staged rehabilitation plan for your injury.",
        price: 160,
        durationMinutes: 60,
        popular: true,
      },
      {
        id: "s-11-2",
        name: "Return-to-Sport Screening",
        description:
          "Objective testing to confirm you are ready to return to training or competition.",
        price: 130,
        durationMinutes: 45,
      },
    ],
    portfolio: [
      {
        id: "pf-11-1",
        title: "Marathon return programme",
        description:
          "Guided a club runner from stress fracture to a personal best in eleven months.",
        image: "/assets/generated/portfolio-health.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-11-1",
        title: "Licensed Physical Therapist",
        issuer: "Tennessee Board of Physical Therapy",
        year: 2017,
      },
      {
        id: "c-11-2",
        title: "Certified Strength and Conditioning Specialist",
        issuer: "NSCA",
        year: 2019,
      },
    ],
    reviewIds: ["r-15"],
  },
  {
    id: "p-12",
    name: "Grace Chen",
    avatar: "/assets/generated/avatar-12.dim_512x512.jpg",
    profession: "Mathematics Tutor",
    category: "tutoring",
    verified: true,
    topRated: true,
    rating: 5.0,
    reviewCount: 264,
    location: "San Jose, CA",
    timezone: "PST",
    yearsExperience: 10,
    startingPrice: 85,
    responseTime: "under 1 hour",
    completedJobs: 892,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    bio: "I tutor calculus, linear algebra and competition mathematics. My students tend to arrive frustrated and leave able to explain the reasoning out loud, which is the only test of understanding I trust.",
    languages: ["English", "Mandarin"],
    services: [
      {
        id: "s-12-1",
        name: "Calculus Tutoring Session",
        description:
          "One-to-one work on the topics you are stuck on, with practice problems set afterwards.",
        price: 95,
        durationMinutes: 60,
        popular: true,
      },
      {
        id: "s-12-2",
        name: "Exam Preparation Intensive",
        description:
          "A focused block covering past papers, timing strategy and the topics that cost you marks.",
        price: 210,
        durationMinutes: 120,
      },
    ],
    portfolio: [
      {
        id: "pf-12-1",
        title: "AP Calculus cohort",
        description:
          "Twelve students, eleven scoring a 5 and one a 4, from a school with no prior AP maths.",
        image: "/assets/generated/portfolio-tutoring.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-12-1",
        title: "California Teaching Credential (Mathematics)",
        issuer: "CTC",
        year: 2016,
      },
      {
        id: "c-12-2",
        title: "MSc Applied Mathematics",
        issuer: "Stanford University",
        year: 2014,
      },
    ],
    reviewIds: ["r-16", "r-17"],
  },
  {
    id: "p-13",
    name: "Julien Moreau",
    avatar: "/assets/generated/avatar-13.dim_512x512.jpg",
    profession: "Language & Exam Coach",
    category: "tutoring",
    verified: false,
    topRated: false,
    rating: 4.7,
    reviewCount: 89,
    location: "New York, NY",
    timezone: "EST",
    yearsExperience: 8,
    startingPrice: 75,
    responseTime: "under 4 hours",
    completedJobs: 214,
    availability: ["Mon", "Wed", "Fri", "Sun"],
    bio: "I coach French and English exam candidates, mostly for DELF, DALF and IELTS. Sessions are conversational but structured, and you get written feedback after every one.",
    languages: ["English", "French"],
    services: [
      {
        id: "s-13-1",
        name: "Conversation Practice",
        description:
          "Structured speaking practice with corrections and vocabulary notes sent afterwards.",
        price: 80,
        durationMinutes: 45,
        popular: true,
      },
      {
        id: "s-13-2",
        name: "IELTS Writing Feedback",
        description:
          "Detailed marking of two essays against the official band descriptors.",
        price: 120,
        durationMinutes: 60,
      },
    ],
    portfolio: [
      {
        id: "pf-13-1",
        title: "DELF B2 preparation",
        description:
          "Coached 30 candidates over two years with a 93% pass rate at first attempt.",
        image: "/assets/generated/portfolio-tutoring.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-13-1",
        title: "DELF Examiner Accreditation",
        issuer: "France Éducation International",
        year: 2019,
      },
    ],
    reviewIds: ["r-18"],
  },
  {
    id: "p-14",
    name: "Isabella Rossi",
    avatar: "/assets/generated/avatar-14.dim_512x512.jpg",
    profession: "Brand & Identity Designer",
    category: "design",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviewCount: 176,
    location: "Brooklyn, NY",
    timezone: "EST",
    yearsExperience: 11,
    startingPrice: 155,
    responseTime: "under 2 hours",
    completedJobs: 298,
    availability: ["Tue", "Wed", "Thu", "Fri"],
    bio: "I build identity systems for companies that have outgrown their first logo. The work is strategy first — positioning, naming territory, then the visual system that carries it.",
    languages: ["English", "Italian"],
    services: [
      {
        id: "s-14-1",
        name: "Brand Strategy Workshop",
        description:
          "A guided session to define positioning, audience and the story your identity must tell.",
        price: 520,
        durationMinutes: 150,
        popular: true,
      },
      {
        id: "s-14-2",
        name: "Logo & Identity Review",
        description:
          "A critique of your current identity with concrete directions for improvement.",
        price: 240,
        durationMinutes: 60,
      },
    ],
    portfolio: [
      {
        id: "pf-14-1",
        title: "Fintech rebrand",
        description:
          "A full identity system rolled out across product, marketing and print in nine weeks.",
        image: "/assets/generated/portfolio-design.dim_960x640.jpg",
      },
      {
        id: "pf-14-2",
        title: "Specialty coffee packaging",
        description:
          "A flexible label system for twelve single-origin roasts on one print budget.",
        image: "/assets/generated/portfolio-brand.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-14-1",
        title: "BFA Graphic Design",
        issuer: "Rhode Island School of Design",
        year: 2013,
      },
    ],
    reviewIds: ["r-19", "r-20"],
  },
  {
    id: "p-15",
    name: "Kenji Nakamura",
    avatar: "/assets/generated/avatar-15.dim_512x512.jpg",
    profession: "Product Designer",
    category: "design",
    verified: true,
    topRated: false,
    rating: 4.8,
    reviewCount: 121,
    location: "San Francisco, CA",
    timezone: "PST",
    yearsExperience: 9,
    startingPrice: 165,
    responseTime: "under 3 hours",
    completedJobs: 187,
    availability: ["Mon", "Tue", "Thu", "Fri"],
    bio: "I design interfaces for complex software — dashboards, admin tools, anything with more data than screen. I prototype in code so the handoff is a working reference, not a picture.",
    languages: ["English", "Japanese"],
    services: [
      {
        id: "s-15-1",
        name: "Product UX Audit",
        description:
          "A heuristic and flow review of your product with prioritised, testable recommendations.",
        price: 420,
        durationMinutes: 120,
        popular: true,
      },
      {
        id: "s-15-2",
        name: "Design System Consultation",
        description:
          "Review your component library and agree the tokens, patterns and governance to adopt.",
        price: 380,
        durationMinutes: 90,
      },
    ],
    portfolio: [
      {
        id: "pf-15-1",
        title: "Analytics console redesign",
        description:
          "Restructured a dense reporting tool, cutting time-to-insight from minutes to seconds.",
        image: "/assets/generated/portfolio-design.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-15-1",
        title: "Nielsen Norman Group UX Certification",
        issuer: "NN/g",
        year: 2018,
      },
    ],
    reviewIds: ["r-21"],
  },
  {
    id: "p-16",
    name: "Robert Ellison",
    avatar: "/assets/generated/avatar-16.dim_512x512.jpg",
    profession: "Master Electrician",
    category: "home-services",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviewCount: 312,
    location: "Columbus, OH",
    timezone: "EST",
    yearsExperience: 22,
    startingPrice: 90,
    responseTime: "under 1 hour",
    completedJobs: 1_240,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    bio: "Twenty-two years on the tools, the last eight running my own crew. I do panel upgrades, EV charger installs and fault-finding that other electricians have given up on.",
    languages: ["English"],
    services: [
      {
        id: "s-16-1",
        name: "Electrical Fault Diagnosis",
        description:
          "Systematic fault-finding with a written explanation of the cause and the fix.",
        price: 140,
        durationMinutes: 60,
        popular: true,
      },
      {
        id: "s-16-2",
        name: "EV Charger Installation",
        description:
          "Supply and install a Level 2 home charger, including permit paperwork.",
        price: 780,
        durationMinutes: 240,
      },
      {
        id: "s-16-3",
        name: "Panel Upgrade Assessment",
        description:
          "Assess whether your panel supports your plans and quote the upgrade if it does not.",
        price: 120,
        durationMinutes: 45,
      },
    ],
    portfolio: [
      {
        id: "pf-16-1",
        title: "Whole-home rewire",
        description:
          "Rewired a 1940s house to current code while the family stayed in residence.",
        image: "/assets/generated/portfolio-home.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-16-1",
        title: "Master Electrician License",
        issuer: "Ohio Construction Industry Licensing Board",
        year: 2009,
      },
      {
        id: "c-16-2",
        title: "EVITP Certified",
        issuer: "Electric Vehicle Infrastructure Training Program",
        year: 2021,
      },
    ],
    reviewIds: ["r-22", "r-23"],
  },
  {
    id: "p-17",
    name: "Claire Beaumont",
    avatar: "/assets/generated/avatar-17.dim_512x512.jpg",
    profession: "Operations Consultant",
    category: "consulting",
    verified: true,
    topRated: true,
    rating: 4.9,
    reviewCount: 108,
    location: "Atlanta, GA",
    timezone: "EST",
    yearsExperience: 15,
    startingPrice: 210,
    responseTime: "under 5 hours",
    completedJobs: 164,
    availability: ["Tue", "Wed", "Thu"],
    bio: "I help growing companies fix the operational mess that success creates — unclear ownership, manual processes, reporting nobody trusts. I work in short engagements with measurable outcomes.",
    languages: ["English", "French"],
    services: [
      {
        id: "s-17-1",
        name: "Operations Diagnostic",
        description:
          "Map your core processes, find the bottlenecks and agree a prioritised fix list.",
        price: 620,
        durationMinutes: 180,
        popular: true,
      },
      {
        id: "s-17-2",
        name: "Process Redesign Sprint",
        description:
          "Redesign one critical process end to end, with owners, metrics and a rollout plan.",
        price: 540,
        durationMinutes: 150,
      },
    ],
    portfolio: [
      {
        id: "pf-17-1",
        title: "Order-to-cash overhaul",
        description:
          "Cut invoice-to-payment time from 47 days to 19 across a 200-person distributor.",
        image: "/assets/generated/portfolio-consulting.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-17-1",
        title: "Lean Six Sigma Black Belt",
        issuer: "ASQ",
        year: 2015,
      },
      {
        id: "c-17-2",
        title: "MBA, Operations",
        issuer: "Emory University",
        year: 2011,
      },
    ],
    reviewIds: ["r-24"],
  },
  {
    id: "p-18",
    name: "Maya Thompson",
    avatar: "/assets/generated/avatar-18.dim_512x512.jpg",
    profession: "Mindfulness & Performance Coach",
    category: "wellness",
    verified: true,
    topRated: false,
    rating: 4.8,
    reviewCount: 134,
    location: "Boulder, CO",
    timezone: "MST",
    yearsExperience: 8,
    startingPrice: 100,
    responseTime: "under 2 hours",
    completedJobs: 289,
    availability: ["Mon", "Tue", "Wed", "Sat", "Sun"],
    bio: "I coach people through burnout and sustained high-pressure work. Sessions combine practical recovery habits with attention training, and I keep the language free of jargon.",
    languages: ["English"],
    services: [
      {
        id: "s-18-1",
        name: "Burnout Recovery Session",
        description:
          "Assess where your energy is going and build a realistic recovery plan for the next month.",
        price: 150,
        durationMinutes: 75,
        popular: true,
      },
      {
        id: "s-18-2",
        name: "Focus & Attention Coaching",
        description:
          "Practical attention training for deep work, with a daily practice you can sustain.",
        price: 120,
        durationMinutes: 60,
      },
    ],
    portfolio: [
      {
        id: "pf-18-1",
        title: "Engineering team programme",
        description:
          "An eight-week resilience programme for a 40-person engineering org after a hard launch.",
        image: "/assets/generated/portfolio-wellness.dim_960x640.jpg",
      },
    ],
    credentials: [
      {
        id: "c-18-1",
        title: "Certified Professional Coach",
        issuer: "ICF",
        year: 2019,
      },
      {
        id: "c-18-2",
        title: "MBSR Teacher Certification",
        issuer: "Center for Mindfulness",
        year: 2021,
      },
    ],
    reviewIds: ["r-25"],
  },
];

export function getProfessional(id: string): Professional | undefined {
  return professionals.find((professional) => professional.id === id);
}

export function getProfessionalsByCategory(category: string): Professional[] {
  return professionals.filter(
    (professional) => professional.category === category,
  );
}
