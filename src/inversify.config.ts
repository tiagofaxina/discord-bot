import "reflect-metadata";
import { Client } from "discord.js";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { MessageResponder } from "./services/message-responder";
import { PingFinder } from "./services/ping-finder";

const container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container
  .bind<string>(TYPES.Token)
  .toConstantValue(process.env.TOKEN as string);
container
  .bind<MessageResponder>(TYPES.MessageResponder)
  .to(MessageResponder)
  .inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();

export default container;
