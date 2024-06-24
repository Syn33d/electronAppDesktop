import { Server } from 'socket.io';

function main() {
    const io = new Server({
        cors: {
            origin: "*",
        },
    });


    io.on("connection", (socket) => {
        console.log('New connection', socket.id);

        socket.onAny((event, message) => { 
            console.log('Received message', message, 'from', event);


            io.emit(event, message);
        });

        socket.on("message", (message) => {
            console.log('Received message', message);

            io.emit("message", message);
        });
    });

    io.listen(3000);

    console.log("Server started on port 3000");
}

main();