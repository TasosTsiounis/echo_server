import net from 'net';

const PORT = 8007;
const HOST = '0.0.0.0';

//Socket is an object that represents the connection with a specific client

const server = net.createServer((socket) => {
    const remote = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`Client connected on ${remote}`);

    socket.on('data', (data) => {
        console.log(`Received ${data.length} bytes from ${remote}`);

        const ok = socket.write(data);

        if (!ok) {console.log("Data are in a queue but not sent yet..")}; //maybe I am sending faster than the client receives
    })
    
    socket.on('close', () => {
        console.log(`Client disconnected : ${remote}. Socket closed..`);
    })

    socket.on('error', (error) => {
        console.log(`Socket error: ${error.message}`);
    })
})


server.on('error', (error) => {
    console.log(`Server error: `, error.message);
})

server.listen(PORT,HOST, () => {
    console.log(`TCP server listening on port: ${PORT}`);

})

const shutdown = () => {
  console.log('\nShutting down gracefully...');
  
  server.close(() => {
    console.log('Server closed. Exiting...');
    process.exit(0);
  });

  // Timeout: αν δεν κλείσει σε 10 δευτερόλεπτα, force exit
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', shutdown);  // Ctrl+C
process.on('SIGTERM', shutdown); // Kill command