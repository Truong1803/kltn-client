import React, { useEffect, useState } from "react";

import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import { getUserAuth } from "../../redux/action/UserAuthAction";
import ListItemLink from "../CustomLink/CustomLink";
import { sideBar } from "./SideBarData";
import {
  getAllRoleAction,
  getRoleByPositionAction,
} from "../../redux/action/RoleAction";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import LockIcon from "@mui/icons-material/Lock";
import PaidIcon from "@mui/icons-material/Paid";
import SchoolIcon from "@mui/icons-material/School";
import TimelineIcon from "@mui/icons-material/Timeline";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const SideBars = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.RoleReducer);
  const auth = useSelector((state) => state.AuthReducer);
  const info = useSelector((state) => state.UserAuthReducer);
  const [isRole, setIsRole] = useState([]);
  const getDataUser = () => {
    if (auth.accessToken) {
      let userId = jwt_decode(auth.accessToken);
      dispatch(getUserAuth(userId.id, auth.accessToken));
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    if (info.role) {
      getRole(info.role);
    }
  }, [info]);
  useEffect(() => {
    if (info.role && roles.length > 0) {
      let role = roles.filter((role) => role._id === info.role);
      setIsRole(role[0]);
    }
  }, [roles]);

  const getRole = (role) => {
    dispatch(getRoleByPositionAction(role, auth.accessToken));
    dispatch(getAllRoleAction(auth.accessToken));
  };

  const renderMenu = () => {
    if (!isRole) {
      return;
    } else {
      switch (isRole.id_role) {
        case "ADMIN":
          return (
            <>
              <ListItemLink
                to={"/khoa"}
                icon={<SchoolIcon />}
                primary={"Quản lý khoa"}
              />
              <ListItemLink
                to={"/bo_mon"}
                icon={<ClassIcon />}
                primary={"Quản lý bộ môn"}
              />
              <ListItemLink
                to={"/ky_hoc"}
                icon={<TimelineIcon />}
                primary={"Quản lý học kỳ"}
              />
              <ListItemLink
                to={"/chuc_vu"}
                icon={<EventSeatIcon />}
                primary={"Quản lý định mức nghiên cứu"}
              />
              <ListItemLink
                to={"/vai_tro"}
                icon={<LockIcon />}
                primary={"Quản lý vai trò"}
              />
              <ListItemLink
                to={"/quyen"}
                icon={<AdminPanelSettingsIcon />}
                primary={"Quản lý quyền"}
              />
              <ListItemLink
                to={"/tai_khoan"}
                icon={<GroupIcon />}
                primary={"Quản lý tài khoản"}
              />
            </>
          );
        // Phòng nghiên cứu
        case "PNCKH":
          return (
            <>
              <ListItemLink
                to={"/danh_muc"}
                icon={<CategoryIcon />}
                primary={"Quản lý danh mục"}
              />
              <ListItemLink
                to={"/thoi_gian_nk"}
                icon={<AccessTimeIcon />}
                primary={"Quản lý định mức nghiên cứu"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh sách bài nghiên cứu"}
              />
              <ListItemLink
                to={"/de_xuat"}
                icon={<RequestPageIcon />}
                primary={"Đề xuất thanh toán"}
              />
              <ListItemLink
                to={"/duyet_thanh_toan"}
                icon={<PriceCheckIcon />}
                primary={"Danh sách đề xuất"}
              />
              <ListItemLink
                to={"/bao_cao_tv"}
                icon={<AutoGraphIcon />}
                primary={"Báo cáo"}
              />
            </>
          );
        // Trưởng bộ môn
        case "TBM":
          return (
            <>
              <ListItemLink
                to={"/duyet_nghien_cuu"}
                icon={<BookmarkAddedIcon />}
                primary={"Duyệt bài nghiên cứu"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh sách bài nghiên cứu"}
              />
              <ListItemLink
                to={"/bao_cao_bm"}
                icon={<AutoGraphIcon />}
                primary={"Báo cáo"}
              />
            </>
          );
        // Thư ký
        case "TK":
          return (
            <>
              <ListItemLink
                to={"/nghien_cuu"}
                icon={<FolderSpecialIcon />}
                primary={"Cập nhật bài nghiên cứu"}
              />
              <ListItemLink
                to={"/duyet_nghien_cuu"}
                icon={<BookmarkAddedIcon />}
                primary={"Quản lý bài nghiên cứu"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh sách bài nghiên cứu"}
              />
            </>
          );
        case "GV":
          return (
            <>
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh sách bài nghiên cứu"}
              />
              <ListItemLink
                to={"/bao_cao"}
                icon={<AutoGraphIcon />}
                primary={"Báo cáo"}
              />
            </>
          );
        // Tài vụ
        case "TV":
          return (
            <>
              <ListItemLink
                to={"/chi_phi_thuong"}
                icon={<PaidIcon />}
                primary={"Thiết lập chi phí thưởng"}
              />

              <ListItemLink
                to={"/duyet_thanh_toan"}
                icon={<PriceCheckIcon />}
                primary={"Duyệt đề xuất thanh toán"}
              />
              <ListItemLink
                to={"/thanh_toan"}
                icon={<PointOfSaleIcon />}
                primary={"Thanh toán"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh sách bài nghiên cứu"}
              />
              <ListItemLink
                to={"/bao_cao_tv"}
                icon={<AutoGraphIcon />}
                primary={"Báo cáo"}
              />
            </>
          );
        case "TK1":
          return (
            <ListItemLink
              to={"/luu_tai_lieu"}
              icon={<SaveAltIcon />}
              primary={"Danh sách bài nghiên cứu"}
            />
          );
        case "DEMO":
          return sideBar.map((bar, index) => {
            return (
              <ListItemLink
                to={bar.link}
                icon={<bar.icon />}
                primary={bar.name}
                key={index}
              />
            );
          });
        default:
          return <></>;
      }
    }
  };
  return <div>{renderMenu()}</div>;
};
