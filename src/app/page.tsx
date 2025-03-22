"use client";

import { paths } from "@/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.dashboard.index);
  }, [router]);

  return null;
};

export default Page;
