// TypeScript type definitions

export { isEmailValid, MAX_PHOTO_SIZE_MB } from './forms';
export type { RegisterForm, RegisterFormErrors, Role } from './forms';

/**
 * Datos básicos del usuario almacenados localmente
 */
export interface UserData {
    name: string;
    email: string;
    userType: string;
}

/**
 * Labels legibles para los tipos de usuario
 */
export const USER_TYPE_LABELS: Record<string, string> = {
    compra: 'Comprador',
    comprador: 'Comprador',
    vende: 'Vendedor',
    vendedor: 'Vendedor',
    genera: 'Generador',
    generador: 'Generador',
} as const;
