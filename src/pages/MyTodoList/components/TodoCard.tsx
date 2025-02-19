import { CloseOutlined } from '@ant-design/icons';
import { Card, Input, Typography } from 'antd';
import { useState } from 'react';
import Actions from './Actions';

const { Text } = Typography;

const TodoCard = ({ todo, onUpdate, onDelete }: MyTodoList.ITodoCardProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTodo, setEditedTodo] = useState(todo.todo);

	const handleSave = () => {
		onUpdate(todo.id, { todo: editedTodo });
		setIsEditing(false);
	};

	const handleComplete = () => {
		onUpdate(todo.id, { completed: !todo.completed });
	};

	return (
		<Card
			hoverable
			style={{display: 'flex', flexDirection: 'column' }}
			bodyStyle={{ flex: 1, overflow: 'hidden' }}
			actions={[
				<Actions
					todo={todo}
					isEditing={isEditing}
					handleComplete={handleComplete}
					handleSave={handleSave}
					setIsEditing={setIsEditing}
					onDelete={onDelete}
				/>,
			]}
		>
			<Card.Meta
				title={
					isEditing ? (
						<Input
							value={editedTodo}
							onChange={(e) => setEditedTodo(e.target.value)}
							onPressEnter={handleSave}
							suffix={
								<CloseOutlined
									onClick={() => {
										setIsEditing(false);
										setEditedTodo(todo.todo);
									}}
								/>
							}
						/>
					) : (
						<Text
							delete={todo.completed}
							ellipsis={{ tooltip: todo.todo }}
							style={{
								width: '100%',
								display: 'block',
								fontSize: '14px',
								lineHeight: '1.5',
							}}
						>
							{todo.todo}
						</Text>
					)
				}
				description={
					<Text type='secondary' style={{ fontSize: '12px' }}>
						By User: {todo.userId}
					</Text>
				} 
			/>
		</Card>
	);
};

export default TodoCard;
