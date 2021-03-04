import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { instance, mock, verify, when } from "ts-mockito";
import { Client } from "discord.js";
import { Bot } from "./bot";
import container from "./inversify.config";
import { TYPES } from "./types";

describe("Bot", () => {
  let discordMock: Client;
  let discordMockInstance: Client;
  let bot: Bot;

  beforeEach(() => {
    discordMock = mock(Client);
    discordMockInstance = instance(discordMock);
    container.rebind<Client>(TYPES.Client).toConstantValue(discordMockInstance);
    bot = container.get<Bot>(TYPES.Bot);
  });
});
