import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/volunteerlogin.tsx"),
  route("home", "routes/home.tsx"),
  route("admin-login", "routes/admin-login.tsx"),
  route("admin-signup", "routes/admin-signup.tsx"),
  route("volunteersignup", "routes/volunteersignup.tsx"),
  route("position/:id", "routes/PositonDetail.tsx"),
  route("org/dashboard", "routes/OrgDashboard.tsx"),
  route("org/post", "routes/postposition.tsx"),
  route("org/edit/:id", "routes/editPosition.tsx"),
  route("volunteer/profile", "routes/VolunteerDashboard.tsx"),
  route("certificate/:completionId", "routes/certificatepage.tsx"),
] satisfies RouteConfig;
