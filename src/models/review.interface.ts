
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

// export interface IReview {
//     review_id: number;
//     event_id: number;
//     user_name: string;
//     review_text: string;
//     created_at: string;
//     is_approved: boolean;
// }

// src/models/review.interface.ts
export interface IReview {
    review_id: number;        // id отзыва
    user_name: string;        // имя пользователя
    review_text: string;      // текст отзыва
    created_at: string;       // дата создания (формат: "2024-03-21 15:30:45")
    is_approved: boolean;     // одобрен ли отзыв (true/false)
    event_id: number;         // id мероприятия
    image_link?: string;      // ссылка на изображение (опционально)
}