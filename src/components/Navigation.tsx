import {FilterType, FilterTypeEnum} from "../types/filter";

type FiltersProps = {
    selectedFilter: FilterTypeEnum;
    setSelectedFilter: (selectedFilter: FilterTypeEnum) => void;
}

const Filters: FilterType[] = [
    {
        type: FilterTypeEnum.All,
        label: "Все котики"
    },
    {
        type: FilterTypeEnum.Favorite,
        label: "Любимые котики"
    }
]


export default function Navigation({selectedFilter, setSelectedFilter}: FiltersProps) {
    return (
        <nav className="header__nav">
            <ul className="header__nav-list">
                {Filters.map((filter) => (
                    <li className="header__nav-item" key={filter.type}>
                        <button
                            className={`header__nav-button ${selectedFilter === filter.type && "header__nav-button--active"}`}
                            onClick={() => setSelectedFilter(filter.type)
                        }>
                            <span>{filter.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}