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
export const sideBar = [
  {
    name: "Quản lý khoa",
    link: "/khoa",
    icon: SchoolIcon,
  },
  {
    name: "Quản lý bộ môn",
    link: "/bo_mon",
    icon: ClassIcon,
  },
  {
    name: "Quản lý danh mục",
    link: "/danh_muc",
    icon: CategoryIcon,
  },
  {
    name: "Quản lý thời gian nghiên cứu",
    link: "/thoi_gian_nk",
    icon: AccessTimeIcon,
  },
  {
    name: "Quản lý chức vụ",
    link: "/chuc_vu",
    icon: EventSeatIcon,
  },
  {
    name: "Thiết lập chi phí thưởng",
    link: "/chi_phi_thuong",
    icon: PaidIcon,
  },

  {
    name: "Quản lý học kỳ",
    link: "/ky_hoc",
    icon: TimelineIcon,
  },
  {
    name: "Quản lý tài khoản",
    link: "/tai_khoan",
    icon: GroupIcon,
  },
  {
    name: "Quản lý vai trò",
    link: "/vai_tro",
    icon: LockIcon,
  },
  {
    name: "Quản lý quyền",
    link: "/quyen",
    icon: AdminPanelSettingsIcon,
  },
  {
    name: "Cập nhật bài nghiên cứu",
    link: "/nghien_cuu",
    icon: FolderSpecialIcon,
  },
  {
    name: "Duyệt bài nghiên cứu",
    link: "/duyet_nghien_cuu",
    icon: BookmarkAddedIcon,
  },
  {
    name: "Lưu trữ tài liệu",
    link: "/luu_tai_lieu",
    icon: SaveAltIcon,
  },
  {
    name: "Đề xuất thanh toán",
    link: "/de_xuat",
    icon: RequestPageIcon,
  },
  {
    name: "Duyệt đề xuất thanh toán",
    link: "/duyet_thanh_toan",
    icon: PriceCheckIcon,
  },
  {
    name: "Thanh toán",
    link: "/thanh_toan",
    icon: PointOfSaleIcon,
  },
  {
    name: "Báo cáo ",
    link: "/bao_cao",
    icon: AutoGraphIcon,
  },
  {
    name: "Báo cáo ",
    link: "/bao_cao_bm",
    icon: AutoGraphIcon,
  },
  {
    name: "Báo cáo ",
    link: "/bao_cao_tv",
    icon: AutoGraphIcon,
  },
];
