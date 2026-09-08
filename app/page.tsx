import Dashboard from "@/components/Dashboard";
import linksData from "@/data/links.json";
import type { LinksData } from "@/lib/types";

export default function Home() {
  return <Dashboard data={linksData as LinksData} />;
}
