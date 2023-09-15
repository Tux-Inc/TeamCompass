export interface Chat {
    id: number;
    message: string;
    status: number;
    user: {id: number, distant_id: number}
    conversationId: number;
    created_at: Date;
    updated_at: Date;
}