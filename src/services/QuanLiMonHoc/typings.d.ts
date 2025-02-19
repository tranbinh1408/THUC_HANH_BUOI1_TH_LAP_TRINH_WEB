declare module QuanLiMonHoc {
	export interface ISubjectListProps {
		subjects: string[];
		setSubjects: React.Dispatch<React.SetStateAction<string[]>>;
		setSelectedSubject: React.Dispatch<React.SetStateAction<string | null>>;
	}
    
    export interface IStudyProgressListProps {
        subject: string;
        progress: any[];
        setProgress: React.Dispatch<React.SetStateAction<any[]>>;
        setSelectedSubject: React.Dispatch<React.SetStateAction<string | null>>;
    }

    export interface IMonthlyGoalsProps {
        subjects: string[];
        goals: any;
        setGoals: React.Dispatch<React.SetStateAction<any>>;
        progress: any[];
        subject: string;
    }

}

