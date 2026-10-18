export const permissionGroups = [
  { id: "dashboard", en: "Dashboard", ar: "لوحة التحكم", actions: ["view", "create", "edit", "delete"] },
  { id: "inquiries", en: "Inquiries", ar: "الاستفسارات", actions: ["view", "create", "edit", "delete"] },
  { id: "bookings", en: "Bookings", ar: "الحجوزات", actions: ["view", "create", "edit", "delete"] },
  { id: "customers", en: "Customers", ar: "العملاء", actions: ["view", "create", "edit", "delete"] },
  { id: "packages", en: "Tour packages", ar: "الباقات السياحية", actions: ["view", "create", "edit", "delete"] },
  {
    id: "promotions",
    en: "Coupons & promotions",
    ar: "الكوبونات والعروض",
    actions: ["view", "create", "edit", "delete"],
  },
  {
    id: "payments",
    en: "Payments & invoices",
    ar: "المدفوعات والفواتير",
    actions: ["view", "create", "edit", "delete"],
  },
  {
    id: "documents",
    en: "Documents & visa",
    ar: "المستندات والتأشيرات",
    actions: ["view", "create", "edit", "delete"],
  },
  { id: "reviews", en: "Reviews & ratings", ar: "المراجعات والتقييمات", actions: ["view", "create", "edit", "delete"] },
] as const;

export type Permission = `${(typeof permissionGroups)[number]["id"]}.${string}`;

export type TeamRole = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  locked?: boolean;
};

export type TeamUser = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: "active" | "invited" | "suspended";
  lastActive: string;
};

const readPermissions = permissionGroups.map((group) => `${group.id}.view`);
const writePermissions = permissionGroups.map((group) => `${group.id}.edit`);
const createPermissions = permissionGroups.map((group) => `${group.id}.create`);
const deletePermissions = permissionGroups.map((group) => `${group.id}.delete`);

export const initialRoles: TeamRole[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to workspace settings and operations.",
    locked: true,
    permissions: permissionGroups.flatMap((group) => group.actions.map((action) => `${group.id}.${action}`)),
  },
  {
    id: "manager",
    name: "Manager",
    description: "Oversees bookings, flights and customer experience.",
    permissions: [
      ...readPermissions,
      ...writePermissions.slice(0, 7),
      ...createPermissions.slice(0, 4),
      deletePermissions[2],
    ],
  },
  {
    id: "finance",
    name: "Finance",
    description: "Manages payments, receivables and financial reports.",
    permissions: [
      ...readPermissions.slice(2, 7),
      ...writePermissions.slice(6, 8),
      createPermissions[6],
      deletePermissions[6],
    ],
  },
  {
    id: "agent",
    name: "Agent",
    description: "Handles day-to-day reservations and travelers.",
    permissions: [...readPermissions, ...writePermissions.slice(0, 4), ...createPermissions.slice(1, 3)],
  },
  {
    id: "support",
    name: "Support",
    description: "Helps travelers resolve questions and service issues.",
    permissions: [...readPermissions.slice(0, 8), ...writePermissions.slice(1, 5)],
  },
];

export const initialUsers: TeamUser[] = [
  {
    id: "u1",
    name: "Meryem Kaya",
    email: "meryem.kaya@manisa.travel",
    roleId: "admin",
    status: "active",
    lastActive: "2026-10-08",
  },
  {
    id: "u2",
    name: "Ahmed Mansour",
    email: "ahmed.mansour@manisa.travel",
    roleId: "manager",
    status: "active",
    lastActive: "2026-10-08",
  },
  {
    id: "u3",
    name: "Leyla Demir",
    email: "leyla.demir@manisa.travel",
    roleId: "finance",
    status: "active",
    lastActive: "2026-10-07",
  },
  {
    id: "u4",
    name: "Omar Haddad",
    email: "omar.haddad@manisa.travel",
    roleId: "agent",
    status: "active",
    lastActive: "2026-10-08",
  },
  {
    id: "u5",
    name: "Sara Yilmaz",
    email: "sara.yilmaz@manisa.travel",
    roleId: "agent",
    status: "invited",
    lastActive: "",
  },
  {
    id: "u6",
    name: "Nour Alami",
    email: "nour.alami@manisa.travel",
    roleId: "agent",
    status: "suspended",
    lastActive: "2026-09-21",
  },
];
