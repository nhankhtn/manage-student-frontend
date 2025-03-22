import { ResponseWithData } from "@/types";
import { Program } from "@/types/student";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/api-request";

export class ProgramApi {
  static async getProgram(): Promise<ResponseWithData<Program[]>> {
    return await apiGet("/program");
  }

  static async addProgram(
    program: Omit<Program, "id">
  ): Promise<ResponseWithData<Program>> {
    return await apiPost("/program", program);
  }
  static async updateProgram(
    program: Program
  ): Promise<ResponseWithData<Program>> {
    return await apiPut(`/program/${program.id}`, program);
  }
  static async deleteProgram(id: string): Promise<void> {
    await apiDelete(`/program//id/${id}`, {});
  }
}
