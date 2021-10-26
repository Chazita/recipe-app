type EnumType = {
	key: string;
	value: string;
};

export default function enumToArray(enumme: any): EnumType[] {
	return Object.entries(enumme).map(([key, value]) => {
		return { key, value: value as string };
	});
}
