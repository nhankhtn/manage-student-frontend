import { Country, District, Province } from "@/types/address";
import { apiGet } from "@/utils/api-request";

const API_PROVINCE = process.env.NEXT_PUBLIC_API_PROVINCE;
const API_COUNTRY = process.env.NEXT_PUBLIC_API_COUNTRY;

export class AddressApi {
  static async getProvinces(): Promise<Province[]> {
    return await apiGet(`/address/provinces`);
  }

  static async getDistrictOfProvinces({
    province_code,
    depth = 2,
  }: {
    province_code: number;
    depth?: number;
  }): Promise<Province> {
    return await apiGet(`/address/districts/${province_code}`, {
      depth,
    });
  }

  static async getWardOfDistrict({
    district_code,
    depth = 2,
  }: {
    district_code: number;
    depth?: number;
  }): Promise<District> {
    return await apiGet(`/address/wards/${district_code}`, {
      depth,
    });
  }

  static async getCountries(): Promise<Country[]> {
    return await apiGet(`/address/countries`);
  }
}
