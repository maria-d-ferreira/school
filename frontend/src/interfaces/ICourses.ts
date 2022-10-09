export interface ICourses {
  courses: ICourse[];
}

export interface ICourse {
  title: string;
  description: string;
  start: Date;
  end: Date;
  teacher?: {};
  students?: [];
  id?: string;
}
