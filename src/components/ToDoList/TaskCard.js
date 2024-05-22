import React from "react";
import './TaskCard.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { dbOperations } from "../../databaseOperations";

export default function TaskCard(props) { 

    const getStatusStyle = (status) => {
        return status.replace(/\s+/g, '-').toLowerCase();
    }

    const handleDelete = async () => {
        await dbOperations.DeleteTask(props.taskDetails.id);
        props.refreshData();
        props.showNotification("Task deleted successfully!", 'success');
    }
    
    const handleStartTask = async () => {
        await dbOperations.UpdateStatus(props.taskDetails.id, "In progress");
        props.refreshData();
        props.showNotification("Task status updated successfully!", 'success');
    }
    
    const handleFinishTask = async () => {
        await dbOperations.UpdateStatus(props.taskDetails.id, "Completed");
        props.refreshData();
        props.showNotification("Task status updated successfully!", 'success');
    }

    return (
        <div className="card-container">
            <div className="title-container">
                <div className="title">{props.taskDetails.title}</div>
                <div className={`status ${getStatusStyle(props.taskDetails.status)}`}>{props.taskDetails.status}</div>
            </div>
            <div className="task-data">
                <div className="description">{props.taskDetails.description}</div>
                <div className="action-container">
                    {props.taskDetails.status==="Pending" && 
                        <Button 
                            className="start-button" 
                            variant="contained"
                            onClick={handleStartTask}>
                                Start
                        </Button>
                    }
                    {props.taskDetails.status==="In progress" && 
                        <Button 
                            className="complete-button" 
                            variant="contained"
                            onClick={handleFinishTask}>
                                Finish
                            </Button>
                    }
                    <Button className="delete-button" onClick={handleDelete}><DeleteIcon fontSize="inherit"/></Button>
                </div>
            </div>
        </div>
    );
}