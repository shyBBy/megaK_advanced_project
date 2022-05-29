import {AdEntity} from "./ad.entity";

export type CreateAdReq = Omit<AdEntity, 'id' | 'status' | 'added_at'>; // czyli weź cały typ GiftEntity i usuń z niego 'id'