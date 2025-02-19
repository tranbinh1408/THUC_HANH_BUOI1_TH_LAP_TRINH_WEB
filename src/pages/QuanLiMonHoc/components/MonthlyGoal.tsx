import { Button, Card, Form, Input, Progress } from 'antd';
import moment from 'moment';

const MonthlyGoals = ({ goals, setGoals, progress, subject }: QuanLiMonHoc.IMonthlyGoalsProps) => {
	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		setGoals((prevGoals: any) => ({ ...prevGoals, [subject]: values.goal }));
	};

	const calculateProgress = () => {
		const goal = goals[subject] || 0;
		const totalDuration = progress
			.filter((item) => item.subject === subject && 
				moment(item.date, 'DD-MM-YYYY').isSame(moment(), 'month'))
			.reduce((sum, item) => sum + parseInt(item.duration), 0);
		return Math.min(Math.round((totalDuration / 60) / goal * 100), 100);
	};

	return (
		<div>
			<h2>Mục tiêu học tập {subject} hàng tháng</h2>
			<Form form={form} onFinish={handleSubmit} layout='horizontal' initialValues={{ goal: goals[subject] || 0 }}>
				<Form.Item name='goal' label='Mục tiêu (giờ)'>
					<Input
						type='number'
						style={{
							width: 'fit-content',
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Cập nhật mục tiêu
					</Button>
				</Form.Item>
			</Form>

			<Card title={`Tiến độ hiện tại`}>
				<Progress percent={calculateProgress()} format={(percent) => `${percent}%`} />
				<p>Mục tiêu: {goals[subject] || 0} giờ</p>
			</Card>
		</div>
	);
};

export default MonthlyGoals;
