export const login = () => `/auth/login`
export const meals = () => `/meals`
export const meal = (id: number) => `/meals/${id}`
export const plans = () => `/plans`
export const myOrders = () => `/my-orders`
export const adminOrders = () => `/admin-orders`
export const order = () => `/user-order`
export const updatePaymentStatus = () => `/update-payment-status`
export const orderByPlanId = (planId: number) => `/user-order?planId=${planId}`
