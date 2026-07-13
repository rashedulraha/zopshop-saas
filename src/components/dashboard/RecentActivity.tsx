interface Activity {
  id: string;
  user: {
    name: string;
    email: string;
  };
  action: string;
  amount?: string;
  date: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="border border-border bg-card rounded-md overflow-hidden flex flex-col">
      <div className="p-6 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground">Latest sales and activities from your store.</p>
      </div>
      <div className="divide-y divide-border flex-1 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                <span className="font-medium text-muted-foreground">
                  {activity.user.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{activity.user.name}</span>
                <span className="text-xs text-muted-foreground">{activity.user.email}</span>
              </div>
            </div>
            
            <div className="flex items-center sm:justify-end gap-6 sm:gap-8 flex-1 sm:flex-none ml-14 sm:ml-0">
              <div className="flex flex-col sm:text-right">
                <span className="text-sm font-medium text-foreground">{activity.action}</span>
                <span className="text-xs text-muted-foreground">{activity.date}</span>
              </div>
              {activity.amount && (
                <div className="font-semibold text-foreground text-right min-w-[70px]">
                  {activity.amount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
