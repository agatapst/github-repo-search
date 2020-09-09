export const routes = {
  root: (): string => '/',
  repo: (owner = ':owner', name = ':name'): string => `/repos/${owner}/${name}`,
};
