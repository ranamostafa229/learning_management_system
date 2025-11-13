import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
// import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";
// import data from "./data.json";

export default function AdminIndexDashboard() {
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
      {/* <DataTable data={data} /> */}
    </>
  );
}
