import { useState, useEffect } from 'react';
import { TodoItem } from '../model/todo-item';
import { TodoStatus } from '../model/todo-status';
import { Todopriority } from '../model/todo-priority';
import {
    Box,
    Button,
    Container,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TodoManager from './TodoManager';

const TodoList = () => {
    const { taskList, addTask, removeTask } = TodoManager();
    const [newTask, setNewTask] = useState<TodoItem>({
        id: 0,
        description: '',
        duDate: { day: 0, month: 0, year: 0, hour: 0, minute: 0 },
        status: TodoStatus.TODO,
        priority: Todopriority.LOW
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }, [taskList]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTask = () => {
        if (newTask.description.trim() !== '') {
            addTask(newTask);
            setNewTask({
                id: newTask.id + 1,
                description: '',
                duDate: { day: 0, month: 0, year: 0, hour: 0, minute: 0 },
                status: TodoStatus.TODO,
                priority: Todopriority.LOW
            });
            handleClose();
        }
    };

    const handleRemoveTask = (taskId: number) => {
        removeTask(taskId);
    };

    const padZero = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    const filterTasksByStatus = (status: TodoStatus) => {
        return taskList.filter(task => task.status === status);
    };

    const statusColumns = [
        { label: 'Todo', status: TodoStatus.TODO, color: '#f8d7da' },
        { label: 'In Progress', status: TodoStatus.INPROGRESS, color: '#fff3cd' },
        { label: 'Done', status: TodoStatus.DONE, color: '#d4edda' },
    ];

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Add Task
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add a new task, please fill out the form below and click "Add Task".
                        </DialogContentText>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                            <TextField
                                label="Task Description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={newTask.status}
                                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TodoStatus })}
                                >
                                    <MenuItem value={TodoStatus.TODO}>Todo</MenuItem>
                                    <MenuItem value={TodoStatus.INPROGRESS}>In Progress</MenuItem>
                                    <MenuItem value={TodoStatus.DONE}>Done</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Todopriority })}
                                >
                                    <MenuItem value={Todopriority.LOW}>Low</MenuItem>
                                    <MenuItem value={Todopriority.MEDIUM}>Medium</MenuItem>
                                    <MenuItem value={Todopriority.HIGH}>High</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Due Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={`${newTask.duDate.year}-${String(newTask.duDate.month).padStart(2, '0')}-${String(newTask.duDate.day).padStart(2, '0')}`}
                                onChange={(e) => {
                                    const dateParts = e.target.value.split('-');
                                    setNewTask({
                                        ...newTask,
                                        duDate: {
                                            ...newTask.duDate,
                                            year: parseInt(dateParts[0]),
                                            month: parseInt(dateParts[1]),
                                            day: parseInt(dateParts[2])
                                        }
                                    });
                                }}
                                fullWidth
                            />
                            <TextField
                                label="Due Time"
                                type="time"
                                value={`${padZero(newTask.duDate.hour)}:${padZero(newTask.duDate.minute)}`}
                                onChange={(e) => {
                                    const timeParts = e.target.value.split(':');
                                    setNewTask({
                                        ...newTask,
                                        duDate: {
                                            ...newTask.duDate,
                                            hour: parseInt(timeParts[0]),
                                            minute: parseInt(timeParts[1])
                                        }
                                    });
                                }}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccessTimeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddTask} color="primary">
                            Add Task
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Typography variant="h4" component="h1" gutterBottom>
                Todo List
            </Typography>
            <Grid container spacing={3}>
                {statusColumns.map((column, idx) => (
                    <Grid item xs={12} md={4} key={idx}>
                        <Typography variant="h5" component="h2" sx={{ backgroundColor: column.color, padding: 1, borderRadius: 1, textAlign: 'center' }}>
                            {column.label}
                        </Typography>
                        <TableContainer component={Paper} sx={{ backgroundColor: column.color }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterTasksByStatus(column.status).map(task => (
                                        <TableRow key={task.id}>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>{task.priority}</TableCell>
                                            <TableCell>{`${padZero(task.duDate.day)}/${padZero(task.duDate.month)}/${task.duDate.year}`}<br />{`${padZero(task.duDate.hour)}:${padZero(task.duDate.minute)}`}</TableCell>
                                            <TableCell>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveTask(task.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TodoList;
