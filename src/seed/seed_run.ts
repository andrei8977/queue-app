import { CreateSeed } from "./seed";

// create initial data
async function seed_run(){
  let create_seed = new CreateSeed()
  await create_seed.main_seed()
}

seed_run()

