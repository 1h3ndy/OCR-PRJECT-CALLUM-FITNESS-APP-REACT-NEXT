import Image from "next/image";


export default function register() {

  const onClickHandler = async (e) => {
    e.preventDefault();

    const userData = {
      username: "test",
      email: "test@example.com",
      password: "assword123",
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(res.statusText);
      } else {
        console.log(res.statusText);
      }
    } catch (err) {
        console.log(res.statusText);
    }
  };

  return <button onClick={onClickHandler}>Register</button>;
}
