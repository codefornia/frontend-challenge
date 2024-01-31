import {CardType} from "../types/card";

type CardProps = {
    card: CardType;
    isFavorite: boolean;
    toggleFavorite: (cardId: string, isFavorite: boolean) => void;
}

export default function Card({card, isFavorite, toggleFavorite}: CardProps) {
    const {width, height, url} = card;

    return (
        <article className="card">
            <div className="card__image-wrapper">
                <img className="card__image" src={url} width={width} height={height} alt="Cat image" />
            </div>
            <button
                className={`card__favorite-button ${isFavorite ? "card__favorite-button--favorite" : "card__favorite-button--non-favorite"} button`}
                type="button"
                onClick={() => toggleFavorite(card.id, isFavorite)}
            >
                <div className="card__favorite-wrapper">
                    <svg className="card__favorite-icon card__favorite-icon--non-favorite" width="37" height="40">
                        <use xlinkHref="#icon-favorite"></use>
                    </svg>
                    <svg className="card__favorite-icon card__favorite-icon--favorite" width="37" height="40">
                        <use xlinkHref="#icon-favorite-added"></use>
                    </svg>
                    <span className="visually-hidden">в избранное</span>
                </div>
            </button>
        </article>
    )
}
