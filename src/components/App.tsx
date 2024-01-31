import Header from "./Header";
import {useState} from "react";
import {FilterTypeEnum} from "../types/filter";
import Cards from "./Cards";

export default function App() {
    const [selectedFilter, setSelectedFilter] = useState(FilterTypeEnum.All);
    return (
        <>
            <Header selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            <Cards selectedFilter={selectedFilter} />
        </>
    );
}
