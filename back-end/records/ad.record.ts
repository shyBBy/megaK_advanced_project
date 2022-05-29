import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";
import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";

type AdRecordResults = [AdRecord[], FieldPacket[]];


export class AdRecord implements AdEntity {
    id: string;
    title: string;
    description: string;
    url: string;
    status: string;
    price: number;
    added_at: string;
    lat: number;
    lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.title || obj.title.length < 3 || obj.title.length > 55) {
            throw new ValidationError(`Announcement's title should be longer then 3 sign and shorter then 55 signs.`);
        }

        // @TODO: Check if URL is valid!
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków.');
        }

        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.url = obj.url;
        this.status = obj.status;
        this.added_at = obj.added_at;
        this.price = obj.price;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    async create(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
            this.status = 'inactive';
            const date = new Date();
            this.added_at = (date.getUTCDate()) + "." + (date.getMonth() + 1)+ "." + (date.getUTCFullYear());
        }

        await pool.execute("INSERT INTO `ads` VALUES(:id, :title, :description, :url, :status, :added_at, :price, :lat, :lon)", this);
    }

    static async listAll(title: string): Promise<SimpleAdEntity[]> {
        // TODO: sprawdzić o co chodzi z AdRecordResults i FieldPacket
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `title` LIKE :search", {
            search: `%${title}%`,
        }) as AdRecordResults;
            //  |   aby wyjąc [results] to musimy go w odpowiedni sposób zwrócić tak jak poniżej (strzałką)
            //  |   ponieważ obiecujemy w Promise<> obiekty, a nie zwykłe dane z bazy danych
            //  v   i na results robimy metode .map aby zrobić z niego obiekt na bazie obiektu, którym jest result
        return results.map(result => {      //
            const {                         //   <-----  w tym miejscu robimy destrukturyzacje obiektu results
                id, title, lat, lon,               //
            } = result;                     //
                                            //
            return {                        //
                id, title, lat, lon,               //     <---- a tu wklejam "skopiowany" wynik z powyzszej restrukturyzacji
            };                              //           do return
        });                                 //      Daje nam to efekt dzięki, któremy dostajemy niepełny rekord, a jedynie wycinek infomacji
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `id` = :id", {
            id,
        }) as AdRecordResults;
        // TODO: sprawdzić o co chodzi z zwracaniem wyniku pojedynczego getOne
        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    // static async getOneAndChangeStatus(id: string, status: string): Promise<string> {
    //     await pool.execute("UPDATE `ads` SET `status` = :status WHERE `id` =:id", {
    //         id,
    //         status,
    //     })
    //     return status;
    // }
    //
    // static async delete(id: string) {
    //     if (!id){
    //         throw new Error('The ad with the given id does not exist.')
    //     }
    //     await pool.execute("DELETE FROM `ads` WHERE `id` = :id", {
    //         id,
    //     })
    // }
}