import { Todopriority } from "./todo-priority";
import { TodoStatus } from "./todo-status";

export interface TodoItem {
    id : number;
    description : string;
    duDate : Date;
    status : TodoStatus
    priority : Todopriority
}





