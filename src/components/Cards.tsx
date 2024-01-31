import {useCallback, useEffect, useState} from "react";
import {CardType} from "../types/card";
import Card from "./Card";
import {API_KEY} from "../const";
import {FilterTypeEnum} from "../types/filter";

type CardsProps = {
    selectedFilter: FilterTypeEnum;
}

export default function Cards({selectedFilter}: CardsProps) {
    const [cards, setCards] = useState<CardType[]>([]);
    const [favoriteCardIds, setFavoriteCardIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchCards = useCallback(async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        fetch(`https://api.thecatapi.com/v1/images/search?limit=20&api_key=${API_KEY}`)
            .then((response) => {
                return response.json();
            })
            .then((data: {id: string, url: string, width: number, height: number}[]) => {
                const responseCards = data.map((record) => {
                    return {
                        id: record.id + Date.now(),
                        externalId: record.id,
                        url: record.url,
                        width: record.width,
                        height: record.height,
                    }
                })

                setCards([...cards, ...responseCards])
            })
            .finally(() => setIsLoading(false))
            .catch(() => console.log('API Request Failed'));
    }, [isLoading]);

    useEffect(() => {
        fetchCards();
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                fetchCards();
            }
        };

        if (selectedFilter === FilterTypeEnum.All) {
            window.addEventListener("scroll", handleScroll);
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchCards, selectedFilter]);

    function toggleFavorite(cardId: string, isFavorite: boolean): void {
        if (isFavorite) {
            setFavoriteCardIds(favoriteCardIds.filter((favCardId) => favCardId !== cardId));
            return;
        }

        setFavoriteCardIds([...favoriteCardIds, cardId]);
    }

    function getFilteredCards(): CardType[] {
        switch (selectedFilter) {
            case FilterTypeEnum.All:
                return cards;
            case FilterTypeEnum.Favorite:
                return cards.filter((card) => favoriteCardIds.includes(card.id))
        }
    }

    return (
        <main className="main">
            <div className="main__wrapper">
                <h1 className="visually-hidden">Пинтерест с котиками</h1>
                <div className="cards__list">
                    {getFilteredCards().map((card) => (
                        <Card key={card.id} card={card} isFavorite={favoriteCardIds.includes(card.id)} toggleFavorite={toggleFavorite} />
                    ))}
                </div>
                {isLoading && (
                    <p className={selectedFilter === FilterTypeEnum.All ? "cards__loading" : "visually-hidden"}>... загружаем еще котиков ...</p>
                )}
            </div>
        </main>
    );
}