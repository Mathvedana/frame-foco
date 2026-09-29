
-- 1) Remove sensitive tables from Realtime publication to stop broadcast leakage
ALTER PUBLICATION supabase_realtime DROP TABLE public.leads;
ALTER PUBLICATION supabase_realtime DROP TABLE public.meetings;
ALTER PUBLICATION supabase_realtime DROP TABLE public.diagnosis_requests;

-- 2) Lock down SECURITY DEFINER functions: revoke direct EXECUTE from public roles.
-- They remain usable from RLS / triggers (which run as their owner).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 3) Harden user_roles: scope existing admin policy explicitly to authenticated,
-- and add explicit restrictive denies preventing any self-insert / update / delete
-- by non-admins (defense in depth on top of default-deny).
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
CREATE POLICY "Users can read own role"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Restrictive policies to block any privilege escalation attempt outright
CREATE POLICY "Block non-admin role inserts"
  ON public.user_roles
  AS RESTRICTIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Block non-admin role updates"
  ON public.user_roles
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Block non-admin role deletes"
  ON public.user_roles
  AS RESTRICTIVE
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 4) Reduce GraphQL/anon discoverability: revoke SELECT from anon on all
-- public tables (no current feature requires anonymous reads; landing
-- diagnosis form only INSERTs into diagnosis_requests).
REVOKE SELECT ON public.companies FROM anon;
REVOKE SELECT ON public.company_agents FROM anon;
REVOKE SELECT ON public.diagnosis_requests FROM anon;
REVOKE SELECT ON public.leads FROM anon;
REVOKE SELECT ON public.meetings FROM anon;
REVOKE SELECT ON public.mentoria_progress FROM anon;
REVOKE SELECT ON public.profiles FROM anon;
REVOKE SELECT ON public.reports FROM anon;
REVOKE SELECT ON public.user_roles FROM anon;
