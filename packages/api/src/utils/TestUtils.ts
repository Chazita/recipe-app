import { Connection } from 'typeorm';

type EntityValues = {
  name: string;
  tableName: string;
};

export class TestUtils {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  closeDb() {
    if (this.connection.isConnected) {
      this.connection.close();
    }
  }

  getEntities(): EntityValues[] {
    return this.connection.entityMetadatas.map((entity) => {
      return { name: entity.name, tableName: entity.tableName };
    });
  }

  /**
   * Clean the database and load all entities
   */
  async reloadEntities() {
    const entities = this.getEntities();
    await this.cleanAll(entities);
    await this.loadAll(entities);
  }

  async cleanAll(entities: EntityValues[]) {
    try {
      let allEntities: string;
      for (const entity of entities) {
        allEntities += `${this.connection.getRepository(entity.name)},`;
      }
      allEntities.slice(0, -1);
      await this.connection.query(
        `TRUNCATE TABLE ${allEntities} RESTART IDENTITY;`,
      );
    } catch (error) {
      throw new Error(`ERROR [TestUtils.cleanAll]: to cleaning db:${error}`);
    }
  }

  async loadAll(entities: EntityValues[]) {
    try {
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadAll]: to load all the data on db: ${error}`,
      );
    }
  }

  async loadUser(entities: EntityValues[]) {
    try {
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadUser]: to load data on db: ${error}`,
      );
    }
  }
}
