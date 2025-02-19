import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Space, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

// Danh sách môn học mặc định
const DEFAULT_SUBJECTS = [
  { label: 'Toán', value: 'Toán' },
  { label: 'Văn', value: 'Văn' },
  { label: 'Anh', value: 'Anh' },
  { label: 'Khoa học', value: 'Khoa học' },
  { label: 'Công nghệ', value: 'Công nghệ' },
];

interface SubjectFormProps {
  visible: boolean;
  editingId: string | null;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: {
    name?: string;
    description?: string;
  };
}

const SubjectForm: React.FC<SubjectFormProps> = ({ visible, editingId, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const [customSubjects, setCustomSubjects] = useState<{ label: string; value: string }[]>([]);

  // Load custom subjects từ localStorage
  useEffect(() => {
    const savedSubjects = localStorage.getItem('customSubjects');
    if (savedSubjects) {
      setCustomSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = (values: any) => {
    if (!DEFAULT_SUBJECTS.find(s => s.value === values.name) && 
        !customSubjects.find(s => s.value === values.name)) {
      const newSubject = { 
        label: values.name, 
        value: values.name 
      };
      const newCustomSubjects = [...customSubjects, newSubject];
      setCustomSubjects(newCustomSubjects);
      localStorage.setItem('customSubjects', JSON.stringify(newCustomSubjects));
    }
    onSubmit(values);
  };

  return (
    <Modal
      title={editingId ? "Sửa môn học" : "Thêm môn học mới"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Tên môn học"
          rules={[{ required: true, message: 'Vui lòng chọn hoặc nhập tên môn học!' }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Chọn hoặc nhập tên môn học"
            options={[
              ...DEFAULT_SUBJECTS,
              ...customSubjects.map(subject => ({
                ...subject,
                label: (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{subject.label}</span>
                    <CloseOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        const newCustomSubjects = customSubjects.filter(s => s.value !== subject.value);
                        setCustomSubjects(newCustomSubjects);
                        localStorage.setItem('customSubjects', JSON.stringify(newCustomSubjects));
                      }}
                      style={{ color: '#ff4d4f' }}
                    />
                  </div>
                )
              }))
            ]}
            style={{ width: '100%' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                if (!value) return;
                const newSubject = { 
                  label: value, 
                  value: value 
                };
                setCustomSubjects([...customSubjects, newSubject]);
                localStorage.setItem('customSubjects', JSON.stringify([...customSubjects, newSubject]));
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            { max: 500, message: 'Mô tả không được quá 500 ký tự!' }
          ]}
        >
          <Input.TextArea 
            placeholder="Nhập mô tả về môn học..." 
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </Button>
            <Button onClick={onCancel}>
              Hủy
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubjectForm; 