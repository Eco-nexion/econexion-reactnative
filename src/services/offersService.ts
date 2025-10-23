import apiClient from './axiosConfig';

export interface Offer {
    id: string;
    postId: string;
    userId: string;
    amount: number;
    message?: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
    createdAt: string;
    updatedAt: string;
    post?: {
        id: string;
        title: string;
        wasteType: string;
        imageUrl?: string;
    };
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface CreateOfferRequest {
    postId: string;
    amount: number;
    message?: string;
}

export interface UpdateOfferRequest {
    amount?: number;
    message?: string;
    status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
}

class OffersService {
    // Obtener todas las ofertas
    async getOffers(): Promise<Offer[]> {
        try {
            const response = await apiClient.get<Offer[]>('/offers');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al obtener ofertas');
        }
    }

    // Obtener una oferta por ID
    async getOfferById(id: string): Promise<Offer> {
        try {
            const response = await apiClient.get<Offer>(`/offers/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al obtener la oferta');
        }
    }

    // Crear una nueva oferta
    async createOffer(offerData: CreateOfferRequest): Promise<Offer> {
        try {
            const response = await apiClient.post<Offer>('/offers/new', offerData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al crear oferta');
        }
    }

    // Actualizar una oferta
    async updateOffer(id: string, offerData: UpdateOfferRequest): Promise<Offer> {
        try {
            const response = await apiClient.put<Offer>(`/offers/update/${id}`, offerData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al actualizar oferta');
        }
    }

    // Eliminar una oferta
    async deleteOffer(id: string): Promise<void> {
        try {
            await apiClient.delete(`/offers/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al eliminar oferta');
        }
    }

    // Obtener ofertas recibidas (para generadores)
    async getReceivedOffers(): Promise<Offer[]> {
        try {
            const response = await apiClient.get<Offer[]>('/offers/received');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al obtener ofertas recibidas');
        }
    }

    // Obtener ofertas enviadas (para recicladores)
    async getSentOffers(): Promise<Offer[]> {
        try {
            const response = await apiClient.get<Offer[]>('/offers/sent');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error al obtener ofertas enviadas');
        }
    }

    // Aceptar una oferta
    async acceptOffer(id: string): Promise<Offer> {
        return this.updateOffer(id, { status: 'ACCEPTED' });
    }

    // Rechazar una oferta
    async rejectOffer(id: string): Promise<Offer> {
        return this.updateOffer(id, { status: 'REJECTED' });
    }
}

export default new OffersService();