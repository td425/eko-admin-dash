import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { ResourceProps } from "react-admin";

import { UserReportList } from "./List";
import { UserReportShow } from "./Show";

export { UserReportList } from "./List";
export { UserReportShow } from "./Show";

const resource: ResourceProps = {
  name: "user_reports",
  icon: ReportGmailerrorredIcon,
  list: UserReportList,
  show: UserReportShow,
};

export default resource;
