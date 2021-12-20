import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

// C-R-UD (create, read, update, delete)
function App() {

    //BLL (business logic layer) (data):
    const todoListTitle: string = "What to learn"
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
    ])


    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (title: string) => {
        if (title) {
            setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
        }

        /*const newTask: TaskType = {
            id: v1(),
            title: "Hey!!!",
            isDone: false
        }
        const copyState = [newTask, ...tasks] // const copyState = [...tasks]
        // copyState.unshift(newTask)
        setTasks(copyState) // setTasks([newTask, ...tasks])*/
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
                addTask={addTask}
            />
        </div>
    )
}

export default App;

