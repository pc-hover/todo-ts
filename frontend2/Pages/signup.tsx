import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../src/index.css"

export const SignUpPage: React.FC = () => {

    const [username, setUsername] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (<div className="bg-black h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

                <div className="font-bold text-black text-2xl ">
                    Sign in
                </div>
                <div className="font-bold text-black text-xl ">
                    Enter the text below
                </div>

                <div>
                    <h4>First Name </h4>
                    <input placeholder={"firstname"} onChange={(e) => {
                        setfirstName(e.target.value);
                    }} />
                </div>
                <div>
                    <h4>Last Name</h4>
                    <input placeholder={"lastname"} onChange={(e) => {
                        setlastName(e.target.value);
                    }} />
                </div>
                <div>
                    <h4>Enter Email</h4>
                    <input placeholder={"xyz@gmail.com"} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div>
                <div>
                    <h4>Enter Password</h4>
                    <input placeholder={"***"} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>

                <div className="pt-4">


                    <button type="submit" onClick={async () => {
                        const response = await axios.post("http://localhost:3000/register", {
                            username,
                            password, firstName, lastName
                        });;
                        console.log(response);
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("user", JSON.stringify(response.data.newUser));
                        console.log(response.data);

                        if (response.data.token) {
                            navigate("/dashboard");
                        }
                    }} > Register</button>

                </div>


            </div>
        </div>

    </div>
    );
}
/*
 const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                email: username,
                                password: password
                            })
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        }
 */