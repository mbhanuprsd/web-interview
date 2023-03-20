import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Card,
  CardContent,
  List,
  ListItemButton, ListItemIcon, ListItemText, Typography
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { fetchTodoList, updateTodoList } from "../services/TodoService";
import { TodoListForm } from './TodoListForm';

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoList().then(setTodoLists)
  }, [])

  useEffect(() => {
    if (Object.keys(todoLists).length > 0 && activeList) {
      updateTodoList(JSON.stringify(todoLists))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoLists])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            setTodoLists({
              ...todoLists,
              [id]: { ...listToUpdate, todos },
            })
          }}
        />
      )}
    </Fragment>
  )
}
