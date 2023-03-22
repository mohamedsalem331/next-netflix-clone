import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((result) => result.data);

export default fetcher;
