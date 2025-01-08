import React, { useState } from "react";
import Navbar from '../components/Navbar';
import '../pages/register.css';

//  how to do  link <Link href="/login" className="nav-link">Login</Link>
//import Link from "next/link";
import { useRouter } from "next/router"; // use next router instead?? // or react router?
//const router = useRouter(); broken asf , NVM NEEDS TO BE DEFVINE IN FUNCTIOn

export default function Login() {
    const [regform, setregform] = useState({
        email: "",
        password: "",
    });
    const router = useRouter()
    const checkinputchange = (f_event) => {
        const { name, value } = f_event.target;
        setregform((old) => ({
            ...old,
            [name]: value,
        }));
    };

    const doonsubmit = async (f_event) => {
        f_event.preventDefault();

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(regform),
            });

            const data = await res.json();
            if (res.status == 200) {
                router.push("/loginsuccess")

            }


        } catch (err) {
            console.log("Error occurred while logging in");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="background">
                <form onSubmit={doonsubmit} className="registerbackground">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={regform.email}
                            onChange={checkinputchange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={regform.password}
                            onChange={checkinputchange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
