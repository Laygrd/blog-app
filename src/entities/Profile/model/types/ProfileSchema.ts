import { Country } from "entities/Country";
import { Currency } from "entities/Currency";


export interface Profile {
    id?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    avatar?: string;
    age?: number | string;
    country?: Country;
    city?: string;
    currency?: Currency;
};
