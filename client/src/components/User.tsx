import React from 'react';
import { IUser } from '../types/userTypes';
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from '@apollo/client';
import { REMOVE_USER } from '../mutations/user';

interface Props {
  user: IUser;
  onClick: (user: IUser) => void;
  refresh: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
}

const User = ({ user, onClick, refresh }: Props) => {
  const [removeUser] = useMutation(REMOVE_USER);

  const handleRemove = async () => {
    try {
      await removeUser({
        variables: {
          id: user.id,
        },
      });

      refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div key={user.id} className="user">
      {user.username} {user.age}
      <button type="button" onClick={() => onClick(user)}>
        Edit
      </button>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

export default User;
