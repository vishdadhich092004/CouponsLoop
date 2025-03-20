import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { claimHistory } from "@/api.clients";
import { IUserClaim } from "@/types/types";
import { formatDate } from "@/utils/format.data";

export function ClaimHistoryTable() {
  const [claims, setClaims] = useState<IUserClaim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await claimHistory();
        setClaims(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch claim history:", error);
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return <div>Loading claim history...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session ID</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Coupon ID</TableHead>
            <TableHead>Claimed At</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No claim history found
              </TableCell>
            </TableRow>
          ) : (
            claims.map((claim) => (
              <TableRow key={claim._id}>
                <TableCell className="font-medium truncate max-w-[200px]">
                  {claim.sessionId}
                </TableCell>
                <TableCell>{claim.ip}</TableCell>
                <TableCell className="truncate max-w-[150px]">
                  {claim.couponId}
                </TableCell>
                <TableCell>
                  {formatDate(new Date(claim.lastClaimedAt))}
                </TableCell>
                <TableCell>{formatDate(new Date(claim.createdAt))}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
