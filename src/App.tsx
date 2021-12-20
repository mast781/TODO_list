import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

// C-R-UD (create, read, update, delete)
function App() {
    //BLL (business logic layer) (data):
    const todoListTitle: string = "What to learn"
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [tasks, setTasks] =  useState<Array<TaskType>>([
                    {id: 1, title: "HTML", isDone: true},
                    {id: 2, title: "CSS", isDone: true},
                    {id: 3, title: "JS/TS", isDone: false},
                    {id: 4, title: "React", isDone: true},
                    {id: 5, title: "Redux", isDone: false},
                ])


    const changeFilter = (filter:FilterValuesType) => setFilter(filter)
    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const getTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    //UI (user interface):
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={todoListTitle}
                tasks={getTasksForRender()}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;

