const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

function buildUrl(url: string, params?: Record<string, string>): string {
    if (!params) return url;
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value);
    });
    return `${url}?${searchParams.toString()}`;
}

async function request<T>(method: string, endpoint: string, data?: object, options?: RequestOptions): Promise<T> {
    let url = API_BASE_URL + endpoint;

    // Para GET, incorporar los query params (si existen)
    if (method === "GET" && options?.params) {
        url = buildUrl(url, options.params);
    }

    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers
        },
        credentials: options?.credentials || "include",
        // Extender otras opciones pasadas (evitando duplicar params)
        ...options,
    };

    // Eliminar propiedad "params" para no enviarla con fetch
    if ("params" in config) {
        delete config.params;
    }

    if (data) {
        config.body = JSON.stringify(data);
    }

    const res = await fetch(url, config);

    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
}

export const httpService = {
    get: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
        request<T>("GET", endpoint, undefined, options),
    post: <T>(endpoint: string, data?: object, options?: RequestOptions): Promise<T> =>
        request<T>("POST", endpoint, data, options),
    put: <T>(endpoint: string, data?: object, options?: RequestOptions): Promise<T> =>
        request<T>("PUT", endpoint, data, options),
    delete: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
        request<T>("DELETE", endpoint, undefined, options)
};