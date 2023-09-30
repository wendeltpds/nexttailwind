export async function Teste() {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1' , {
        cache: 'no-store',
    })

    const repos = await response.json()

    return (
        <div>
            <h1>repos</h1>
            <pre>{JSON.stringify(repos.title, null , 2)}</pre>
            <pre>{repos.id}</pre>
        </div>
    );
}