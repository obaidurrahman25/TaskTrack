import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import './AddTaskDialog.scss';
import TextField from '@mui/material/TextField';
import { dbOperations } from "../../databaseOperations";

export default function AddTaskDialog(props) {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleAddTask = async () => {
        if (title.trim() === '') return;

        // Add a new task to the database
        await dbOperations.AddTask(
            {
                title: title,
                description: desc,
                status: 'Pending'
            }
        );
        props.showNotification("Task added successfully!", 'success');
        props.refreshData();
        props.onClose();

    }

    return(
        <Dialog
            className="container"
            open={props.open}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle className="dialog-title">Add new task</DialogTitle>

            <DialogContent className="dialog-content">
                <div className="task-title">
                    <div className="title-label">Title</div>
                    <TextField 
                        className="title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="task-desc">
                    <div className="desc-label">Description</div>
                    <TextField 
                        className="desc-input" 
                        multiline 
                        rows={4}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
            </DialogContent>

            <DialogActions className="dialog-actions">
                <Button variant="contained" onClick={handleAddTask}>Add task</Button>
                <Button variant="outlined" onClick={props.onClose}>Cancel</Button>
            </DialogActions>

        </Dialog>
    );
}