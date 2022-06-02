import { Course } from "../models/course.model";
import { MongoDB } from "../utils/mongodb.utils";


export class CourseCategoryRepository extends MongoDB<Course>  {
    
    protected collection = 'course-categories';

}