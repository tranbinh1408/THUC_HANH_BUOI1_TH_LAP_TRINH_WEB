import { todoService } from '@/services/MyTodoList';
import { useEffect, useState } from 'react';

export const useMyTodoList = (initialLimit: number = 16) => {
	const [data, setData] = useState<MyTodoList.ITodo[]>([]);
	const [currentLimit, setCurrentLimit] = useState<number>(initialLimit);
	const [loading, setLoading] = useState<boolean>(true);

	const getTodo = async (limit: number) => {
		setLoading(true);
		const res = await todoService.getTodoList(limit);
		if (res.status === 200) {
			setData(res.payload);
		} else {
			console.error('Failed to fetch todo data:', res.error);
		}
		setLoading(false);
	};

	const addTodo = async (todo: Omit<MyTodoList.ITodo, 'id'>) => {
		const res = await todoService.addTodo(todo);
		if (res.status === 200) {
			setData((prevData) => [...prevData, res.payload]);
		}
		return res;
	};

	const updateTodo = async (id: number, updates: Partial<MyTodoList.ITodo>) => {
		const res = await todoService.updateTodo(id, updates);
		if (res.status === 200) {
			setData((prevData) => prevData.map((todo) => (todo.id === id ? { ...todo, ...res.payload } : todo)));
		}
		return res;
	};

	const deleteTodo = async (id: number) => {
		const res = await todoService.deleteTodo(id);
		if (res.status === 200) {
			setData((prevData) => prevData.filter((todo) => todo.id !== id));
		}
		return res;
	};

	const loadMore = () => setCurrentLimit((prev) => prev + 16);

	const searchTodo = async (search: string) => {
		const res = await todoService.searchTodo(search);
		if (res.status === 200) {
			setData(res.payload);
		}
		return res;
	};

	useEffect(() => {
		getTodo(currentLimit);
	}, [currentLimit]);

	return {
		data,
		loading,
		loadMore,
		addTodo,
		updateTodo,
		deleteTodo,
		getTodo,
		searchTodo,
	};
};
