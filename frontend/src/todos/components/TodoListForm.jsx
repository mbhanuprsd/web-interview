import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Card, CardActions, CardContent, Checkbox, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import DatePicker, { convertDate } from './DatePicker'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const { current } = useRef({ timer: null })

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  const onTodoChange = (updatedTodos, isTextUpdate) => {
    setTodos(updatedTodos)
    if (current.timer) clearTimeout(current.timer)

    current.timer = setTimeout(() => {
      current.timer = null
      saveTodoList(todoList.id, { "todos": updatedTodos })
    }, isTextUpdate ? 1000 : 0); // 1 second buffer before autosave if text is updating
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={item.todo}
                onChange={(event) => {
                  const updatedTodos = [
                    // immutable update
                    ...todos.slice(0, index),
                    {
                      "todo": event.target.value,
                      "done": item.done,
                      "due": item.due
                    },
                    ...todos.slice(index + 1),
                  ]
                  onTodoChange(updatedTodos, true)
                }}
              />
              <DatePicker
                todo={item}
                onDateChange={(date) => {
                  const updatedTodos = [
                    // immutable update
                    ...todos.slice(0, index),
                    {
                      "todo": item.todo,
                      "done": item.done,
                      "due": date
                    },
                    ...todos.slice(index + 1),
                  ]
                  onTodoChange(updatedTodos, false)
                }} />
              <Checkbox
                checked={item.done}
                onChange={(e) => {
                  const updatedTodos = [
                    // immutable update
                    ...todos.slice(0, index),
                    {
                      "todo": item.todo,
                      "done": e.target.checked,
                      "due": item.due
                    },
                    ...todos.slice(index + 1),
                  ]
                  onTodoChange(updatedTodos, false)
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  const updatedTodos = [
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ]
                  onTodoChange(updatedTodos, false)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                const updatedTodos = [...todos, { "todo": "", "done": false, "due": convertDate(new Date()) }]
                onTodoChange(updatedTodos, false)
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
