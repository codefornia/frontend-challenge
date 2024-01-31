import Navigation from "./Navigation";
import {FilterTypeEnum} from "../types/filter";

type HeaderProps = {
    selectedFilter: FilterTypeEnum;
    setSelectedFilter: (selectedFilter: FilterTypeEnum) => void;
}

export default function Header({selectedFilter, setSelectedFilter}: HeaderProps) {
    return (
        <header className="header">
            <div className="header__wrapper">
                <Navigation selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            </div>
        </header>
    );
}
