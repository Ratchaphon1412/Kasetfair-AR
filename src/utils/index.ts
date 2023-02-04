export const getAsset = (path: string): string => {
    if (path[0] === '/') {
        path = path.slice(1);
    }
	return new URL(`../assets/${path}`, import.meta.url).href;
};