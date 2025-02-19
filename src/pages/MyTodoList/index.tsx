import { useMyTodoList } from '@/hooks/useMyTodoList';
import TodoCard from '@/pages/MyTodoList/components/TodoCard';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, List, Row, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';

const MyToDoList = () => {
	const { data, loading, loadMore, addTodo, updateTodo, deleteTodo } = useMyTodoList();
	const [form] = Form.useForm();

	const handleAddTodo = async (values: { todo: string }) => {
		await addTodo({ todo: values.todo, completed: false, userId: 1 });
		form.resetFields();
	};

	return (
		<div>
			<Title level={2}>My Todo List</Title>
			<Form
				form={form}
				onFinish={handleAddTodo}
				style={{
					width: '50%',
				}}
			>
				<Row gutter={16}>
					<Col xs={24} sm={18}>
						<Form.Item name='todo' rules={[{ required: true, message: 'Todo can not be blank' }]}>
							<Input placeholder='Add a new todo' />
						</Form.Item>
					</Col>
					<Col xs={24} sm={6}>
						<Button
							type='primary'
							htmlType='submit'
							icon={<PlusOutlined />}
							block
							disabled={loading}
							style={{
								width: 'fit-content',
							}}
						>
							Add Todo
						</Button>
					</Col>
				</Row>
			</Form>

			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 3,
					lg: 3,
					xl: 4,
					xxl: 4,
				}}
				dataSource={data}
				renderItem={(item) => (
					<List.Item key={item.id}>
						<TodoCard todo={item} onUpdate={updateTodo} onDelete={deleteTodo} />
					</List.Item>
				)}
			/>
			{loading && (
				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					<Spin size='large' />
				</div>
			)}
			{!loading && data.length >= 16 && (
				<div style={{ textAlign: 'center' }}>
					<Button type='primary' onClick={loadMore}>
						Load More
					</Button>
				</div>
			)}
		</div>
	);
};

export default MyToDoList;
