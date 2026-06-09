export interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'ANALYST' | 'VIEWER';
}
