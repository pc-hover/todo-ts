import "../src/index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoCard } from "../components/todo-card";
import axios from "axios";
export const Dashboard = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [todos, setTodos] = useState([]);

    // Retrieving user data from localStorage
    const user = localStorage.getItem("user");
    const userId = 9 || [];
    async function getTodos() {
        const response = await axios.post("http://localhost:3000/user/getTodosAndUser", {
            userId
        })
        setTodos(response.data);
    }
    getTodos();

    return (
        <div className="bg-gray-800 flex flex-col justify-center">
            <div className="navbar bg-blue flex flex-col">
                <div className="bg-blue-500 text-white p-4">Expressify</div>
                <div>
                    <button
                        type="submit"
                        onClick={() => {
                            console.log(localStorage.getItem("token"));
                            localStorage.removeItem("token");
                            navigate("/signin");
                        }}
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
            <div className="content flex flex-col">
                {
                    todos.map((e: any, index: any) => (
                        <TodoCard
                            key={index}
                            title={e.title}
                            description={e.description}
                            status={e.done}
                            setStatus={setStatus}
                        />
                    ))}
            </div>
        </div>
    );
};
