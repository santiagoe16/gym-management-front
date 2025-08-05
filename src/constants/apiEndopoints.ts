export const API_BASE_URL =  process.env.NEXT_PUBLIC_API_URL

export const AUTH_ENDPOINTS = {
    lOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REGISTER: `${API_BASE_URL}/api/register`,
    GYMS: `${API_BASE_URL}/api/v1/gyms/`,
}

export const USER_ENDPOINTS = {
    USERS_ALL: `${API_BASE_URL}/api/v1/users/users/`,
    USERS_ADD: `${API_BASE_URL}/api/v1/users/with-plan`,
    USERS_UPDATE: `${API_BASE_URL}/api/v1/users/`,
    USERS_DELETE: `${API_BASE_URL}/api/v1/users/`,
    USER_BY_ID: `${API_BASE_URL}/api/v1/users/`,
}

export const GYM_ENDPOINTS = {
    GYM_BASE: `${API_BASE_URL}/api/v1/gyms/`,
}

export const PLAN_ENDPOINTS = {
    PLAN_BASE: `${API_BASE_URL}/api/v1/plans/`,
}

export const PRODUCT_ENDPOINTS = {
    PRODUCTS_ALL: `${API_BASE_URL}/api/v1/products/`,
    PRODUCTS_ADD: `${API_BASE_URL}/api/v1/products/`,
}

export const TRAINER_ENDPOINTS = {
    TRAINERS_ALL: `${API_BASE_URL}/api/v1/users/trainers/`,
    TRAINERS_ADD: `${API_BASE_URL}/api/v1/users/admin-trainer`,
    TRAINERS_UPDATE: `${API_BASE_URL}/api/v1/users/`,
    TRAINERS_DELETE: `${API_BASE_URL}/api/v1/users/`,
}

export const MEASUREMENTS_ENDPOINTS = {
    MEASUREMENTS_ID_ALL: `${API_BASE_URL}/api/v1/measurements/user/`, //add id
    MEASUREMENTS_ADD: `${API_BASE_URL}/api/v1/measurements/`,
    MEASUREMENTS_UPDATE: `${API_BASE_URL}/api/v1/measurements/`, //add id
    MEASUREMENTS_DELETE: `${API_BASE_URL}/api/v1/measurements/`, //add id
}
