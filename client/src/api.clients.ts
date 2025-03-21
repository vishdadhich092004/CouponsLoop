const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const initSession = async () => {
  const response = await fetch(`${API_BASE_URL}/api/session/init`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
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

export const adminLogout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/logout`, {
    credentials: "include",
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
export const claimCoupon = async () => {
  const response = await fetch(`${API_BASE_URL}/api/coupons/claim`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const validateAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/validate-admin`, {
    credentials: "include",
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    console.error(data.message);
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
  const response = await fetch(
    `${API_BASE_URL}/api/admin/coupons/${id}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const updateCoupon = async (id: string, code: string) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/coupons/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const claimHistory = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/coupons/claim-history`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
