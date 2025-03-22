"use client";

import MainProvider from "@/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>{children}</MainProvider>
    </QueryClientProvider>
  );
}
