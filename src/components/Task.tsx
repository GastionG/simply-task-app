import { Button, Card, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from "@mui/material";
import { ITask } from "../models/task";
import { Delete } from "@mui/icons-material";
import "./Task.css";
import { useState } from "react";

export default function Task(props: {t: ITask, onDelete: Function}){
    const [done, setDone] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const styleDoned = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        textDecoration: 'line-through',
        opacity: 0.5    
        
    }
    const styleDontDoned = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px' 
    }

    function handleChangeCheckbox(e: any): void{
        setDone(e.target.checked);
    }

    function handleClickDelete(): void{
        setOpenDialog(true);
    }

    function handleCloseDialog(): void{
        setOpenDialog(false);
    }

    function handleDeleteConfirmed(): void{
        handleCloseDialog();
        props.onDelete(props.t)
    }

    return (
        <>
        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        >
            <DialogContent>
                <DialogContentText>
                    Are you sure about delete this task?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'space-evenly'}}>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button color="error" onClick={handleDeleteConfirmed} autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
        <Card sx={ done ? styleDoned : styleDontDoned}>
            <div className="taskCont">
                <div>
                    <div className="textTask">
                        {props.t.task}
                    </div>
                </div>
                <div>
                    <Checkbox size="medium" value={done} onChange={handleChangeCheckbox} />
                    <IconButton edge="end" aria-label="delete" onClick={handleClickDelete}>
                        <Delete ></Delete>
                    </IconButton>
                </div>
            </div>
        </Card>
            
        </>
    )
}