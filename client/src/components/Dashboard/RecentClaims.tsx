import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { claimHistory } from "@/api.clients";
import { IUserClaim } from "@/types/types";
import { formatDate } from "@/utils/format.data";

export function RecentClaims() {
  const [claims, setClaims] = useState<IUserClaim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await claimHistory();
        setClaims(data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch claim history:", error);
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Claims</CardTitle>
        <CardDescription>Latest coupon claims by users</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading recent claims...</p>
        ) : claims.length === 0 ? (
          <p>No claims found</p>
        ) : (
          <div className="space-y-4">
            {claims.map((claim) => (
              <div
                key={claim._id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium truncate max-w-[200px]">
                    {claim.sessionId}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      IP: {claim.ip}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    {formatDate(new Date(claim.lastClaimedAt))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
