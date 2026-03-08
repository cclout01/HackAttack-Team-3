import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("auth/callback", "routes/authCallback.tsx"),
  route("dashboard/volunteer", "routes/VolunteerDashboard.tsx"),
  route("dashboard/org", "routes/OrgDashboard.tsx"),
  route("admin", "routes/admin.tsx"),
  route("completion/:completionId", "routes/completionConfirmation.tsx"),
  route("position/:id", "routes/PositonDetail.tsx"),
  route("org/dashboard", "routes/OrgDashboard.tsx"),
  route("org/post", "routes/postposition.tsx"),
  route("org/edit/:id", "routes/editPosition.tsx"),
  route("volunteer/profile", "routes/VolunteerDashboard.tsx"),
  route("certificate/:completionId", "routes/certificatepage.tsx"),
] satisfies RouteConfig;
