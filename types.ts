export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum DataStreamType {
  DEPOSIT = 'DEPOSIT',
  LOAN = 'LOAN',
  INVESTMENT = 'INVESTMENT'
}

export interface Benefit {
  id: string;
  target: 'Co-op' | 'Member';
  title: string;
  description: string;
  icon: string;
  color: string;
}