import DatabaseSchema from "../interfaces/DatabaseSchema";

export default abstract class BaseRepository {
    protected database: DatabaseSchema;

    constructor(database: DatabaseSchema) {
        this.database = database;
    }

    public getNextId(){
        if (this.table.length === 0) {
            return 1;
        }
        return this.table[this.table.length - 1].id + 1;
    }

    abstract get table(): DatabaseSchema[keyof DatabaseSchema]
}

