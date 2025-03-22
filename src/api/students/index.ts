import { ResponseWithTotal } from "@/types";
import { Student, StudentFilter } from "@/types/student";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  getFormData,
} from "@/utils/api-request";

export type GetStudentRequest = {
  page: number;
  limit: number;
  key?: string;
} & Partial<StudentFilter>;
export type StudentResponse = ResponseWithTotal<Student[]>;

export class StudentApi {
  static async getStudents({
    page,
    limit,
    key,
    status,
    faculty,
  }: GetStudentRequest): Promise<StudentResponse> {
    return await apiGet(
      "/students",
      getFormData({
        page,
        limit,
        key,
        status,
        faculty,
      })
    );
  }

  static async createStudent(
    students: Omit<Student, "id">[]
  ): Promise<{
    data: {
      acceptableStudents: Student[];
      unacceptableStudents: Omit<Student, "id">[];
    }

  }> {
    return await apiPost("/students", students);
  }

  static async updateStudent({
    id,
    student,
  }: {
    id: Student["id"];
    student: Partial<Student | Omit<Student, "email">>;
  }): Promise<void> {
    return await apiPut(`/students/${id}`, student);
  }

  static async deleteStudent(id: Student["id"]): Promise<void> {
    return await apiDelete(`/students/${id}`, {});
  }
}
