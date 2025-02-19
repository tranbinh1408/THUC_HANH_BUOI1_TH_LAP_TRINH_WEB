import { DUMMY_TODO } from '@/utils/ip';
import axios from 'axios';

export const todoService = {
	getTodoList: async (limit?: number) => {
		try {
			const res = await axios.get(DUMMY_TODO, {
				params: {
					limit: limit,
				},
			});
			return {
				status: 200,
				payload: res.data.todos,
				error: null,
			};
		} catch (error) {
			console.error('Failed to fetch todo data:', error);
			return {
				status: 500,
				payload: null,
				error: error,
			};
		}
	},

	addTodo: async (todo: Omit<MyTodoList.ITodo, 'id'>) => {
		try {
			const res = await axios.post(`${DUMMY_TODO}/add`, todo);
			return {
				status: 200,
				payload: res.data,
				error: null,
			};
		} catch (error) {
			console.error('Failed to add todo:', error);
			return {
				status: 500,
				payload: null,
				error: error,
			};
		}
	},

	updateTodo: async (id: number, todo: Partial<MyTodoList.ITodo>) => {
		try {
			const res = await axios.put(`${DUMMY_TODO}/${id}`, todo);
			return {
				status: 200,
				payload: res.data,
				error: null,
			};
		} catch (error) {
			console.error('Failed to update todo:', error);
			return {
				status: 500,
				payload: null,
				error: error,
			};
		}
	},

	deleteTodo: async (id: number) => {
		try {
			const res = await axios.delete(`${DUMMY_TODO}/${id}`);
			return {
				status: 200,
				payload: res.data,
				error: null,
			};
		} catch (error) {
			console.error('Failed to delete todo:', error);
			return {
				status: 500,
				payload: null,
				error: error,
			};
		}
	},

	searchTodo: async (id: string) => {
		try {
			const res = await axios.get(`${DUMMY_TODO}/${id}`);
			return {
				status: 200,
				payload: res.data.todos,
				error: null,
			};
		} catch (error) {
			console.error('Failed to search todo:', error);
			return {
				status: 500,
				payload: null,
				error: error,
			};
		}
	},
};
