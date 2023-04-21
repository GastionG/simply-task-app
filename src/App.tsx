import { useEffect, useState } from "react";
import "./App.css";
import { Button, Container, CssBaseline, List, ListItem, TextField, ThemeProvider, createTheme } from "@mui/material";
import Task from "./components/Task";
import { ITask } from "./models/task";

function App() {
  const [title, setTitle] = useState<string>("Simply Task App");
  const [inputValue, setInputValue] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  function handleChange(e: any): void{
    const value = e.target.value;
    setInputValue(value);
  }

  const handleSubmit = (e: any) =>{
    e.preventDefault();

    if(inputValue){
      let newId = (Math.random() * 20000) -10000;
      while(tasks.map(e=>e.id).includes(newId)){
        newId = (Math.random() * 20000) -10000;
      }
      setTasks([...tasks, {id: newId, task: inputValue, done: false}])
      setInputValue('');
    }
  }

  const handleDelete = (task: ITask) => {
    const newTasks = tasks.filter(e=>e.id !== task.id);
    setTasks(newTasks);
  }

  const theme = createTheme({
    typography:{
      fontFamily: "system-ui",
      fontSize: 20
    },
    palette: {
      mode: 'dark'
    },
  });



  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <h1>{title}</h1>
        <br></br>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input">
            <TextField 
            label="Task description"
            fullWidth
            variant="filled"
            onChange={handleChange}
            value={inputValue}
            />
          </div>
          <Button className="button" variant="contained" type="submit">Save task</Button>
        </form>

        <br></br>
        
        <List>
            {tasks.map((t) => (
              <ListItem key={t.id} disablePadding>
                <Task t={t} onDelete={handleDelete}/>
              </ListItem>
              
            ))}
            
        </List>
        
      </Container>

    </ThemeProvider>
    </>
  );
}

export default App;
