
export interface User {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface UserRegiser{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}