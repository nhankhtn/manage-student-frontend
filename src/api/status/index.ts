import { ResponseWithData } from "@/types";
import { Status } from "@/types/student";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/api-request";

export class StatusApi {
  static async getStatus(): Promise<ResponseWithData<Status[]>> {
    return await apiGet("/status");
  }

  static async addStatus(
    status: Omit<Status, "id">
  ): Promise<ResponseWithData<Status>> {
    return await apiPost("/status", status);
  }

  static async updateStatus(status: Status): Promise<ResponseWithData<Status>> {
    return await apiPut(`/status/${status.id}`, status);
  }

  static async deleteStatus(id: string): Promise<void> {
    await apiDelete(`/status/id/${id}`, {});
  }
}
