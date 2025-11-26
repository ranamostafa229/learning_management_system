import { adminGetEnrollmentStats } from "@/app/data/admin/admin-get-enrollment-stats";
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { ChartNoAxesColumn } from "lucide-react";

const Analytics = async () => {
  const enrollmentData = await adminGetEnrollmentStats();

  return (
    <div className="flex flex-col gap-8">
      <h2 className="flex gap-2 text-xl font-medium items-center">
        <ChartNoAxesColumn size={28} />
        Analytics
      </h2>
      <ChartAreaInteractive data={enrollmentData} />
    </div>
  );
};

export default Analytics;
