import { IUserClaim } from "@/types/types";

export const couponLeftTime = (userClaim: IUserClaim | IUserClaim[]) => {
  // Handle array case by taking the first element
  const claim = Array.isArray(userClaim) ? userClaim[0] : userClaim;

  if (!claim || !claim.lastClaimedAt) {
    return "00:00:00";
  }

  const now = new Date();
  const endDate = new Date(claim.lastClaimedAt);

  if (isNaN(endDate.getTime())) {
    return "00:00:00";
  }

  endDate.setHours(endDate.getHours() + 24);
  const diffTime = endDate.getTime() - now.getTime();

  if (diffTime < 0 || isNaN(diffTime)) {
    return "00:00:00";
  }

  const hours = Math.floor(diffTime / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
