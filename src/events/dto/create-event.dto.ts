export class CreateEventDto {
    title: string
    description?: string
    start: Date
    end: Date
    location: string
    subjectId: string
}
