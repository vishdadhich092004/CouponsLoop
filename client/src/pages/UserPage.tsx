import { useState, useEffect } from "react";
import { claimCoupon, initSession } from "../api.clients";

function UserPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initSession();
  }, []);

  const handleClaim = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await claimCoupon();
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to claim coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Claim Your Coupon</h1>

      <button
        onClick={handleClaim}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Claiming..." : "Claim Coupon"}
      </button>

      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
}

export default UserPage;
