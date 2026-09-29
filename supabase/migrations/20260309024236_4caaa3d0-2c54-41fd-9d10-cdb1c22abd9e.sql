ALTER TABLE public.diagnosis_requests ADD COLUMN lead_qualification text DEFAULT NULL;
ALTER TABLE public.diagnosis_requests ADD COLUMN qualification_reason text DEFAULT NULL;