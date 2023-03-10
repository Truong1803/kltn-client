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
                primary={"Qu???n l?? khoa"}
              />
              <ListItemLink
                to={"/bo_mon"}
                icon={<ClassIcon />}
                primary={"Qu???n l?? b??? m??n"}
              />
              <ListItemLink
                to={"/ky_hoc"}
                icon={<TimelineIcon />}
                primary={"Qu???n l?? h???c k???"}
              />
              <ListItemLink
                to={"/chuc_vu"}
                icon={<EventSeatIcon />}
                primary={"Qu???n l?? ?????nh m???c nghi??n c???u"}
              />
              <ListItemLink
                to={"/vai_tro"}
                icon={<LockIcon />}
                primary={"Qu???n l?? vai tr??"}
              />
              <ListItemLink
                to={"/quyen"}
                icon={<AdminPanelSettingsIcon />}
                primary={"Qu???n l?? quy???n"}
              />
              <ListItemLink
                to={"/tai_khoan"}
                icon={<GroupIcon />}
                primary={"Qu???n l?? t??i kho???n"}
              />
            </>
          );
        // Ph??ng nghi??n c???u
        case "PNCKH":
          return (
            <>
              <ListItemLink
                to={"/danh_muc"}
                icon={<CategoryIcon />}
                primary={"Qu???n l?? danh m???c"}
              />
              <ListItemLink
                to={"/thoi_gian_nk"}
                icon={<AccessTimeIcon />}
                primary={"Qu???n l?? ?????nh m???c nghi??n c???u"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh s??ch b??i nghi??n c???u"}
              />
              <ListItemLink
                to={"/de_xuat"}
                icon={<RequestPageIcon />}
                primary={"????? xu???t thanh to??n"}
              />
              <ListItemLink
                to={"/duyet_thanh_toan"}
                icon={<PriceCheckIcon />}
                primary={"Danh s??ch ????? xu???t"}
              />
              <ListItemLink
                to={"/bao_cao_tv"}
                icon={<AutoGraphIcon />}
                primary={"B??o c??o"}
              />
            </>
          );
        // Tr?????ng b??? m??n
        case "TBM":
          return (
            <>
              <ListItemLink
                to={"/duyet_nghien_cuu"}
                icon={<BookmarkAddedIcon />}
                primary={"Duy???t b??i nghi??n c???u"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh s??ch b??i nghi??n c???u"}
              />
              <ListItemLink
                to={"/bao_cao_bm"}
                icon={<AutoGraphIcon />}
                primary={"B??o c??o"}
              />
            </>
          );
        // Th?? k??
        case "TK":
          return (
            <>
              <ListItemLink
                to={"/nghien_cuu"}
                icon={<FolderSpecialIcon />}
                primary={"C???p nh???t b??i nghi??n c???u"}
              />
              <ListItemLink
                to={"/duyet_nghien_cuu"}
                icon={<BookmarkAddedIcon />}
                primary={"Qu???n l?? b??i nghi??n c???u"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh s??ch b??i nghi??n c???u"}
              />
            </>
          );
        case "GV":
          return (
            <>
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh s??ch b??i nghi??n c???u"}
              />
              <ListItemLink
                to={"/bao_cao"}
                icon={<AutoGraphIcon />}
                primary={"B??o c??o"}
              />
            </>
          );
        // T??i v???
        case "TV":
          return (
            <>
              <ListItemLink
                to={"/chi_phi_thuong"}
                icon={<PaidIcon />}
                primary={"Thi???t l???p chi ph?? th?????ng"}
              />

              <ListItemLink
                to={"/duyet_thanh_toan"}
                icon={<PriceCheckIcon />}
                primary={"Duy???t ????? xu???t thanh to??n"}
              />
              <ListItemLink
                to={"/thanh_toan"}
                icon={<PointOfSaleIcon />}
                primary={"Thanh to??n"}
              />
              <ListItemLink
                to={"/luu_tai_lieu"}
                icon={<SaveAltIcon />}
                primary={"Danh s??ch b??i nghi??n c???u"}
              />
              <ListItemLink
                to={"/bao_cao_tv"}
                icon={<AutoGraphIcon />}
                primary={"B??o c??o"}
              />
            </>
          );
        case "TK1":
          return (
            <ListItemLink
              to={"/luu_tai_lieu"}
              icon={<SaveAltIcon />}
              primary={"Danh s??ch b??i nghi??n c???u"}
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
