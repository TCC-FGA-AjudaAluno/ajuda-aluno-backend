export class PostListItem {
    id: string
    title: string
    content: string
    createdAt: Date
    author: {
        id: string
        name: string
        email: string
        registrationNumber: string
    }
    comments: number
}