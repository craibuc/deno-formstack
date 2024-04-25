import { load } from "https://deno.land/std@0.222.1/dotenv/mod.ts";
const env = await load();

import { Formstack } from "./mod.ts";

try {

    const formstack = new Formstack(env.FORMSTACK_ACCESS_TOKEN);
    
    const smartlists = await formstack.get_smartlists()
    console.log('smartlists',smartlists.length)

} catch (error) {
    console.error(error.message)
}