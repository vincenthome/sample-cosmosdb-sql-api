import { CosmosClient } from '@azure/cosmos'
import {Command, Flags} from '@oclif/core'
import { Utils } from '../utils'

export default class Query extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Query)

    let client = new CosmosClient({ endpoint: Utils.endpoint, key: Utils.key });
    const dbId = 'mdbsqlapi220226'
    const database = await client.database(dbId);
    const ctnrId = 'mcntr220226'
    const container = database.container(ctnrId);

    // const { item } = await container.item("1").read<any>();
    // console.log(item);

    // const { resources } = await container.items
    //   .query("SELECT * from c WHERE c.isCapitol = false")
    //   .fetchAll();

    // for (const city of resources) {
    //   console.log(`${city.name}, ${city.state} is a capitol `);
    // }

    // Perform parameterized queries
    const { resources } = await container.items
      .query({
        query: "SELECT * from c WHERE c.isCapitol = @isCapitol",
        parameters: [{ name: "@isCapitol", value: true }]
      })
      .fetchAll();
    for (const city of resources) {
      console.log(`${city.name}, ${city.state} is a capitol `);
    }

    this.log(`done query`)
  }
}
