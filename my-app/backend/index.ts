import { Server } from 'socket.io';

function main() {
    const io = new Server({
        cors: {
            origin: "*",
        },
    });

    //Écouteur d'événement pour une nouvelle connexion
    io.on("connection", (socket) => {
        console.log('New connection', socket.id);

        //Écouteur d'événement pour tous les événements
        socket.onAny((event, message) => { 
            console.log('Received message', message, 'from', event);


            io.emit(event, message);
        });

        //Écouteur d'événement pour les messages
        socket.on("message", (message) => {
            console.log('Received message', message);

            //Émettre un message à tous les clients connectés
            io.emit("message", message);
        });
    });

    io.listen(3000);

    console.log("Server started on port 3000");
}

main();