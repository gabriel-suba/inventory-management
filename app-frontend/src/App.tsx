import useFetchUsers from "./hooks/useFetchUsers";

function App() {
    const [users, error] = useFetchUsers();

    console.log(users, error);

    return <div className="App"></div>;
}

export default App;
