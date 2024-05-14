import { DueDate } from "./due-date";
import { Todopriority } from "./todo-priority";
import { TodoStatus } from "./todo-status";

export interface TodoItem {
    id : number;
    description : string;
    duDate : DueDate;
    status : TodoStatus
    priority : Todopriority
}





