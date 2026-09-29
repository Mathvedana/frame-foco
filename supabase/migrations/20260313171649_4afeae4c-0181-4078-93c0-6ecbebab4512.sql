
CREATE TABLE public.company_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  agent_key text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(company_id, agent_key)
);

ALTER TABLE public.company_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all company agents"
  ON public.company_agents FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Owners can view own company agents"
  ON public.company_agents FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.companies
    WHERE companies.id = company_agents.company_id
    AND companies.owner_id = auth.uid()
  ));
