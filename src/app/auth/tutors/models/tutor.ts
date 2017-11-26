import { User } from '../../users/models/user';

export class Tutor {
    id?: number;
    worker_number: number|string;
    name: string;
    lastname: string;
    m_lastname?: string;
    alt_email?: string;
    user_id?: number;
    user?: User;
}
