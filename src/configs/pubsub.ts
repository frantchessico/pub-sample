import PubSub from "@savanapoint/pub-sub";
import { firebaseConfig } from "./firebase";



export const pub  = new PubSub(firebaseConfig);


