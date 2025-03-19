import { useEffect, useState } from "react";
import { getAllCoupons } from "../api.clients"; // Adjust the import path as needed
import { ICoupon } from "@/../../server/src/shared/types";

function AdminDashboard() {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getAllCoupons();
        setCoupons(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch coupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Coupons</h1>
      <div className="coupon-list">
        {coupons.map((coupon: ICoupon) => (
          <div key={coupon._id} className="coupon-item">
            <h3>Code: {coupon.code}</h3>
            <p>Status: {coupon.status}</p>
            <p>Claimed By: {coupon.claimedBy || "Not claimed"}</p>
            <p>
              Claimed At:{" "}
              {coupon.claimedAt
                ? new Date(coupon.claimedAt).toLocaleString()
                : "Not claimed"}
            </p>
            <p>Created At: {new Date(coupon.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
