import { combineReducers } from "redux";

import AlertReducer from "./AlertReducer";
import AuthReducer from "./AuthReducer";
import CategoryReducer from "./CategoryReducer";
import DepartmentReducer from "./DepartmentReducer";
import LectureReducer from "./LectureReducer";
import PaymentReducer from "./PaymentReducer";
import PermissionReducer from "./PermissionReducer";
import RankReducer from "./RankReducer";
import RoleReducer from "./RoleReducer";
import SemesterReducer from "./SemesterReducer";
import SubjectReducer from "./SubjectReducer";
import TaskReducer from "./TaskReducer";
import UserAuthReducer from "./UserAuthReducer";
import ResearchReducer from "./ResearchReducer";
import PositionReducer from "./PositionReducer";
import ReportReducer from "./ReportReducer";
import CheckPermissionReducer from "./CheckPermissionReducer";
export const reducers = combineReducers({
  AlertReducer,
  AuthReducer,
  DepartmentReducer,
  SubjectReducer,
  LectureReducer,
  RankReducer,
  PaymentReducer,
  SemesterReducer,
  CategoryReducer,
  TaskReducer,
  RoleReducer,
  PermissionReducer,
  UserAuthReducer,
  ResearchReducer,
  PositionReducer,
  ReportReducer,
  CheckPermissionReducer,
});
