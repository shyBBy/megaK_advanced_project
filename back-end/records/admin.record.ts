import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";
import {AdminEntity} from "../types";


type AdminResult = [AdminRecord[], FieldPacket[]];

export class AdminRecord implements AdminEntity {
    id: string;
    login: string;
    password: string;

    constructor(obj: AdminEntity) {
        this.id = obj.id;
        this.login = obj.login;
        this.password = obj.password;
    }

    async create(hash: string): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `admins` VALUES(:id, :login, :password)", {
            id: this.id,
            login: this.login,
            password: hash,
        })

        return this.id
    }

    async loginCheck(login: string): Promise<AdminResult> {
        const [result] = await pool.execute("SELECT * FROM `admins` WHERE `login` = :login", {
            login,
        })
        return result as AdminResult
    }

}