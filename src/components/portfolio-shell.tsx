"use client";

import { useEffect } from "react";
import { initPortfolio } from "./portfolio/init";

export function PortfolioShell() {
  useEffect(initPortfolio, []);

  return null;
}
