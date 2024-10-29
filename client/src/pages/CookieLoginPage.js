// pages/CookieLoginPage.js
import { useCookieAuth } from '../context/CookieAuthContext';

const CookieLoginPage = () => {
    const { login } = useCookieAuth();
    // Rest of the component is same as ContextLoginPage
};