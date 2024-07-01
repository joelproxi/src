import { IUserModel } from "./UserModel";

export interface IMessage {
    id: number;
    conversation: number;
    receiver: IUserModel;
    sender: IUserModel;
    text_content: string;
    status: string;
    is_edited: string;
    created_at: string;
    updated_at: string;
}