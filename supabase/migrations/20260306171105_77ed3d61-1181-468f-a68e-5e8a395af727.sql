
-- The "Anyone can submit diagnosis" policy uses WITH CHECK (true) which is intentional
-- for a public form. However, let's restrict it to only allow inserting specific columns
-- by adding a check that status must be 'pendente' and ai_analysis must be null.
DROP POLICY "Anyone can submit diagnosis" ON public.diagnosis_requests;
CREATE POLICY "Anyone can submit diagnosis" ON public.diagnosis_requests
  FOR INSERT WITH CHECK (
    status = 'pendente' AND ai_analysis IS NULL
  );
