import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";

//Icons
import DeleteIcon from "../assets/img/icons/trash_icon.png";

//Context
import { TodoContext } from "../context/todo.context";

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const DeleteTodo = ({ deleteId }) => {
  const { _deleteTodo } = useContext(TodoContext);

  const [deleteTodo, { error }] = useMutation(DELETE_TODO, {
    onCompleted: (data) => {
      if (data.deleteTodo) {
        _deleteTodo(deleteId);
      }
    },
  });

  if (error) return <h1>Error in delete todo...</h1>;

  return (
    <img
      className="img_delete"
      alt="img_delete"
      src={DeleteIcon}
      onClick={() => deleteTodo({ variables: { id: deleteId } })}
    />
  );
};
