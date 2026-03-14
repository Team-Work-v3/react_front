
export interface IReview {
    id: number;
    event_id: number;
    author_name: string;
    text: string;
    rating?: number; // если есть рейтинг
    created_at: string;
    updated_at?: string;
}