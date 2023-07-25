import fs from 'node:fs';
import path from 'node:path';

export async function loadEvents(client) {
    const eventsPath = path.join(process.cwd(), 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const urlPath = 'file:///' + path.resolve(filePath).replace(/\\/g, '/');

  const event = await import(urlPath);
  if (event.once) {
    client.once(event.event.name, (...args) => event.event.execute(...args, client));
  } else {
    client.on(event.event.name, (...args) => event.event.execute(...args, client));
  }
}

}