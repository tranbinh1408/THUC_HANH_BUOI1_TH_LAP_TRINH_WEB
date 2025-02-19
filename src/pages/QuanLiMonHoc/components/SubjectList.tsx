import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { useState } from 'react';

const SubjectList = ({ subjects, setSubjects, setSelectedSubject }: QuanLiMonHoc.ISubjectListProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const [editingSubject, setEditingSubject] = useState<string | null>(null);

	const showModal = (subject: string | null = null, e: React.MouseEvent) => {
        e.stopPropagation();
		setEditingSubject(subject);
		form.setFieldsValue({ subject: subject || '' });
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form.validateFields().then((values) => {
			if (editingSubject) {
				setSubjects((prevSubjects) => prevSubjects.map((s) => (s === editingSubject ? values.subject : s)));
			} else if (!subjects.includes(values.subject)) {
				setSubjects((prevSubjects) => [...prevSubjects, values.subject]);
			} else {
				message.error('Môn học đã tồn tại');
				return;
			}
			setIsModalVisible(false);
			form.resetFields();
		});
	};

	const handleDelete = (subject: string,  e: React.MouseEvent) => {
		e.stopPropagation();
		Modal.confirm({
			title: 'Bạn có chắc chắn muốn xóa môn học này?',
			content: 'Không thể thu hồi lại hành động này',
			onOk() {
				setSubjects((prevSubjects) => prevSubjects.filter((s) => s !== subject));
			},
		});
	};

	const columns = [
		{
			title: 'Môn học',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: { subject: string }) => (
				<div
				style={{
					display: 'flex',
					justifyContent: 'center', 
					alignItems: 'center',    
					width: '100%'            
				}}
				>
					<Button icon={<EditOutlined />} onClick={(e) => showModal(record.subject, e)} style={{ marginRight: 8 }}>
						Sửa
					</Button>
					<Button icon={<DeleteOutlined />} onClick={(e) => handleDelete(record.subject, e)} danger>
						Xóa
					</Button>
				</div>
			),
		},
	];

	return (
		<>
			<h2>Danh sách môn học</h2>
			<Button type='primary' icon={<PlusOutlined />} onClick={(e) => showModal(null, e)} style={{ marginBottom: 16 }}>
				Thêm môn học mới
			</Button>
			<Table
				columns={columns}
				dataSource={subjects.map((subject) => ({ key: subject, subject }))}
				onRow={(record) => ({
					onClick: () => setSelectedSubject(record.subject),
				})}
			/>
			<Modal
				title={editingSubject ? 'Sửa môn học' : 'Thêm môn học mới'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={() => {
					setIsModalVisible(false);
					form.resetFields();
				}}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						name='subject'
						label='Tên môn học'
						rules={[{ required: true, message: 'Vui lòng nhập tên môn học' }]}
						
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default SubjectList;
