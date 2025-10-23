/**
 * Claves para almacenamiento seguro (SecureStore)
 */
export const STORAGE_KEYS = {
    token: 'EconexionToken',
    user_name: 'EconexionName',
    user_email: 'EconexionEmail',
    user_id: 'EconexionUserId',
    user_type: 'EconexionUserType',
} as const;

/**
 * Tipo para las claves de almacenamiento
 */
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
