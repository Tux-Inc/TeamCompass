import {IUser} from "./User";

export interface IFullUser extends IUser {
    birth_date: string;
    gender: string;
    work: string;
    subordinates: number[];
}