import { Card, Button, Table, Modal, Space, message } from 'antd';
import { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import SubjectForm from './components/Form';

interface Subject {
  id: string;
  name: string;
  description?: string;
}

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<Subject | undefined>();

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  // Save to localStorage whenever subjects change
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleAdd = () => {
    setEditingId(null);
    setEditingRecord(undefined);
    setVisible(true);
  };

  const handleEdit = (record: Subject) => {
    setEditingId(record.id);
    setEditingRecord(record);
    setVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa môn học này?',
      onOk: () => {
        setSubjects(subjects.filter(subject => subject.id !== id));
        message.success('Xóa môn học thành công');
      }
    });
  };

  const handleSubmit = (values: any) => {
    if (editingId) {
      // Edit existing subject
      setSubjects(subjects.map(subject => 
        subject.id === editingId ? { ...values, id: editingId } : subject
      ));
      message.success('Cập nhật môn học thành công');
    } else {
      // Add new subject
      const newSubject = {
        ...values,
        id: Date.now().toString(),
      };
      setSubjects([...subjects, newSubject]);
      message.success('Thêm môn học thành công');
    }
    setVisible(false);
  };

  const columns: ColumnsType<Subject> = [
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      align: 'center' as const,
      render: (_, record: Subject) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý môn học">
      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Thêm môn học
      </Button>

      <Table 
        columns={columns} 
        dataSource={subjects}
        rowKey="id"
      />

      <SubjectForm
        visible={visible}
        editingId={editingId}
        initialValues={editingRecord}
        onCancel={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default SubjectManagement; 