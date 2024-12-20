import {Genre} from '../types';

export class Game {
    id: number;
    title: string;
    image: string;
    categories: Genre[];
    price: number;
    discount?: number | null;

    constructor(game: {
        id: number;
        title: string;
        image: string;
        categories: Genre[];
        price: number;
        discount?: number | null;
    }) {
        this.validate(game);

        this.id = game.id;
        this.title = game.title;
        this.image = game.image;
        this.categories = game.categories;
        this.price = game.price;
        this.discount = game.discount;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getImage(): string {
        return this.image;
    }

    getCategories(): Genre[] {
        return this.categories;
    }

    getPrice(): number {
        return this.price;
    }

    getDiscount(): number | undefined {
        if (this.discount !== undefined && this.discount !== null) {
            return this.discount;
        }
    }

    validate(game: {
        title: string;
        image: string;
        categories: Genre[];
        price: number;
        discount?: number | null;
    }) {
        if (!game.title?.trim()) {
            throw new Error('Title is required');
        }
        if (!game.image?.trim()) {
            throw new Error('Image is required');
        }
        if (game.categories.length === 0) {
            throw new Error('At least one category is required');
        }
        if (!game.price) {
            throw new Error('Price is required');
        }
    }

    equals(game: Game): boolean {
        return (
            this.title === game.getTitle() &&
            this.image === game.getImage() &&
            this.categories === game.getCategories() &&
            this.price === game.getPrice()
        );
    }
}
