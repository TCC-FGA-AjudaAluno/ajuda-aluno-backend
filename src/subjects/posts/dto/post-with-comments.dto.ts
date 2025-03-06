import { CommentListItem } from "./comment-list-item.dto"

export class PostWithCommentsDTO {
    id: string
    content: string
    title: string
    subjectId: string
    createdAt: Date
    author: {
        id: string,
        name: string
        email: string
        registrationNumber: string
    }
    comments: CommentListItem[]
}