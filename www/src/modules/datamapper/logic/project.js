import SchemaParser from "json-schema-ref-parser";
import {EventEmitter} from "events";


export default class Project extends EventEmitter {
  static async load(schema, rules) {
    const project = new Project();
    await project.load(schema, rules);
    return project;
  }
  async load(schema, rules = {}) {
    this.rules = rules;
    this.schema = await SchemaParser.dereference(schema);
    this.$refs = await SchemaParser.resolve(schema);
    await this.setInput(rules.input);
    await this.setOutput(rules.output);
    return;
  }
  getAvailableSchemas() {
    return this.$refs.values();
  }
  async getSchema(path) {
    return this.$refs.get(path);
  }
  async setInput(path) {
    this.input = await this.$refs.get(path);
  }
  async setOutput(path) {
    this.output = await this.$refs.get(path);
  }
}
