import * as Yup from "yup";

export interface Student {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  temporaryAddress?: string;
  permanentAddress: string;
  mailingAddress?: string;
  faculty: Faculty["id"];
  course: number;
  program: Program["id"];
  phone: string;
  status: Status["id"];
  identity: {
    type: string;
    documentNumber: string;
    issueDate: Date;
    issuePlace: string;
    expiryDate: Date;
    countryIssue: string;
    isChip: boolean;
    notes: string;
  };
  nationality: string;
}

export const COUNTRY_DEFAULT = "Vietnam";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export const mappingGender: Record<Gender, string> = {
  Male: "Nam",
  Female: "Nữ",
  Other: "Khác",
};

export interface Faculty {
  id: string;
  name: string;
}
export interface Program {
  id: string;
  name: string;
}

export interface Status {
  id: string;
  name: string;
}

export interface StudentFilter extends Partial<Student> {
  key: string;
  status: string;
  faculty: string;
}

export const mappingFiledStudent: Record<string, string> = {
  id: "Mã sinh viên",
  name: "Họ và tên",
  dateOfBirth: "Ngày sinh",
  gender: "Giới tính",
  email: "Email",
  faculty: "Khoa",
  course: "Khóa",
  program: "Chương trình",
  phone: "Số điện thoại",
  status: "Trạng thái",
  temporaryAddress: "Địa chỉ tạm trú",
  permanentAddress: "Địa chỉ thường trú",
  mailingAddress: "Địa chỉ gửi thư",
  type: "Loại giấy từ",
  documentNumber: "Số giấy tờ",
  issueDate: "Ngày cấp",
  issuePlace: "Nơi cấp",
  expiryDate: "Ngày hết hạn",
  country: "Quốc gia",
  countryIssue: "Quốc gia cấp",
  isChip: "Có chip",
  notes: "Ghi chú",
  identity: "Định danh",
  nationality: "Quốc tịch",
};

export const validationStudent = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập họ và tên"),
  dateOfBirth: Yup.string().required("Vui lòng nhập ngày tháng năm sinh"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),

  // Permanent address validation
  permanentProvince: Yup.string().required("Vui lòng chọn tỉnh/thành phố"),
  permanentDistrict: Yup.string().required("Vui lòng chọn quận/huyện"),
  permanentWard: Yup.string().required("Vui lòng chọn phường/xã"),
  permanentDetail: Yup.string().required("Vui lòng nhập địa chỉ chi tiết"),

  // Temporary address validation (conditional)
  temporaryProvince: Yup.string().when("useTemporaryAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng chọn tỉnh/thành phố"),
  }),
  temporaryDistrict: Yup.string().when("useTemporaryAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng chọn quận/huyện"),
  }),
  temporaryWard: Yup.string().when("useTemporaryAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng chọn phường/xã"),
  }),
  temporaryDetail: Yup.string().when("useTemporaryAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng nhập địa chỉ chi tiết"),
  }),

  // Mailing address validation (conditional)
  mailingProvince: Yup.string().when("useMailingAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng chọn tỉnh/thành phố"),
  }),
  mailingDistrict: Yup.string().when("useMailingAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng chọn quận/huyện"),
  }),
  mailingWard: Yup.string().when("useMailingAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng chọn phường/xã"),
  }),
  mailingDetail: Yup.string().when("useMailingAddress", {
    is: true,
    then: (schema) => schema.required("Vui lòng nhập địa chỉ chi tiết"),
  }),

  // Academic info validation
  faculty: Yup.string().required("Vui lòng chọn khoa"),
  course: Yup.number()
    .required("Vui lòng nhập khóa học")
    .positive("Khóa học phải là số dương"),
  program: Yup.string().required("Vui lòng chọn chương trình"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  status: Yup.string().required("Vui lòng chọn tình trạng sinh viên"),

  // Identity validation
  identityDocumentNumber: Yup.string().required("Vui lòng nhập số giấy tờ"),
  identityIssueDate: Yup.string().required("Vui lòng nhập ngày cấp"),
  identityIssuePlace: Yup.string().required("Vui lòng nhập nơi cấp"),
  identityExpiryDate: Yup.string().required("Vui lòng nhập ngày hết hạn"),
});

export const mock_students: Student[] = [
  {
    id: "SV001",
    name: "Nguyễn Văn A",
    dateOfBirth: "2002-05-10",
    gender: Gender.Male,
    email: "nguyenvana@example.com",
    temporaryAddress: JSON.stringify({
      detail: "123 Đường ABC",
      ward: "Phường 1",
      district: "Quận 1",
      province: "TP Hồ Chí Minh",
      country: "Việt Nam",
    }),
    permanentAddress: JSON.stringify({
      detail: "456 Đường XYZ",
      ward: "Phường 5",
      district: "Quận 10",
      province: "TP Hồ Chí Minh",
      country: "Việt Nam",
    }),
    mailingAddress: JSON.stringify({
      detail: "789 Đường DEF",
      ward: "Phường 7",
      district: "Quận 3",
      province: "TP Hồ Chí Minh",
      country: "Việt Nam",
    }),
    faculty: "CNTT",
    course: 2020,
    program: "KTPM",
    phone: "0901234567",
    status: "Active",
    identity: {
      type: "CCCD",
      documentNumber: "123456789",
      issueDate: new Date("2020-01-01"),
      issuePlace: "Công an TP Hồ Chí Minh",
      expiryDate: new Date("2030-01-01"),
      countryIssue: "Việt Nam",
      isChip: true,
      notes: "",
    },
    nationality: "Việt Nam",
  },
  {
    id: "SV002",
    name: "Trần Thị B",
    dateOfBirth: "2001-08-22",
    gender: Gender.Female,
    email: "tranthib@example.com",
    temporaryAddress: JSON.stringify({
      detail: "88 Đường QWE",
      ward: "Phường 3",
      district: "Quận 5",
      province: "Hà Nội",
      country: "Việt Nam",
    }),
    permanentAddress: JSON.stringify({
      detail: "99 Đường RTY",
      ward: "Phường 9",
      district: "Quận Bình Thạnh",
      province: "TP Hồ Chí Minh",
      country: "Việt Nam",
    }),
    mailingAddress: JSON.stringify({
      detail: "100 Đường UIO",
      ward: "Phường 12",
      district: "Quận 7",
      province: "TP Hồ Chí Minh",
      country: "Việt Nam",
    }),
    faculty: "Kinh Tế",
    course: 2019,
    program: "QTKD",
    phone: "0912345678",
    status: "Active",
    identity: {
      type: "CMND",
      documentNumber: "987654321",
      issueDate: new Date("2019-07-15"),
      issuePlace: "Công an Hà Nội",
      expiryDate: new Date("2029-07-15"),
      countryIssue: "Việt Nam",
      isChip: false,
      notes: "Còn hiệu lực",
    },
    nationality: "Việt Nam",
  },
];
