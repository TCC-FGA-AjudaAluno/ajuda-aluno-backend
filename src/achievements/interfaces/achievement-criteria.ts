export interface AchievementCriteria {
    code: string
    criteria: (data?: any) => Promise<boolean> 
}