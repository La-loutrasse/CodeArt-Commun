import { Collection } from "discord.js";
import {opendir} from "node:fs/promises";
import path from "node:path";

async function getAllPaths(basePath) {
	const paths = [];
	const dir = await opendir(basePath);
	for await (const dirent of dir) {
		if (dirent.isDirectory()) {
			paths.push(...await getAllPaths(path.join(basePath, dirent.name)));
		} else {
			paths.push(path.join(basePath, dirent.name));
		}
	}
	return paths;
}

async function loadEvents(client) {
	for (const path of await getAllPaths(process.cwd() + "/src/events")) {
		const event = await import("file://" + path);
		client[event.once ? "once" : "on"](event.name, event.execute);
		console.log(`| Event: ${event.name}`);
	}
}

async function loadCommands(client) {
	client.commands = new Collection();
	for (const path of await getAllPaths(process.cwd() + "/src/commands")) {
		const command = await import("file://" + path);
		client.commands.set(command.data.name, command);
		console.log(`| Command: ${command.data.name}`);
	}
}

async function loadComponents(client) {
	client.components = new Collection();
	for (const path of await getAllPaths(process.cwd() + "/src/components")) {
		const component = await import("file://" + path);
		client.components.set(component.name, component);
		console.log(`| Component: ${component.name}`);
	}
}

export {
	getAllPaths,
	loadEvents,
	loadCommands,
	loadComponents
}