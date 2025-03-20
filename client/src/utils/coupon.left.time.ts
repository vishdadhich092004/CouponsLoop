import { IUserClaim } from "../../../server/src/shared/types";

export const couponLeftTime = (userClaim: IUserClaim[]) => {
  const now = new Date();
  const endDate = new Date(userClaim[0].lastClaimedAt);
  endDate.setHours(endDate.getHours() + 24);
  const diffTime = endDate.getTime() - now.getTime();

  // Convert to hours, minutes, and seconds
  const hours = Math.floor(diffTime / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  // Format the time string
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
