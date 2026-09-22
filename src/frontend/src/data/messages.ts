import type { Conversation } from "@/types";

export const conversations: Conversation[] = [
  {
    id: "cv-01",
    professionalId: "p-01",
    participantName: "Amara Okafor",
    participantAvatar: "/assets/generated/avatar-01.dim_512x512.jpg",
    participantRole: "Cloud Solutions Architect",
    lastMessage:
      "I have the audit template ready — send over the AWS bill when you can.",
    lastMessageAt: "2026-09-21T14:32:00",
    unread: 2,
    online: true,
    messages: [
      {
        id: "m-01-1",
        sender: "them",
        text: "Hi! Thanks for booking the architecture audit. Before we meet, could you share the current AWS bill and a rough service diagram?",
        timestamp: "2026-09-20T09:14:00",
      },
      {
        id: "m-01-2",
        sender: "me",
        text: "Morning Amara. I can export the bill today. The diagram is a bit out of date — we added a reporting cluster in June.",
        timestamp: "2026-09-20T09:41:00",
      },
      {
        id: "m-01-3",
        sender: "them",
        text: "That is useful to know. The reporting cluster is usually where the cost surprises live. Add it even if the diagram is rough.",
        timestamp: "2026-09-20T10:02:00",
      },
      {
        id: "m-01-4",
        sender: "me",
        text: "Will do. Anything else you need from our side?",
        timestamp: "2026-09-21T13:55:00",
      },
      {
        id: "m-01-5",
        sender: "them",
        text: "I have the audit template ready — send over the AWS bill when you can.",
        timestamp: "2026-09-21T14:32:00",
      },
    ],
  },
  {
    id: "cv-02",
    professionalId: "p-12",
    participantName: "Grace Chen",
    participantAvatar: "/assets/generated/avatar-12.dim_512x512.jpg",
    participantRole: "Mathematics Tutor",
    lastMessage: "Perfect. I will set two integration problems for Thursday.",
    lastMessageAt: "2026-09-21T11:08:00",
    unread: 0,
    online: true,
    messages: [
      {
        id: "m-02-1",
        sender: "me",
        text: "Hi Grace — my daughter is struggling with integration by parts specifically. Is that something we can focus on?",
        timestamp: "2026-09-19T18:20:00",
      },
      {
        id: "m-02-2",
        sender: "them",
        text: "Absolutely. It usually clicks once we slow down the choice of u and dv. Has she covered the tabular method yet?",
        timestamp: "2026-09-19T18:44:00",
      },
      {
        id: "m-02-3",
        sender: "me",
        text: "I do not think so. Her teacher moved quickly through that unit.",
        timestamp: "2026-09-20T08:10:00",
      },
      {
        id: "m-02-4",
        sender: "them",
        text: "Perfect. I will set two integration problems for Thursday.",
        timestamp: "2026-09-21T11:08:00",
      },
    ],
  },
  {
    id: "cv-03",
    professionalId: "p-16",
    participantName: "Robert Ellison",
    participantAvatar: "/assets/generated/avatar-16.dim_512x512.jpg",
    participantRole: "Master Electrician",
    lastMessage:
      "I will be there at 8:30 sharp. Please leave the panel accessible.",
    lastMessageAt: "2026-09-21T07:45:00",
    unread: 1,
    online: false,
    messages: [
      {
        id: "m-03-1",
        sender: "me",
        text: "Robert, the kitchen circuit trips whenever the microwave and the kettle run at the same time. Is that something you can look at?",
        timestamp: "2026-09-18T16:02:00",
      },
      {
        id: "m-03-2",
        sender: "them",
        text: "Very likely a shared circuit that was never sized for both. I can diagnose it in one visit. Is Tuesday morning any good?",
        timestamp: "2026-09-18T17:30:00",
      },
      {
        id: "m-03-3",
        sender: "me",
        text: "Tuesday at 8:30 works. I will be home.",
        timestamp: "2026-09-19T09:12:00",
      },
      {
        id: "m-03-4",
        sender: "them",
        text: "I will be there at 8:30 sharp. Please leave the panel accessible.",
        timestamp: "2026-09-21T07:45:00",
      },
    ],
  },
  {
    id: "cv-04",
    professionalId: "p-14",
    participantName: "Isabella Rossi",
    participantAvatar: "/assets/generated/avatar-14.dim_512x512.jpg",
    participantRole: "Brand & Identity Designer",
    lastMessage:
      "The workshop notes are in your inbox — the positioning territory is the strongest thread.",
    lastMessageAt: "2026-09-19T16:20:00",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m-04-1",
        sender: "them",
        text: "Thank you for a genuinely good workshop yesterday. You were honest about the parts of the brand that are not working, which makes my job much easier.",
        timestamp: "2026-09-19T10:05:00",
      },
      {
        id: "m-04-2",
        sender: "me",
        text: "It was overdue. We have been describing ourselves three different ways for two years.",
        timestamp: "2026-09-19T10:31:00",
      },
      {
        id: "m-04-3",
        sender: "them",
        text: "The workshop notes are in your inbox — the positioning territory is the strongest thread.",
        timestamp: "2026-09-19T16:20:00",
      },
    ],
  },
  {
    id: "cv-05",
    professionalId: "p-10",
    participantName: "Dr. Nadia Haddad",
    participantAvatar: "/assets/generated/avatar-10.dim_512x512.jpg",
    participantRole: "Registered Dietitian",
    lastMessage:
      "Your updated plan is attached. Keep the protein target where it is for now.",
    lastMessageAt: "2026-09-17T13:02:00",
    unread: 0,
    online: true,
    messages: [
      {
        id: "m-05-1",
        sender: "me",
        text: "The first two weeks went well but I am hungry in the afternoons.",
        timestamp: "2026-09-16T19:40:00",
      },
      {
        id: "m-05-2",
        sender: "them",
        text: "That is a common pattern when lunch is light on protein. Let us move some of the evening portion earlier rather than adding calories.",
        timestamp: "2026-09-17T08:15:00",
      },
      {
        id: "m-05-3",
        sender: "them",
        text: "Your updated plan is attached. Keep the protein target where it is for now.",
        timestamp: "2026-09-17T13:02:00",
      },
    ],
  },
  {
    id: "cv-06",
    professionalId: "p-08",
    participantName: "Sofia Marchetti",
    participantAvatar: "/assets/generated/avatar-08.dim_512x512.jpg",
    participantRole: "Licensed Architect",
    lastMessage:
      "Bring the survey and any photos of the rear elevation — it will save us time on site.",
    lastMessageAt: "2026-09-20T17:12:00",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m-06-1",
        sender: "me",
        text: "Sofia, we are thinking about a rear extension of around 400 sq ft. Is that a realistic scope for a first consultation?",
        timestamp: "2026-09-20T15:30:00",
      },
      {
        id: "m-06-2",
        sender: "them",
        text: "Very realistic. The main question is whether the lot line allows the depth you want. I will check the zoning before we meet.",
        timestamp: "2026-09-20T16:05:00",
      },
      {
        id: "m-06-3",
        sender: "them",
        text: "Bring the survey and any photos of the rear elevation — it will save us time on site.",
        timestamp: "2026-09-20T17:12:00",
      },
    ],
  },
  {
    id: "cv-07",
    professionalId: "p-04",
    participantName: "Marcus Delgado",
    participantAvatar: "/assets/generated/avatar-04.dim_512x512.jpg",
    participantRole: "Certified Public Accountant",
    lastMessage:
      "The quarterly schedule is set. I will flag anything unusual before the next payment.",
    lastMessageAt: "2026-09-09T11:48:00",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m-07-1",
        sender: "them",
        text: "Good session today. I have filed the return and set your quarterly estimates in the calendar.",
        timestamp: "2026-09-08T15:20:00",
      },
      {
        id: "m-07-2",
        sender: "me",
        text: "Thank you Marcus. That was far less painful than last year.",
        timestamp: "2026-09-08T15:44:00",
      },
      {
        id: "m-07-3",
        sender: "them",
        text: "The quarterly schedule is set. I will flag anything unusual before the next payment.",
        timestamp: "2026-09-09T11:48:00",
      },
    ],
  },
  {
    id: "cv-08",
    professionalId: "p-06",
    participantName: "Tomasz Kowalski",
    participantAvatar: "/assets/generated/avatar-06.dim_512x512.jpg",
    participantRole: "Mechanical Design Engineer",
    lastMessage:
      "Understood — I will hold the slot until Friday in case the tooling quote changes.",
    lastMessageAt: "2026-08-28T09:22:00",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m-08-1",
        sender: "me",
        text: "Tomasz, we may need to postpone the manufacturability review — the tooling quote is higher than expected.",
        timestamp: "2026-08-27T14:10:00",
      },
      {
        id: "m-08-2",
        sender: "them",
        text: "That is often a sign the design needs the review rather than a reason to skip it. Happy either way.",
        timestamp: "2026-08-27T15:02:00",
      },
      {
        id: "m-08-3",
        sender: "them",
        text: "Understood — I will hold the slot until Friday in case the tooling quote changes.",
        timestamp: "2026-08-28T09:22:00",
      },
    ],
  },
];

export function getConversation(id: string): Conversation | undefined {
  return conversations.find((conversation) => conversation.id === id);
}
