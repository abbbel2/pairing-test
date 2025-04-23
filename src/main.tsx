import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { Toaster } from "@/components/ui/sonner"
import { router } from "@/router";
import { ThemeProvider } from "@/components/theme-provider";

import store from "./store";

import "./index.css";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
      </QueryClientProvider>
      <Toaster />
    </Provider>
  </StrictMode>
);
