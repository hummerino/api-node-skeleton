import { Category } from "models/category.model";
import { MongoDB } from "../utils/mongodb.utils";


export class CourseCategoryRepository extends MongoDB<Category>  {
    
    protected collection = 'course-categories';

}