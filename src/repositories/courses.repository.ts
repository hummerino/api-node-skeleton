import { Course } from "../models/course.model";
import { MongoDB } from "../utils/mongodb.utils";


export class CourseRepository extends MongoDB<Course>  {
    
    protected collection = 'courses';

}