import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Card, CardActions, CardContent, Checkbox, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const firstUpdate = useRef(true);
  const { current } = useRef({ timer: null })
  const [isTextUpdate, setIsTextUpdate] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  useEffect(() => {
    // To avoid calling the Update Todo API when loading the form
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }

    if (current.timer) clearTimeout(current.timer)

    current.timer = setTimeout(() => {
      current.timer = null
      saveTodoList(todoList.id, { todos })
    }, isTextUpdate ? 1000 : 0); // 1 second buffer before autosave if text is updating
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos])

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
                  setIsTextUpdate(true)
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    {
                      "todo": event.target.value,
                      "done": item.done
                    },
                    ...todos.slice(index + 1),
                  ])
                }}
              />
              <Checkbox 
              checked={item.done}
              onChange={(e) => {
                setIsTextUpdate(false)
                setTodos([
                  // immutable update
                  ...todos.slice(0, index),
                  {
                    "todo": item.todo,
                    "done": e.target.checked
                  },
                  ...todos.slice(index + 1),
                ])
              }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setIsTextUpdate(false)
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
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
                setIsTextUpdate(false)
                setTodos([...todos, {"todo": "", "done": false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
