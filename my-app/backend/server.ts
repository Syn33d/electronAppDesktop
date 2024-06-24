import { Server } from 'socket.io';
import db from './db';

const io = new Server(3000);

io.on('connection', (socket) => {
  socket.on('join', async (channelId) => {
    try {
      socket.join(channelId);

      const messages = await db('messages').where('channel_id', channelId);
      socket.emit('messages', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('error', 'Could not fetch messages');
    }
  });

  socket.on('message', async (channelId, message) => {
    try {
      const [id] = await db('messages').insert({  channelId, message });
      io.to(channelId).emit('message', { id, message });
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', 'Could not save message');
    }
  });
});
