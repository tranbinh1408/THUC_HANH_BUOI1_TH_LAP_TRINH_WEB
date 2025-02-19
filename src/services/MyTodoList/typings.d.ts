declare module MyTodoList {
	export interface ITodo {
		id: number;
		todo: string;
		completed: boolean;
		userId: number;
	}
	
	export interface ITodoCardProps {
		todo: ITodo;
		onUpdate: (id: number, updates: Partial<ITodo>) => Promise<ITodoResponse>;
		onDelete: (id: number) => Promise<ITodoResponse>;
	}

	export interface IActionsProps {
		todo: ITodo;
		isEditing: boolean;
		handleComplete: () => void;
		handleSave: () => void;
		setIsEditing: (isEditing: boolean) => void;
		onDelete: (id: number) => void;
	}

	export interface ITodoResponse {
		status: number;
		payload: MyTodoList.ITodo[] | null;
		error: any;
	}


}
