export class CreatePostRequestDTO {
    title: string
    content: string
}

export class CreatePostDTO {
    title: string
    content: string
    subjectId: string
    userId: string

    constructor(dto: CreatePostRequestDTO, subjectId: string, userId: string) {
        this.title = dto.title
        this.content = dto.content
        this.subjectId = subjectId
        this.userId = userId
    }
}