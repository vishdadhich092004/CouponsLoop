const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const adminLogin = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getAllCoupons = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/coupons`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const createCoupon = async (code?: string) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/coupons`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ code }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
export const getCouponById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/coupons/${id}`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
export const updateCouponStatus = async (id: string, status: string) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/coupons/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
