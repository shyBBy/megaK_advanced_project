import {createContext} from "react";

export const SearchContext = createContext({
    search: '',
    setSearch: (s:string) => {} // tak dziala context, deklarujemy sobie jedynie funkcji, a gdzies musimy zrobic wspolny stan gdzie to bedzi trzymane - czyli najwyzszy komponent Appo
})