import React from "react";
import axios from "axios";
interface TodoCardProps {
    title: String, description: String, status: boolean, setStatus: (status: boolean) => void
}
export const TodoCard: React.FC<TodoCardProps> = ({ title, description, status, setStatus }) => {
    const handleCheck = async () => {
        //axios call to change todos check
        const response = await axios.post("http://localhost:3000/user/updateTodo", {
            "userId":
                "id":
            "done": "status"
        })
        setStatus(!status);
    };

    return (
        <div className="flex flex-col p-4 border border-gray-300 rounded-md mb-4">
            <div className="font-semibold text-lg mb-2">
                Title: {title}
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="description text-gray-700">
                    Description: {description}
                </div>
                <div className="checkButton bg-green-300 p-2 rounded">
                    <input
                        type="checkbox"
                        checked={status}
                        onChange={handleCheck}
                    />
                </div>
            </div>
        </div>
    );
};
