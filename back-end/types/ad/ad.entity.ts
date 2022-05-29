export interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export interface SimpleAdEntity {
    id: string;
    title: string;
    lat: number;
    lon: number;
}


export interface AdEntity extends SimpleAdEntity {
    title: string;
    description: string;
    url: string;
    status: string;
    added_at: string;
    price: number;
}