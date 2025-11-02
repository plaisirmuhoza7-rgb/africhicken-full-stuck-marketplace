import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fblmwtillmyhigavyzcq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibG13dGlsbG15aGlnYXZ5emNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDQxODAsImV4cCI6MjA3NzU4MDE4MH0.8IClULQCLQTF0aEtpLaaE0cYPC3ogNCbceK0QTJR_PM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Order {
  id: string;
  full_name: string;
  phone_number: string;
  product: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
}
