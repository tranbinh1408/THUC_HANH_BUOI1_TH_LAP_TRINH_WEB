import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Checkbox, Popconfirm, Space } from 'antd';

const Actions = ({ todo, isEditing, handleComplete, handleSave, setIsEditing, onDelete }: MyTodoList.IActionsProps) => {
	return (
		<Space size='middle' style={{ width: '100%', display: 'flex', justifyItems: 'between', justifyContent: 'center' }}>
			<Checkbox checked={todo.completed} onChange={handleComplete} style={{ fontSize: '12px' }}>
				{todo.completed ? 'Done' : 'Mark as done'}
			</Checkbox>

			{isEditing ? (
				<SaveOutlined key='save' onClick={handleSave} />
			) : (
				<EditOutlined key='edit' onClick={() => setIsEditing(true)} />
			)}

			<Popconfirm title='Delete this task?' onConfirm={() => onDelete(todo.id)} okText='Yes' cancelText='No'>
				<DeleteOutlined style={{ color: '#ff4d4f' }} />
			</Popconfirm>
		</Space>
	);
};

export default Actions;
