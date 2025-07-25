export const API_BASE_URL =  process.env.NEXT_PUBLIC_API_URL

export const AUTH_ENDPOINTS = {
    lOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REGISTER: `${API_BASE_URL}/api/register`,
    GYMS: `${API_BASE_URL}/api/v1/gyms/`,
}

export const GYM_ENDPOINTS = {
    GYMS_ALL: `${API_BASE_URL}/api/v1/gyms/`,
    GYMS_ADD: `${API_BASE_URL}/api/v1/gyms/`,
}

export const PLAN_ENDPOINTS = {
    PLANS_ALL: `${API_BASE_URL}/api/v1/plans/`,
    PLANS_ADD: `${API_BASE_URL}/api/v1/plans/`,
}

export const PRODUCT_ENDPOINTS = {
    PRODUCTS_ALL: `${API_BASE_URL}/api/v1/products/`,
    PRODUCTS_ADD: `${API_BASE_URL}/api/v1/products/`,
}

export const TRAINER_ENDPOINTS = {
    TRAINERS_ALL: `${API_BASE_URL}/api/v1/users/trainers/`,
    TRAINERS_ADD: `${API_BASE_URL}/api/v1/users/admin-trainer`,
    TRAINERS_EDIT: `${API_BASE_URL}/api/v1/users/`,
}
