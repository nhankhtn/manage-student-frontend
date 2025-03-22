export const StudentCols = [
  {
    name: 'id',
    label: 'MSSV',
    type: 'text',
  },
  {
    name: 'name',
    label: 'Họ và tên',
    type: 'icon',
  },
  {
    name: 'dateOfBirth',
    label: 'Ngày sinh',
    type: 'text',
  },
  {
    name: 'gender',
    label: 'Giới tính',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    name: 'address',
    label: 'Địa chỉ',
    type: 'text',
  },
  // {
  //   name: 'faculty',
  //   label: 'Khoa',
  //   type: 'text',
  // },
  // {
  //   name: 'course',
  //   label: 'Khóa',
  //   type: 'text',
  // },
  // {
  //   name: 'program',
  //   label: 'Chương trình',
  //   type: 'text',
  // },
  {
    first : {
      name: 'faculty',
      label: 'Khoa',
      type: 'text',
    },
    second : [{
      name: 'course',
      label: 'Khóa',
      type: 'text',
    },
    {
      name: 'program',
      label: 'Chương trình',
      type: 'text',
    },
    ],
    type: 'nested',
  },
  {
    name: 'phone',
    label: 'Số điện thoại',
    type: 'text',
  },
  {
    name: 'status',
    label: 'Tình trạng',
    type: 'chip',
  },
  {
    name: 'delete',
    label: '',
    type: 'action',
  },

];