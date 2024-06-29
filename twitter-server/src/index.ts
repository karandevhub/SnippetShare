import { startServer } from "./app";

async function init(){
    try {
        const app = await startServer();
        app.listen(4000, ()=> console.log("Server started at http://localhost:4000/graphql"));
    } catch (error) {
        console.error("Error starting server", error);
    }
}

init();