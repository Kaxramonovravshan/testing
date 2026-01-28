import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  age: number;
  isMarried: boolean;
  id?: string;
}

type UserDB = Omit<User, "id">;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    name: "",
    age: 0,
    isMarried: false,
  });

  const n = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    const refCol = collection(db, "users");
    getDocs(refCol).then((res) => {
      const arr = res.docs.map((itm) => {
        return { ...(itm.data() as Omit<User, "id">), id: itm.id };
      });

      setUsers(arr);
      setIsLoading(false);
      setUser({ name: "", age: 0, isMarried: false });
    });
  };

  function submit() {
    if (current === null) {
      addDoc(collection(db, "users"), user as UserDB)
        .then(() => {
          getUsers();
        })
        .catch(() => {
          alert("Ruycatdan uting");
          n("/sign-up");
        });
    } else {
      updateDoc(doc(collection(db, "users"), current), user as UserDB).then(
        () => {
          getUsers();
          setCurrent(null);
        },
      );
    }
  }

  function delItem(id: string) {
    deleteDoc(doc(collection(db, "users"), id)).then(() => {
      getUsers();
    });
  }

  function editItem(itm: User) {
    const { id, ...data } = itm;
    setUser(data);
    setCurrent(id as string);
  }

  return (
    <div>
      <div className="w-25 border p-3 rounded mb-4 mx-auto">
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="form-control mb-2"
          type="text"
        />
        <input
          value={user.age}
          onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
          className="form-control mb-2"
          type="text"
        />
        <button onClick={submit} className="btn btn-dark">
          submit
        </button>
      </div>

      {isLoading ? (
        <h1 className="text-center text-success">LOADING...</h1>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>IsMarried</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((itm) => (
              <tr key={itm.id}>
                <td>{itm.name}</td>
                <td>{itm.age}</td>
                <td>{itm.isMarried ? "isMarried✅" : "isMarried❌"}</td>
                <td>
                  <button
                    onClick={() => delItem(itm.id as string)}
                    className="btn btn-danger"
                  >
                    X
                  </button>
                  <button
                    onClick={() => editItem(itm)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
