import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const taskList = (t: TaskType) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    }
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onClickChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onClickSetAllFilter = () => props.changeFilter("all")
    const onClickSetActiveFilter = () => props.changeFilter("active")
    const onClickSetCompletedFilter = () => props.changeFilter("completed")


    const tasksElements = props.tasks.map(taskList)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onClickChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={onClickSetAllFilter}>All</button>
                <button onClick={onClickSetActiveFilter}>Active</button>
                <button onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;


