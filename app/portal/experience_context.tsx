"use client";

import React from "react";
import { FULL_ROUTE, type PortalRoute } from "./routes";

/* Defaults to the Full Experience so any puzzle rendered without a
   provider behaves exactly as it always has. */
const ExperienceContext = React.createContext<PortalRoute>(FULL_ROUTE);

export function ExperienceProvider({
  route,
  children,
}: {
  route: PortalRoute;
  children: React.ReactNode;
}) {
  return <ExperienceContext.Provider value={route}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): PortalRoute {
  return React.useContext(ExperienceContext);
}
