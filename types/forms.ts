export type Role = 'comprador' | 'vendedor';

export interface RegisterForm {
    companyName: string;
    nit?: string;
    userName: string;
    position: string;
    photoUri?: string; // local uri
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
}

export interface RegisterFormErrors {
    companyName?: string;
    userName?: string;
    position?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    photoUri?: string;
}

export const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const MAX_PHOTO_SIZE_MB = 5; // ajustar según DB
