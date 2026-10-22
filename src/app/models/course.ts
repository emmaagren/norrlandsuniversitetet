// Interface som beskriver en kurs i kurskatalogen

export interface Course {
    courseCode: string;
    subjectCode: string;
    level: string;
    progression: string;
    courseName: string;
    points: number;
    institutionCode: string;
    subject: string;
    syllabus: number;
}