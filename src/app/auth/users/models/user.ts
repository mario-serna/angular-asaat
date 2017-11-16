export class User {
    id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    level: number;
    access?: boolean;
    remember_token?: boolean;
    api_token: string;
}
