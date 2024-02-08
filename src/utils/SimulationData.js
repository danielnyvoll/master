import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'; // Server address

export const LiveSimulation = () => {
  const socket = io(SERVER_URL);

  const start = (onDataReceived) => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('simulation_data', data => {
      console.log('Simulation data received:', data);
      onDataReceived(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return {
    start,
    disconnect,
  };
};

// Change to parse to the command
export function parseJsonCommand(jsonString, objectName) {
    let result;

    try {
        result = JSON.parse(jsonString, (key, value) => {
            if (key === objectName) {
                return value;
            } else {
                return value;
            }
        });
    } catch (error) {
        return `Error parsing JSON: ${error.message}`;
    }

    if (result && objectName in result) {
        const obj = result[objectName];
        return { x: obj.x, z: obj.y} ;
    } else {
        return `Object '${objectName}' not found`;
    }
}