import { useEffect, useMemo } from "react";
import { useDialog } from "@/hooks/use-dialog";
import useFunction from "@/hooks/use-function";
import { FacultyApi } from "@/api/faculty";

export const useFaculty = () => {
  const dialog = useDialog();

  const getFacultiesApi = useFunction(FacultyApi.getFaculty, {
    disableResetOnCall: true,
  });

  const faculties = useMemo(
    () => getFacultiesApi.data?.data || [],
    [getFacultiesApi.data]
  );

  useEffect(() => {
    getFacultiesApi.call({});
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFacultyApi = useFunction(FacultyApi.addFaculty, {
    successMessage: "Thêm khoa thành công",
    onSuccess: ({ result }) => {
      getFacultiesApi.setData({
        data: [...(getFacultiesApi.data?.data || []), result.data],
      });
    },
  });

  const updateFacultyApi = useFunction(FacultyApi.updateFaculty, {
    successMessage: "Cập nhật khoa thành công",
    onSuccess: ({ result }) => {
      getFacultiesApi.setData({
        data: (getFacultiesApi.data?.data || []).map((f) =>
          f.id === result.data.id ? result.data : f
        ),
      });
    },
  });

  const deleteFacultyApi = useFunction(FacultyApi.deleteFaculty, {
    successMessage: "Xóa khoa thành công",
    onSuccess: ({ payload }) => {
      getFacultiesApi.setData({
        data: (getFacultiesApi.data?.data || []).filter(
          (f) => f.id !== payload
        ),
      });
    },
  });

  return {
    dialog,
    getFacultiesApi,
    addFacultyApi,
    updateFacultyApi,
    deleteFacultyApi,
    faculties,
  };
};
