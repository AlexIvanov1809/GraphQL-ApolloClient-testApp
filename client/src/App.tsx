import { useState, useEffect } from 'react';
import { CreateUser, IUser } from './types/userTypes';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER, UPDATE_USER } from './mutations/user';
import User from './components/User';

const DEFAULT_USER = {
  id: '',
  username: '',
  age: '',
};

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState<IUser[]>([]);
  const [createUser, setCreateUser] = useState<CreateUser>(DEFAULT_USER);
  const [newUser] = useMutation(CREATE_USER);
  const [updatedUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUser((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const addUser = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!createUser.age || !createUser.username) {
      return;
    }
    try {
      const user = await newUser({
        variables: {
          username: createUser.username,
          age: parseInt(createUser.age, 10),
        },
      });

      setCreateUser(DEFAULT_USER);
      refetch();
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    if (!createUser.age || !createUser.username) {
      return;
    }
    try {
      await updatedUser({
        variables: {
          id: createUser.id,
          username: createUser.username,
          age: parseInt(createUser.age, 10),
        },
      });

      setCreateUser(DEFAULT_USER);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const addUserDataToInput = (user: IUser) => {
    setCreateUser({
      id: user.id,
      username: user.username,
      age: user.age.toString(),
    });
  };

  const getAllUsers = () => {
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form onSubmit={addUser}>
        <input
          onChange={handleChange}
          name="username"
          value={createUser.username}
          type="text"
        />
        <input
          onChange={handleChange}
          name="age"
          value={createUser.age}
          type="number"
        />
        <div className="btns">
          <button type="submit">Create user</button>
          <button type="button" onClick={updateUser}>
            Update user
          </button>
          <button onClick={getAllUsers} type="button">
            Get users
          </button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            onClick={addUserDataToInput}
            refresh={refetch}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
