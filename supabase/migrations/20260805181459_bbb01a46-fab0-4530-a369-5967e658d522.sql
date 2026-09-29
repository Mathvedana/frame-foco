CREATE TABLE public.conversion_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name text NOT NULL,
  cta_label text,
  page_path text,
  referrer text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.conversion_events TO anon;
GRANT INSERT, SELECT ON public.conversion_events TO authenticated;
GRANT ALL ON public.conversion_events TO service_role;

ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log conversion events"
ON public.conversion_events FOR INSERT TO anon, authenticated
WITH CHECK (event_name IN ('cta_click','diagnosis_submit','diagnosis_success'));

CREATE POLICY "Admins can view conversion events"
ON public.conversion_events FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_conversion_events_created_at ON public.conversion_events (created_at DESC);