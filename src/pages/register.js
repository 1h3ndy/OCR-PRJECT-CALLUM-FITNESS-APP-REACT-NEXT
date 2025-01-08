import Image from "next/image";
import '../pages/register.css';
// REMEMBER TO IMPORT CSS FILE? mabe use one css for all pages??
import React, { useState } from "react";
import Navbar from '../components/Navbar'// import compponents

export default function Register() { //  components should be caps apparently, seems to work without tho
  const [regform,setregform] = useState({ // create a form  const
    username: "",
    email: "",
    password: "",
  });

  const checkinputchange = (f) => {
    const {name, value} = f.target; // name value standard react names, cant use other names
    setregform((old) => ({
      ...old,
      [name]: value,

    }));
  }
  const doonsubmit = async (f) => {
    f.preventDefault();



    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regform),
      });

      const data = await res.json();

      if (data.ok) {
        console.log(res.statusText);
      } else {
        console.log(res.statusText);
      }
    } catch (err) {
        console.log(err) // should it be data.statustext instead?

      //why cant i log res here? ide showing error?
    }
  };

  return (
      <div >
        <Navbar>

        </Navbar>
        <div className="background">
        <form onSubmit={doonsubmit} className="registerbackground">
          <div>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={regform.username}
                onChange={checkinputchange}
                required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
                type="email" // forces @
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
                type="password" // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
                id="password"
                name="password"
                value={regform.password}
                onChange={checkinputchange} // https://react.dev/reference/react-dom/components/input component prrops
                required
            />
          </div>
          <button type="submit">Register</button>
        </form>

        </div>
      </div>
        )


        }
