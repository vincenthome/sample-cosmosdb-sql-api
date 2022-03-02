import { CosmosClient } from '@azure/cosmos';
import {Command, Flags} from '@oclif/core'
import { Utils } from '../utils';

export default class Update extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    "is-capitol": Flags.boolean({char: 'c'}),
  }

  static args = [{name: 'id'}]


  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Update)

    let client = new CosmosClient({ endpoint: Utils.endpoint, key: Utils.key });
    const dbId = 'mdbsqlapi220226'
    const database = await client.database(dbId);
    const ctnrId = 'mcntr220226'
    const container = database.container(ctnrId);

    // query to return an items
    const querySpec = {
      query: `SELECT * from c where c.id = '${args.id}'`
    };

    const { resources } = await container.items
      .query(querySpec)
      .fetchAll();

    const { id } = resources[0];

    resources[0].isCapitol = flags['is-capitol'] || false;
    const { resource: updatedItem } = await container
      .item(id, id)
      .replace(resources[0]);
  }
}
