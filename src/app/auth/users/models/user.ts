export class User {
    id?: number;
    fullname: string;
    username: string;
    email: string;
    password: string;
    level: number;
    access?: boolean;
    remember_token?: boolean;
    api_token: string;
}
