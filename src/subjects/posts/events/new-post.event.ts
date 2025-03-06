export class NewPostEvent {
    authorId: string
    postId: string
    constructor(postId: string, authorId: string) {
        this.authorId = authorId
        this.postId = postId
    }
}