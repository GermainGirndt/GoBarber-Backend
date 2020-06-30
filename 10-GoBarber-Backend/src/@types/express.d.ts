// adding new parameter type to express' requests
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}
