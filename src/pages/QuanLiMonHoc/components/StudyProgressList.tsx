import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Table, TimePicker } from 'antd';
import { useState } from 'react';

const StudyProgressList = ({
	subject,
	progress,
	setProgress,
	setSelectedSubject,
}: QuanLiMonHoc.IStudyProgressListProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const columns = [
		{ title: 'Ngày', dataIndex: 'date', key: 'date' },
		{ title: 'Thời gian', dataIndex: 'time', key: 'time' },
		{ title: 'Thời lượng tiết', dataIndex: 'duration', key: 'duration' },
		{ title: 'Nội dung', dataIndex: 'content', key: 'content' },
		{ title: 'Ghi chú', dataIndex: 'notes', key: 'notes' },
		{
			title: 'Thao tác',
			key: 'action',
			render: (_text: string, record: any) => (
				<Button onClick={() => handleDelete(record.key)} danger>
					Xóa
				</Button>
			),
		},
	];

	const handleDelete = (key: string) => {
		setProgress((prevProgress) => prevProgress.filter((item) => item.key !== key));
	};

	const handleAdd = (values: any) => {
		const newProgress = {
			key: Date.now().toString(),
			subject,
			date: values.date.format('DD-MM-YYYY'),
			time: values.time.format('HH:mm'),
			duration: values.duration,
			content: values.content,
			notes: values.notes,
		};
		setProgress((prevProgress) => [...prevProgress, newProgress]);
		setIsModalVisible(false);
		form.resetFields();
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 16,
			}}
		>
			<Button
				icon={<ArrowLeftOutlined />}
				onClick={() => setSelectedSubject(null)}
				style={{
					width: 'fit-content',
				}}
			>
				Quay lại danh sách môn học
			</Button>
			<h2>{subject}</h2>
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={() => setIsModalVisible(true)}
				style={{
					width: 'fit-content',
				}}
			>
				Thêm tiến độ học tập
			</Button>
			<Table columns={columns} dataSource={progress.filter((item) => item.subject === subject)} />

			<Modal
				title='Thêm tiến độ học tập'
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<Form form={form} onFinish={handleAdd} layout='vertical'>
					<Form.Item name='date' label='Ngày' rules={[{ required: true }]}>
						<DatePicker />
					</Form.Item>
					<Form.Item name='time' label='Thời gian' rules={[{ required: true }]}>
						<TimePicker format='HH:mm' />
					</Form.Item>
					<Form.Item name='duration' label='Thời lượng (phút)' rules={[{ required: true }]}>
						<Input type='number' />
					</Form.Item>
					<Form.Item name='content' label='Nội dung' rules={[{ required: true }]}>
						<Input.TextArea />
					</Form.Item>
					<Form.Item name='notes' label='Ghi chú'>
						<Input.TextArea />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit'>
							Thêm
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default StudyProgressList;
