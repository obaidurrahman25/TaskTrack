import React, { useEffect, useState } from "react";
import './ToDoList.scss';
import TaskCard from "./TaskCard";
import AddTaskDialog from "../AddTaskDialog/AddTaskDialog";
import { Button } from "@mui/material";
import db from "../../database";
import { Snackbar, Alert } from "@mui/material";

export default function ToDoList () {

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [openNotification, setOpenNotification] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [openAddTask, setOpenAddTask] = useState(false);

    const worker = new Worker('./SortWorker.js');

    useEffect(() => {
      
        fetchTasks();

    });

    const showNotification = (message, type) => {
        setMessage(message);
        setMessageType(type);
        setOpenNotification(true);
    }

    const sortTasks = (taskList) => {
  
        const statusPriority = {
        'In progress': 1,
        'Pending': 2,
        'Completed': 3
        };
    
        taskList.sort((a, b) => statusPriority[a?.status] - statusPriority[b?.status]);
    
        return taskList;

    }

    const fetchTasks = async () => {
        let allTasks = await db.tasks.toArray();
        /* worker.postMessage(allTasks);
        worker.onmessage = (sortedList) => setTaskList(sortedList.data); */
        allTasks = sortTasks(allTasks);
        setTaskList(allTasks);
    };

    const refreshData = () => {
        fetchTasks();
    }

    return (<div className="todolist-container">
        
        <Button className="add-button" variant="contained" onClick={() => setOpenAddTask(true)}>Add new task</Button>
        
        <AddTaskDialog 
            open={openAddTask} 
            onClose={() => setOpenAddTask(false)}
            refreshData={refreshData}
            showNotification={showNotification}
        />

        {taskList.map(task => {
            return (
                <TaskCard 
                    taskDetails={task} 
                    refreshData={refreshData} 
                    showNotification={showNotification}
                />
            )
        })}

        {taskList.length === 0 && 
            <div className="no-task">Create your first task to keep track and stay organised.</div>
        }

        <Snackbar open={openNotification} autoHideDuration={4000} onClose={() => setOpenNotification(false)}>
            <Alert
            onClose={() => setOpenNotification(false)}
            severity={messageType}
            variant="filled"
            sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
        
    </div>);
}