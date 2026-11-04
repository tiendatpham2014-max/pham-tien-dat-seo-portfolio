import "../globals.css";
import { PortfolioRootLayout, createPortfolioMetadata } from "../portfolio-layout";

export const metadata = createPortfolioMetadata("vi");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PortfolioRootLayout language="vi">{children}</PortfolioRootLayout>;
}
