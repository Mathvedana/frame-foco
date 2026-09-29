-- Allow company owners to insert leads for their own company
CREATE POLICY "Owners can insert leads" ON public.leads
FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM companies WHERE companies.id = leads.company_id AND companies.owner_id = auth.uid()
));

-- Allow company owners to update their own leads
CREATE POLICY "Owners can update own leads" ON public.leads
FOR UPDATE TO authenticated
USING (EXISTS (
  SELECT 1 FROM companies WHERE companies.id = leads.company_id AND companies.owner_id = auth.uid()
));

-- Allow company owners to delete their own leads
CREATE POLICY "Owners can delete own leads" ON public.leads
FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM companies WHERE companies.id = leads.company_id AND companies.owner_id = auth.uid()
));

-- Allow company owners to insert meetings for their own company
CREATE POLICY "Owners can insert meetings" ON public.meetings
FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM companies WHERE companies.id = meetings.company_id AND companies.owner_id = auth.uid()
));

-- Allow company owners to update their own meetings
CREATE POLICY "Owners can update own meetings" ON public.meetings
FOR UPDATE TO authenticated
USING (EXISTS (
  SELECT 1 FROM companies WHERE companies.id = meetings.company_id AND companies.owner_id = auth.uid()
));

-- Allow company owners to delete their own meetings
CREATE POLICY "Owners can delete own meetings" ON public.meetings
FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM companies WHERE companies.id = meetings.company_id AND companies.owner_id = auth.uid()
));

-- Allow admins to delete companies
CREATE POLICY "Admins can delete companies" ON public.companies
FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));