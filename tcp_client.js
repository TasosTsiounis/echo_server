import net from 'net';
import readline from 'readline';


const client = net.createConnection({ port: 8007 }, () => {
  console.log('Connected. Type lines to send:');
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', (line) => {
  client.write(line + '\n');
})



client.on('data', (data) => {
  console.log('Received:', data.toString());
});

client.on('end', () => {
  console.log('Server closed connection');
  rl.close();

});
