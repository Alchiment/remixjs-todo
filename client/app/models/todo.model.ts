import {UserInterface, UserModel} from "~/models/user.model";

export interface TodoInterface {
    _id?: string;
    title: string;
    description: string;
    completed: boolean;
    isDeleted?: boolean;
    user: UserInterface;
}

export class TodoModel implements TodoInterface {
    _id?: string;
    title: string;
    description: string;
    completed: boolean;
    isDeleted?: boolean;
    user: UserInterface;

    constructor(todo?: TodoInterface) {
        this._id = todo?._id || '';
        this.title = todo?.title || '';
        this.description = todo?.description || '';
        this.completed = !!todo?.completed;
        this.isDeleted = !!todo?.isDeleted;
        this.user = new UserModel(todo?.user);
    }

    public mapToSave() {
        return {
            _id: this._id,
            title: this.title,
            description: this.description,
            completed: this.completed,
            isDeleted: this.isDeleted,
        };
    }
}