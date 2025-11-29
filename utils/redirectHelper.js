export const saveRedirectPath = (path) => {
  if (typeof window !== 'undefined' && path !== '/login' && path !== '/signup') {
    localStorage.setItem('redirectPath', path);
  }
};

export const getRedirectPath = () => {
  if (typeof window !== 'undefined') {
    const path = localStorage.getItem('redirectPath');
    localStorage.removeItem('redirectPath');
    return path && path !== '/login' && path !== '/signup' ? path : '/profile';
  }
  return '/profile';
};
