import {
  IconBook,
  IconPlaylistAdd,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard-stats";

const StatsCard = ({
  totalRecords,
  title,
  description,
  icon: Icon,
}: {
  totalRecords: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className: string }>;
}) => {
  return (
    <Card className="@container/card">
      <CardHeader className="flex justify-between items-center space-y-0 pb-2">
        <div>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalRecords}
          </CardTitle>
        </div>
        <Icon className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <p className="text-muted-foreground">{description}</p>
      </CardFooter>
    </Card>
  );
};

export async function SectionCards() {
  const { totalSignups, totalCustomers, totalCourses, totalLessons } =
    await AdminGetDashboardStats();
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatsCard
        totalRecords={totalSignups}
        title="Total Signups"
        description="Registered users on the platform"
        icon={IconUsers}
      />

      <StatsCard
        totalRecords={totalCustomers}
        title="Total Customers"
        description="Users who have enrolled in courses"
        icon={IconShoppingCart}
      />

      <StatsCard
        totalRecords={totalCourses}
        title="Total Courses"
        description="Avaliable courses on the platform"
        icon={IconBook}
      />

      <StatsCard
        totalRecords={totalLessons}
        title="Total Lessons"
        description="Total learning content available"
        icon={IconPlaylistAdd}
      />
    </div>
  );
}
