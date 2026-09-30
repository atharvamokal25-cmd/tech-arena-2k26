import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wrtoakhtijykfpiypacg.supabase.co',
  'sb_publishable_vRLJMSJYnQD0kxZtqmCNEA_E9820Gzf'
);

async function testInsert() {
  const { data, error } = await supabase.from('submissions').insert([
    {
      id: 'test_sub_123',
      timestamp: new Date().toISOString(),
      studentName: 'Test Student',
      studentId: '123',
      set: 'Set A',
      language: 'python',
      overallSeconds: 120,
      questionSeconds: [40, 40, 40],
      answers: ['A', 'B', 'C']
    }
  ]);
  
  if (error) {
    console.error('Insert Error:', error);
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
