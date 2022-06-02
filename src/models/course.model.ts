import { Category } from "./category.model";
import { Lesson } from "./lesson.model";

export interface Course {
    id: string;
    imageURL: string;
    title: string;
    description: string;
    author: string;
    createDate: string;
    language: string;
    price: number;
    rating: number;
    avaiable: true,
    categories: Category;
    lessons: Lesson[];
}



