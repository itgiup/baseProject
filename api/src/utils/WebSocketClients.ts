/**
 * Manages WebSocket clients, providing functionality to add, remove, and interact with clients.
 * 
 * This class maintains a collection of WebSocket clients identified by unique IDs. It provides
 * methods to send messages to individual clients, groups of clients, or all clients, with options
 * to exclude specific clients or groups. It also supports broadcasting messages and managing
 * the lifecycle of WebSocket connections.
 * 
 * Features:
 * - Add and remove WebSocket clients.
 * - Send messages to individual clients, groups, or all clients.
 * - Exclude specific clients or groups when sending messages.
 * - Broadcast messages to all connected clients.
 * - Manage the lifecycle of WebSocket connections, including closing all connections.
 * - Retrieve information about connected clients, such as count and list of clients.
 */
import WebSocket from 'ws';



class WebSocketClientsManager {
    private clients: Map<string, WebSocket>;

    constructor() {
        this.clients = new Map();
    }

    addClient(id: string, socket: WebSocket): void {
        if (this.clients.has(id)) {
            throw new Error(`Client with ID ${id} already exists.`);
        }
        this.clients.set(id, socket);
        console.log(`Client ${id} added.`);
    }

    removeClient(id: string): void {
        if (!this.clients.has(id)) {
            throw new Error(`Client with ID ${id} does not exist.`);
        }
        this.clients.get(id)?.close();
        this.clients.delete(id);
        console.log(`Client ${id} removed.`);
    }

    getClient(id: string): WebSocket | undefined {
        return this.clients.get(id);
    }

    broadcast(message: string): void {
        this.clients.forEach((socket, id) => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(message);
                console.log(`Message sent to client ${id}.`);
            }
        });
    }

    getClientCount(): number {
        return this.clients.size;
    }

    getClients(): Map<string, WebSocket> {
        return this.clients;
    }

    clearClients(): void {
        this.clients.forEach((socket) => {
            socket.close();
        });
        this.clients.clear();
        console.log('All clients removed.');
    }

    sendMessageTo(id: string, message: string): void {
        const client = this.clients.get(id);
        if (!client) {
            throw new Error(`Client with ID ${id} does not exist.`);
        }
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
            console.log(`Message sent to client ${id}.`);
        } else {
            console.log(`Cannot send message to client ${id} as the connection is not open.`);
        }
    }

    sendMessageToAll(message: string): void {
        this.clients.forEach((client, id) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log(`Message sent to client ${id}.`);
            } else {
                console.log(`Cannot send message to client ${id} as the connection is not open.`);
            }
        });
    }

    sendMessageToGroup(group: string[], message: string): void {
        group.forEach((id) => {
            const client = this.clients.get(id);
            if (client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                    console.log(`Message sent to client ${id}.`);
                } else {
                    console.log(`Cannot send message to client ${id} as the connection is not open.`);
                }
            } else {
                console.log(`Client with ID ${id} does not exist.`);
            }
        });
    }

    sendMessageToGroupExcept(group: string[], exceptId: string, message: string): void {
        group.forEach((id) => {
            if (id !== exceptId) {
                const client = this.clients.get(id);
                if (client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                        console.log(`Message sent to client ${id}.`);
                    } else {
                        console.log(`Cannot send message to client ${id} as the connection is not open.`);
                    }
                } else {
                    console.log(`Client with ID ${id} does not exist.`);
                }
            }
        });
    }

    sendMessageToAllExcept(exceptId: string, message: string): void {
        this.clients.forEach((client, id) => {
            if (id !== exceptId) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                    console.log(`Message sent to client ${id}.`);
                } else {
                    console.log(`Cannot send message to client ${id} as the connection is not open.`);
                }
            }
        });
    }

    sendMessageToAllExceptGroup(group: string[], message: string): void {
        this.clients.forEach((client, id) => {
            if (!group.includes(id)) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                    console.log(`Message sent to client ${id}.`);
                } else {
                    console.log(`Cannot send message to client ${id} as the connection is not open.`);
                }
            }
        });
    }


}

export default WebSocketClientsManager;