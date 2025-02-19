import { SAMPLE_GOAL, SAMPLE_PROGRESS, SAMPLE_SUBJECT } from '@/services/QuanLiMonHoc/constant';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import MonthlyGoals from './components/MonthlyGoal';
import StudyProgressList from './components/StudyProgressList';
import SubjectList from './components/SubjectList';

const QuanLiMonHoc = () => {
	const [subjects, setSubjects] = useState<string[]>(() => loadFromLocalStorage('subjects', SAMPLE_SUBJECT));
	const [selectedSubject, setSelectedSubject] = useState<string | null>(() =>
		loadFromLocalStorage('selectedSubject', null),
	);
	const [studyProgress, setStudyProgress] = useState<any[]>(() =>
		loadFromLocalStorage('studyProgress', SAMPLE_PROGRESS),
	);
	const [monthlyGoals, setMonthlyGoals] = useState<any>(() => loadFromLocalStorage('monthlyGoals', SAMPLE_GOAL));

	useEffect(() => {
		saveToLocalStorage('subjects', subjects);
	}, [subjects]);

	useEffect(() => {
		saveToLocalStorage('studyProgress', studyProgress);
	}, [studyProgress]);

	useEffect(() => {
		saveToLocalStorage('monthlyGoals', monthlyGoals);
	}, [monthlyGoals]);

	return (
		<div>
			{selectedSubject ? (
				<>
					<StudyProgressList
						subject={selectedSubject}
						progress={studyProgress}
						setProgress={setStudyProgress}
						setSelectedSubject={setSelectedSubject}
					/>
					<MonthlyGoals
						subjects={subjects}
						goals={monthlyGoals}
						setGoals={setMonthlyGoals}
						progress={studyProgress}
						subject={selectedSubject}
					/>
				</>
			) : (
				<SubjectList subjects={subjects} setSubjects={setSubjects} setSelectedSubject={setSelectedSubject} />
			)}
		</div>
	);
};

export default QuanLiMonHoc;
