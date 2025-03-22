import { AddressApi } from "@/api/address";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "@/hooks/use-function";
import { Country, Province } from "@/types/address";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";

interface ContextValue {
  getCountriesApi: UseFunctionReturnType<void, Country[]>;
  countries: Country[];
  provinces: Province[];
}

export const MainContext = createContext<ContextValue>({
  getCountriesApi: DEFAULT_FUNCTION_RETURN,
  countries: [],
  provinces: [],
});

const MainProvider = ({ children }: { children: ReactNode }) => {
  const getCountriesApi = useFunction(AddressApi.getCountries);
  const getProvincesApi = useFunction(AddressApi.getProvinces);

  const countries = useMemo(
    () => getCountriesApi.data || [],
    [getCountriesApi.data]
  );

  const provinces = useMemo(
    () => getProvincesApi.data || [],
    [getProvincesApi.data]
  );

  useEffect(() => {
    getCountriesApi.call({});
    getProvincesApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContext.Provider value={{ getCountriesApi, countries, provinces }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
