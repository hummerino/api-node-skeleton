export class ApiResponse<T> {

    constructor( 
        public data: T,
        public code: number = 200, 
        public message: string = 'OK' ) {

    }
    
}