import { ResponseWithData } from "@/types";
import { Status } from "@/types/student";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/api-request";

export class StatusApi {
  static async getStatus(): Promise<ResponseWithData<Status[]>> {
    return await apiGet("/studentstatus");
  }

  static async addStatus(
    status: Omit<Status, "id">
  ): Promise<ResponseWithData<Status>> {
    return await apiPost("/studentstatus", status);
  }

  static async updateStatus(status: Status): Promise<ResponseWithData<Status>> {
    return await apiPut(`/studentstatus/${status.id}`, status);
  }

  static async deleteStatus(id: string): Promise<void> {
    await apiDelete(`/studentstatus/id/${id}`, {});
  }
}
