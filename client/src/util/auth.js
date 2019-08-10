export function isAuthenticated() {
  if (localStorage.getItem('jwt'))
    return true;
  else
    return false;
}