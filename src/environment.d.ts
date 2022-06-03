declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CONNECTION_STRING: string;
            CONNECTION_DB: string;
        }
    }
}

export {};