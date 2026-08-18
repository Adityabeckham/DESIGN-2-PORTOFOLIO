export interface StickyNote {
  id: string;
  author: string;
  message: string;
  color: string;
  likes: number;
  created_at?: string;
}

export interface ProjectItem {
  id: string;
  category: 'internship-capstone' | 'my-learning-projects' | 'academic-project';
  title: string;
  meta: string;
  desc: string;
  image: string;
  link?: string;
  github?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  image: string;
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface ExperienceItem {
  num: string;
  role: string;
  company: string;
  date: string;
  summary?: string;
  desc: string[];
  tags: string[];
}
