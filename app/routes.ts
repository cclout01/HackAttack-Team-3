import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("position/:id", "routes/PositonDetail.tsx"),
  route("org/dashboard", "routes/OrgDashboard.tsx"),
  route("org/post", "routes/postposition.tsx"),
  route("org/edit/:id", "routes/editPosition.tsx"),
  route("volunteer/profile", "routes/Profilepage.tsx"),
  route("certificate/:completionId", "routes/certificatepage.tsx"),
] satisfies RouteConfig;