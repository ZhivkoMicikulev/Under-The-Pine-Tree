import { useNavigate } from 'react-router-dom';

export function NavigateTo(url){
    const navigate=useNavigate();
    navigate(url);
}
