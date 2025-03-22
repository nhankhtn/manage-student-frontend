import { ResponseWithData } from "@/types";
import { Faculty } from "@/types/student";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/api-request";

export class FacultyApi {
  static async getFaculty(): Promise<ResponseWithData<Faculty[]>> {
    return await apiGet("/faculty");
  }

  static async addFaculty(
    faculty: Faculty
  ): Promise<ResponseWithData<Faculty>> {
    return await apiPost("/faculty", faculty);
  }

  static async updateFaculty(
    faculty: Faculty
  ): Promise<ResponseWithData<Faculty>> {
    return await apiPut(`/faculty/${faculty.id}`, faculty);
  }

  static async deleteFaculty(id: string): Promise<void> {
    await apiDelete(`/faculty/id/${id}`, {});
  }
}
