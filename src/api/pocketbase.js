import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.VITE_PB_URL);

export default pb;
