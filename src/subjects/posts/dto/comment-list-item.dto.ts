export class CommentListItem {
    id: string
    content: string
    createdAt: Date
    author: {
        id: string
        name: string
    }
    vote: string
    upvotes: number
    downvotes: number
}