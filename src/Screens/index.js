import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Department from "../Components/Department/Department";
import Headers, { DrawerHeader } from "../Components/Menu";
import Subject from "../Components/Subject/Subject";
import Lectures from "../Components/Lecturers/Lectures";

import DashBoard from "../Components/DashBoard/DashBoard";
import SignIn from "../Components/Auth/SignIn/SignIn";
import SignUp from "../Components/Auth/SignUp/SignUp";
import ForgotPassword from "../Components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../Components/Auth/ResetPassword/ResetPassword";
import Payment from "../Components/Payment/Payment";
import TimeResearch from "../Components/TimeResearch/TimeResearch";
import User from "../Components/User/User";
import Semester from "../Components/Semester/Semester";
import CategoryResearch from "../Components/CategoryResearch/CategoryResearch";
import Profile from "../Components/Profile/Profile";
import Role from "../Components/Role/Role";
import ManagerResearch from "../Components/ManageResearch/ManageResearch";
import ApproveResearch from "../Components/ApproveResearch/ApproveResearch";
import UpdateResearch from "../Components/UpdateResearch/UpdateResearch";
import Position from "../Components/Position/Position";
import SuggestPayment from "../Components/SugguestPayment/SugguestPayment";
import PaymentResearch from "../Components/PaymentResearch/PaymentResearch";
import ChangePassword from "../Components/Auth/ResetPassword/ChangePassword";
import ReportBySubject from "../Components/ReportBySubject/ReportBySubject";
import ReportByUser from "../Components/ReportByUer/ReportByUser";
import ApprovePaymentResearch from "../Components/ApprovePaymentResearch/ApprovePaymentResearch";
import ReportByAccounting from "../Components/ReportByAccounting/ReportByAccounting";
import Permission from "../Components/Permission/Permission";
export default function Contents() {
  const auth = useSelector((state) => state.AuthReducer);
  return (
    <Box sx={{ display: "flex" }}>
      {auth.accessToken ? <Headers /> : <></>}
      <Box
        component='main'
        sx={(theme) => ({
          flexGrow: 1,
          p: 3,
        })}
      >
        <DrawerHeader />
        <Box>
          <Routes>
            {auth.accessToken ? (
              <>
                <Route path='/dang_nhap' element={<Navigate to='/' />} />
                <Route path='/dang_ky' element={<Navigate to='/' />} />
                <Route path='/quen_mat_khau' element={<Navigate to='/' />} />
                <Route path='/khoa' element={<Department />} />
                <Route path='/bo_mon' element={<Subject />} />
                <Route path='/giang_vien' element={<Lectures />} />
                <Route path='/danh_muc' element={<CategoryResearch />} />
                <Route path='/chi_phi_thuong' element={<Payment />} />
                <Route path='/thoi_gian_nk' element={<TimeResearch />} />
                <Route path='/chuc_vu' element={<Position />} />
                <Route path='/ky_hoc' element={<Semester />} />
                <Route path='/tai_khoan' element={<User />} />
                <Route path='/ca_nhan' element={<Profile />} />
                <Route path='/doi_mat_khau' element={<ChangePassword />} />
                <Route path='/vai_tro' element={<Role />} />
                <Route path='/quyen' element={<Permission />} />
                <Route path='/nghien_cuu' element={<UpdateResearch />} />
                <Route path='/duyet_nghien_cuu' element={<ApproveResearch />} />
                <Route path='/luu_tai_lieu' element={<ManagerResearch />} />
                <Route path='/de_xuat' element={<SuggestPayment />} />
                <Route
                  path='/duyet_thanh_toan'
                  element={<ApprovePaymentResearch />}
                />
                <Route path='/thanh_toan' element={<PaymentResearch />} />
                <Route path='/bao_cao_bm' element={<ReportBySubject />} />
                <Route path='/bao_cao' element={<ReportByUser />} />
                <Route path='/bao_cao_tv' element={<ReportByAccounting />} />
                <Route path='/' element={<DashBoard />} />
              </>
            ) : (
              <>
                <Route path='/dang_nhap' element={<SignIn />} />
                <Route path='/dang_ky' element={<SignUp />} />
                <Route path='/quen_mat_khau' element={<ForgotPassword />} />
                <Route
                  path='/reset-password/:access_Token'
                  element={<ResetPassword />}
                />
                <Route path='*' element={<Navigate to='/dang_nhap' />} />
              </>
            )}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
