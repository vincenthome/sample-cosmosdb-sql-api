import { CosmosClient } from '@azure/cosmos'
import {Command, Flags} from '@oclif/core'
import { Utils } from '../utils'

export default class Delete extends Command {
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
    const {args, flags} = await this.parse(Delete)

    let client = new CosmosClient({ endpoint: Utils.endpoint, key: Utils.key });
    const dbId = 'mdbsqlapi220226'
    const database = await client.database(dbId);
    const ctnrId = 'mcntr220226'
    const container = database.container(ctnrId);

    console.log('delete')
    // Delete the first item returned by the query above
    // await container.item("1").delete();
    const { resource: result } = await container.item('3', '3').delete();
    console.log(result);
    this.log(`done delete`)

  }
}
