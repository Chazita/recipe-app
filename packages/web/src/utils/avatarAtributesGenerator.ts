function stringToColor(name: string) {
	let hash = 0;
	let i;

	for (i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}

	return color;
}

/**
 * Generates a color code base on the name received.
 * @param name string | undefined
 * @returns returns a object with bgcolor
 */
export function avatarColorGenerator(name: string | undefined) {
	if (!name) {
		return {
			bgcolor: "#fff",
		};
	} else {
		return {
			bgcolor: stringToColor(name),
		};
	}
}

/**
 *
 * @param name string
 * @returns return the first letter.
 */
export function avatarName(name: string) {
	return { children: `${name[0]}` };
}
