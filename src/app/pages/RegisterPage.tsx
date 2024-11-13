'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { register } from '../../../backend/api/register';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [status, setStatus] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (status === 200) {
            
            router.push('/main-page');
        }
    }, [status]);

    const handleRegister = async (e: React.FormEvent) => {
        // Логика регистрации пользователя
        e.preventDefault();

        register(username, password, confPassword)
        .then(res => {
            console.log(res);
            setStatus(res.status);
        }).catch(e => {
            setStatus(e.status);
            console.log(e.response.data.detail);
        });
    };

    return (
        <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
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
            <input
                type="password"
                placeholder="Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
        <div>
            Already have an account?
            <button >
                <Link href='/login'>Log In</Link>
            </button>
        </div>
        </div>
    );
}
