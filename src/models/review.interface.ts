
// export interface IReview {
//     id: number;
//     event_id: number;
//     author_name: string;
//     text: string;
//     rating?: number; // если есть рейтинг
//     created_at: string;
//     updated_at?: string;
// }

// export interface IReview {
//   review_id: number;
//   event_id: number;
//   user_name: string;
//   review_text: string;
//   created_at: string;
//   is_approved: boolean;
// }

export interface IReview {
    review_id: number;
    event_id: number;
    user_name: string;
    review_text: string;
    created_at: string;
    is_approved: boolean;
}