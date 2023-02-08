export const getRedirectUri = (search: string): string | undefined => {
  const searchParams = new URLSearchParams(search);
  const redirectUri: string | null = searchParams.get('redirect_uri');
  if (redirectUri) {
    return redirectUri;
  }
  return undefined;
};
