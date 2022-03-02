import { CosmosClient } from '@azure/cosmos';
import {Command, Flags} from '@oclif/core'
import { Utils } from '../utils';

// https://docs.microsoft.com/en-us/azure/cosmos-db/sql/create-sql-api-nodejs

export default class Add extends Command {
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
    const {args, flags} = await this.parse(Add)

    // let client = new CosmosClient({ endpoint: Utils.endpoint, key: Utils.key });
    // const db = 'mdbsqlapi220226'
    // const { database } = await client.databases.createIfNotExists({ id: db });
    // console.log(database.id);
    // const ctnr = 'mcntr220226'
    // const { container } = await database.containers.createIfNotExists({ id: ctnr });
    // console.log(container.id);

    let client = new CosmosClient({ endpoint: Utils.endpoint, key: Utils.key });
    const dbId = 'mdbsqlapi220226'
    const database = await client.database(dbId);
    const ctnrId = 'mcntr220226'
    const container = database.container(ctnrId);

    const cities = [
      { id: "1", name: "Olympia", state: "WA", isCapitol: true },
      { id: "2", name: "Redmond", state: "WA", isCapitol: false },
      { id: "3", name: "Chicago", state: "IL", isCapitol: false }
    ];
    for (const city of cities) {
      container.items.create(city);
    }

    this.log(`done add`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
