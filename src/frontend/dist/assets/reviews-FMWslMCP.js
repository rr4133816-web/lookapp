const reviews = [
  {
    id: "r-01",
    professionalId: "p-01",
    authorName: "Victor Salinas",
    authorAvatar: "/assets/generated/avatar-02.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-14",
    serviceName: "Cloud Architecture Audit",
    comment: "Amara found three single points of failure we had been living with for two years. The remediation roadmap was ordered by risk and cost, which made it easy to get budget approved.",
    helpful: 24
  },
  {
    id: "r-02",
    professionalId: "p-01",
    authorName: "Dana Whitmore",
    authorAvatar: "/assets/generated/avatar-05.dim_512x512.jpg",
    rating: 5,
    date: "2026-07-02",
    serviceName: "Migration Strategy Session",
    comment: "We came in with a vague plan to move to the cloud and left with a phased cutover, a rollback plan and a cost model. Worth every dollar.",
    helpful: 17
  },
  {
    id: "r-03",
    professionalId: "p-02",
    authorName: "Priyanka Shah",
    authorAvatar: "/assets/generated/avatar-03.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-21",
    serviceName: "Codebase Rescue Review",
    comment: "Daniel read our repository properly before the call and arrived with a list. We shipped the first fix the same week.",
    helpful: 12
  },
  {
    id: "r-04",
    professionalId: "p-03",
    authorName: "Gregory Nolan",
    authorAvatar: "/assets/generated/avatar-06.dim_512x512.jpg",
    rating: 5,
    date: "2026-06-30",
    serviceName: "Threat Model Workshop",
    comment: "Priya ran the workshop with our whole engineering team and kept it practical. We left with a threat model we still use in design reviews.",
    helpful: 31
  },
  {
    id: "r-05",
    professionalId: "p-04",
    authorName: "Lena Fischer",
    authorAvatar: "/assets/generated/avatar-09.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-09",
    serviceName: "Small Business Tax Review",
    comment: "Marcus caught a deduction our previous accountant had missed for three years running. Calm, clear and completely unhurried.",
    helpful: 28
  },
  {
    id: "r-06",
    professionalId: "p-04",
    authorName: "Andre Boateng",
    authorAvatar: "/assets/generated/avatar-11.dim_512x512.jpg",
    rating: 4,
    date: "2026-05-18",
    serviceName: "Monthly Bookkeeping Setup",
    comment: "Solid setup and a clean chart of accounts. I would have liked a short written guide to go with the handover, but the work itself was excellent.",
    helpful: 9
  },
  {
    id: "r-07",
    professionalId: "p-05",
    authorName: "Miriam Osei",
    authorAvatar: "/assets/generated/avatar-01.dim_512x512.jpg",
    rating: 5,
    date: "2026-07-27",
    serviceName: "Financial Records Reconstruction",
    comment: "Hannah rebuilt four years of records from a shoebox of receipts and spreadsheets. The summary she produced held up in mediation.",
    helpful: 15
  },
  {
    id: "r-08",
    professionalId: "p-06",
    authorName: "Peter Lindgren",
    authorAvatar: "/assets/generated/avatar-09.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-03",
    serviceName: "Design for Manufacture Review",
    comment: "Tomasz cut our part count by a third and the tooling quote dropped accordingly. He explains the reasoning behind every change.",
    helpful: 22
  },
  {
    id: "r-09",
    professionalId: "p-07",
    authorName: "Rosa Delgado",
    authorAvatar: "/assets/generated/avatar-04.dim_512x512.jpg",
    rating: 5,
    date: "2026-06-11",
    serviceName: "Electrical Load Assessment",
    comment: "Aisha documented exactly what our panel could support and what it could not. The report went straight into our permit application.",
    helpful: 11
  },
  {
    id: "r-10",
    professionalId: "p-08",
    authorName: "Thomas Reyes",
    authorAvatar: "/assets/generated/avatar-16.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-17",
    serviceName: "Concept Design Consultation",
    comment: "Sofia walked the site with us and produced three massing options in a week. She talked us out of the expensive one, which we appreciated.",
    helpful: 26
  },
  {
    id: "r-11",
    professionalId: "p-08",
    authorName: "Ingrid Halvorsen",
    authorAvatar: "/assets/generated/avatar-05.dim_512x512.jpg",
    rating: 5,
    date: "2026-04-29",
    serviceName: "Permit Set Review",
    comment: "Our set passed first submission. Sofia's markup caught two code issues the drafter had missed entirely.",
    helpful: 19
  },
  {
    id: "r-12",
    professionalId: "p-09",
    authorName: "Noor Al-Amin",
    authorAvatar: "/assets/generated/avatar-10.dim_512x512.jpg",
    rating: 4,
    date: "2026-07-14",
    serviceName: "Space Planning Session",
    comment: "Elias reworked our awkward living space and it finally makes sense. Communication was a little slow over one weekend but the result was worth it.",
    helpful: 8
  },
  {
    id: "r-13",
    professionalId: "p-10",
    authorName: "Samuel Adeyemi",
    authorAvatar: "/assets/generated/avatar-16.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-25",
    serviceName: "Initial Nutrition Assessment",
    comment: "Dr. Haddad built the plan around my shift work instead of asking me to change my whole life. First time a diet plan has actually stuck.",
    helpful: 34
  },
  {
    id: "r-14",
    professionalId: "p-10",
    authorName: "Beatrice Lam",
    authorAvatar: "/assets/generated/avatar-12.dim_512x512.jpg",
    rating: 5,
    date: "2026-06-05",
    serviceName: "Follow-Up Coaching Session",
    comment: "Six months in and my numbers are the best they have been in a decade. She is direct and genuinely kind about it.",
    helpful: 21
  },
  {
    id: "r-15",
    professionalId: "p-11",
    authorName: "Callum Fraser",
    authorAvatar: "/assets/generated/avatar-06.dim_512x512.jpg",
    rating: 5,
    date: "2026-07-19",
    serviceName: "Injury Assessment & Treatment",
    comment: "Owen diagnosed in one session what two previous clinics had missed. The loading programme was boring and it worked.",
    helpful: 18
  },
  {
    id: "r-16",
    professionalId: "p-12",
    authorName: "Mei-Ling Zhou",
    authorAvatar: "/assets/generated/avatar-03.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-28",
    serviceName: "Calculus Tutoring Session",
    comment: "My daughter went from dreading calculus to explaining it to her classmates. Grace is patient without ever being condescending.",
    helpful: 41
  },
  {
    id: "r-17",
    professionalId: "p-12",
    authorName: "Robert Ellison",
    authorAvatar: "/assets/generated/avatar-16.dim_512x512.jpg",
    rating: 5,
    date: "2026-05-22",
    serviceName: "Exam Preparation Intensive",
    comment: "Two sessions before the exam and my son scored a 5. The past-paper strategy alone was worth the fee.",
    helpful: 27
  },
  {
    id: "r-18",
    professionalId: "p-13",
    authorName: "Fatima Nasser",
    authorAvatar: "/assets/generated/avatar-07.dim_512x512.jpg",
    rating: 5,
    date: "2026-06-24",
    serviceName: "Conversation Practice",
    comment: "Julien corrects without interrupting the flow, which is exactly what I needed. The written notes after each session are excellent.",
    helpful: 13
  },
  {
    id: "r-19",
    professionalId: "p-14",
    authorName: "Oliver Grant",
    authorAvatar: "/assets/generated/avatar-11.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-11",
    serviceName: "Brand Strategy Workshop",
    comment: "Isabella spent the first hour asking questions nobody had asked us before. The identity that came out of it finally sounds like us.",
    helpful: 29
  },
  {
    id: "r-20",
    professionalId: "p-14",
    authorName: "Sara Lindqvist",
    authorAvatar: "/assets/generated/avatar-05.dim_512x512.jpg",
    rating: 5,
    date: "2026-05-30",
    serviceName: "Logo & Identity Review",
    comment: "A generous, specific critique with three clear directions. No vague design-speak, just useful observations.",
    helpful: 16
  },
  {
    id: "r-21",
    professionalId: "p-15",
    authorName: "Hiroshi Tanaka",
    authorAvatar: "/assets/generated/avatar-15.dim_512x512.jpg",
    rating: 5,
    date: "2026-07-08",
    serviceName: "Product UX Audit",
    comment: "Kenji prototyped the fix rather than describing it, which ended the internal debate immediately. Rare and valuable.",
    helpful: 23
  },
  {
    id: "r-22",
    professionalId: "p-16",
    authorName: "Angela Ruiz",
    authorAvatar: "/assets/generated/avatar-08.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-19",
    serviceName: "Electrical Fault Diagnosis",
    comment: "Two other electricians could not find the intermittent fault. Robert found it in forty minutes and explained exactly why it happened.",
    helpful: 37
  },
  {
    id: "r-23",
    professionalId: "p-16",
    authorName: "David Okonkwo",
    authorAvatar: "/assets/generated/avatar-01.dim_512x512.jpg",
    rating: 5,
    date: "2026-06-16",
    serviceName: "EV Charger Installation",
    comment: "Tidy work, permit handled, and he walked me through the app setup before leaving. Exactly what you want from a tradesperson.",
    helpful: 25
  },
  {
    id: "r-24",
    professionalId: "p-17",
    authorName: "Helena Voss",
    authorAvatar: "/assets/generated/avatar-09.dim_512x512.jpg",
    rating: 5,
    date: "2026-07-31",
    serviceName: "Operations Diagnostic",
    comment: "Claire mapped our order process in a single afternoon and found the handoff that was costing us a week per order. Measurable improvement within a month.",
    helpful: 20
  },
  {
    id: "r-25",
    professionalId: "p-18",
    authorName: "Nathan Brooks",
    authorAvatar: "/assets/generated/avatar-02.dim_512x512.jpg",
    rating: 5,
    date: "2026-08-06",
    serviceName: "Burnout Recovery Session",
    comment: "Maya gave me a plan I could actually follow on a bad week. No jargon, no judgement, just practical steps that helped.",
    helpful: 30
  }
];
function getReviewsForProfessional(professionalId) {
  return reviews.filter((review) => review.professionalId === professionalId);
}
export {
  getReviewsForProfessional as g,
  reviews as r
};
