'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { login } from '../../../backend/api/login';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
// import { useAppSelector } from '@/redux/hooks';
import { changeToken, changeUserId, changeUserRole, unauthenticated } from '@/redux/appSlice';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<number | null>(null);

    const dispatch = useDispatch();
    const router = useRouter();
    
    useEffect(() => {
        if (status === 200) {
            
            router.push('/main-page');
        }
    }, [status]);
    
    const handleLogin = async (e: React.FormEvent) => {
        // Логика авторизации пользователя
        e.preventDefault();
        
        login(username, password)
        .then(res => {
            dispatch(changeUserId(res.data.user.id))
            dispatch(changeUserRole(res.data.user.role))
            dispatch(changeToken(res.data.token))
            console.log(res);
            setStatus(res.status);
        }).catch(e => {
            setStatus(e.status);
            dispatch(unauthenticated());
            console.log(e.response.data.detail);
        });
    };
    
    return (
        <div className="login-container">
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" onClick={() => handleLogin}>Log In</button>
        </form>
        <div>
            Haven’t got an account yet?
            <button >
                <Link href='/register'>Sign Up </Link>
            </button>
        </div>
        </div>
    );
}
