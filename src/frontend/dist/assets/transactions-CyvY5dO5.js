const transactions = [
  {
    id: "TX-90412",
    bookingId: "BK-4821",
    professionalId: "p-01",
    professionalName: "Amara Okafor",
    amount: 420,
    fee: 42,
    net: 378,
    method: "Visa •••• 4417",
    status: "paid",
    date: "2026-09-20"
  },
  {
    id: "TX-90388",
    bookingId: "BK-4796",
    professionalId: "p-12",
    professionalName: "Grace Chen",
    amount: 95,
    fee: 9.5,
    net: 85.5,
    method: "Visa •••• 4417",
    status: "paid",
    date: "2026-09-19"
  },
  {
    id: "TX-90341",
    bookingId: "BK-4750",
    professionalId: "p-16",
    professionalName: "Robert Ellison",
    amount: 140,
    fee: 14,
    net: 126,
    method: "Mastercard •••• 8820",
    status: "paid",
    date: "2026-09-18"
  },
  {
    id: "TX-90297",
    bookingId: "BK-4702",
    professionalId: "p-14",
    professionalName: "Isabella Rossi",
    amount: 520,
    fee: 52,
    net: 468,
    method: "Visa •••• 4417",
    status: "paid",
    date: "2026-09-18"
  },
  {
    id: "TX-90255",
    bookingId: "BK-4688",
    professionalId: "p-10",
    professionalName: "Dr. Nadia Haddad",
    amount: 180,
    fee: 18,
    net: 162,
    method: "Visa •••• 4417",
    status: "paid",
    date: "2026-09-12"
  },
  {
    id: "TX-90210",
    bookingId: "BK-4655",
    professionalId: "p-08",
    professionalName: "Sofia Marchetti",
    amount: 450,
    fee: 45,
    net: 405,
    method: "Visa •••• 4417",
    status: "pending",
    date: "2026-09-19"
  },
  {
    id: "TX-90166",
    bookingId: "BK-4610",
    professionalId: "p-04",
    professionalName: "Marcus Delgado",
    amount: 340,
    fee: 34,
    net: 306,
    method: "Mastercard •••• 8820",
    status: "paid",
    date: "2026-09-08"
  },
  {
    id: "TX-90112",
    bookingId: "BK-4588",
    professionalId: "p-06",
    professionalName: "Tomasz Kowalski",
    amount: 360,
    fee: 36,
    net: 324,
    method: "Visa •••• 4417",
    status: "refunded",
    date: "2026-09-15"
  },
  {
    id: "TX-90088",
    bookingId: "BK-4903",
    professionalId: "p-01",
    professionalName: "Amara Okafor",
    amount: 420,
    fee: 42,
    net: 378,
    method: "Visa •••• 4417",
    status: "paid",
    date: "2026-09-05"
  },
  {
    id: "TX-90054",
    bookingId: "BK-4905",
    professionalId: "p-01",
    professionalName: "Amara Okafor",
    amount: 320,
    fee: 32,
    net: 288,
    method: "Mastercard •••• 8820",
    status: "paid",
    date: "2026-09-01"
  },
  {
    id: "TX-90021",
    bookingId: "BK-4907",
    professionalId: "p-01",
    professionalName: "Amara Okafor",
    amount: 260,
    fee: 26,
    net: 234,
    method: "Visa •••• 4417",
    status: "failed",
    date: "2026-08-28"
  },
  {
    id: "TX-89990",
    bookingId: "BK-4908",
    professionalId: "p-01",
    professionalName: "Amara Okafor",
    amount: 320,
    fee: 32,
    net: 288,
    method: "Visa •••• 4417",
    status: "paid",
    date: "2026-09-12"
  }
];
function getTransactionsForProfessional(professionalId) {
  return transactions.filter(
    (transaction) => transaction.professionalId === professionalId
  );
}
export {
  getTransactionsForProfessional as g,
  transactions as t
};
