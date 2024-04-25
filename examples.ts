import { load } from "https://deno.land/std@0.222.1/dotenv/mod.ts";
const env = await load();

import { Formstack } from "./mod.ts";

try {

    const formstack = new Formstack(env.FORMSTACK_ACCESS_TOKEN);

    const smartlists = await formstack.get_smartlists()
    console.log('smartlists',smartlists.length)

    await formstack.new_smartlist_option(123456, [{
        label: 'Zebra',
        value: '123'
    }])

    const options = await formstack.get_smartlist_options(123456)
    console.log('options',options.length)

    const option_id = options[options.length-1]
    await formstack.remove_smartlist_option(123456, option_id)

} catch (error) {
    console.error(error.message)
}
