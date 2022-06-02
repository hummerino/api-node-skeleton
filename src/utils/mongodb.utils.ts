import { Db, EnhancedOmit, Filter, MongoClient, OptionalUnlessRequiredId, WithId, WithoutId } from "mongodb";
var ObjectId = require('mongodb').ObjectID;


export abstract class MongoDB<T> {

    /*
    *
    */
    protected abstract collection: string;

    /*
    *
    */
    private async getNewClient(){
        const client: MongoClient = new MongoClient(process.env.CONNECTION_STRING);
        return client.connect();
    }

    /*
    *
    */
    public async insertDocument( doc: T ): Promise<string> {
        try{
            const client = await this.getNewClient();
            const db = client.db(process.env.CONNECTION_DB);
            const result = await db.collection<T>(this.collection).insertOne( doc as OptionalUnlessRequiredId<T> );
            const newId: string = result.insertedId?.toString();
            this.updateDocument( newId, doc );
            return newId;
        }catch ( error ) {
            console.log( error );
            throw error;
        }
    }

    /*
    *
    */
    public async getDocuments( filter: Filter<T> = null ): Promise<T[]> {
        let docs: WithId<T>[];

        try{
            const client = await this.getNewClient();
            const db = client.db(process.env.CONNECTION_DB);
            docs = await db.collection<T>(this.collection).find(filter).toArray();
            return docs.map( ( el: WithId<T> ) =>
                {
                    const id = el._id.toString();
                    delete el._id;
                    return { id, ...el } as T;
                } 
            );
        }catch ( error ) {
            console.log( error );
            throw error;
        }
        
    }

    /*
    *
    */
    public async updateDocument( id: string, value: T ): Promise<boolean> {

        try{
            const client = await this.getNewClient();
            const db = client.db(process.env.CONNECTION_DB);
            const updateResult = await db.collection<T>( this.collection ).updateOne( 
                { "_id" : ObjectId( id ) }, 
                { $set:{ id, ...value } } 
            );
            return updateResult.modifiedCount > 0;
        }catch ( error ) {
            console.log( error );
            throw error;
        }
    }

    /*
    *
    */
    public async deleteDocument( id: string ): Promise<boolean> {
        
        try{
            const client = await this.getNewClient();
            const db = client.db(process.env.CONNECTION_DB);
            const updateResult = await db.collection<T>( this.collection ).deleteOne(
                {
                    _id: ObjectId( id )
                }
            );
            return updateResult.deletedCount > 0;
        }catch ( error ) {
            console.log( error );
            throw error;
        }
    }
}