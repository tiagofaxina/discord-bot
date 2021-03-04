import "reflect-metadata";
import "mocha";
import { Message } from "discord.js";
import { instance, mock, verify, when } from "ts-mockito";
import { PingFinder } from "./ping-finder";
import { MessageResponder } from "./message-responder";
import { expect } from "chai";

describe("MessageResponder", () => {
  let mockedPingFinderClass: PingFinder;
  let mockedPingFinderInstance: PingFinder;
  let mockedMessageClass: Message;
  let mockedMessageInstance: Message;

  let service: MessageResponder;

  beforeEach(() => {
    mockedPingFinderClass = mock(PingFinder);
    mockedPingFinderInstance = instance(mockedPingFinderClass);
    mockedMessageClass = mock(Message);
    mockedMessageInstance = instance(mockedMessageClass);
    mockedMessageInstance.content = "Non-empty string";

    service = new MessageResponder(mockedPingFinderInstance);
  });

  it("should reply", async () => {
    when(mockedPingFinderClass.isPing("Non-empty string")).thenReturn(true);
    await service.execute(mockedMessageInstance);
    verify(mockedMessageClass.reply("pong!")).once();
  });

  it("should not reply", async () => {
    when(mockedPingFinderClass.isPing("Non-empty string")).thenReturn(false);
    await service
      .execute(mockedMessageInstance)
      .then(() => {
        // Successful promise is unexpected, so we fail the test
        expect.fail("Unespected Promise");
      })
      .catch(() => {
        // Rejected promise is expected, so nothing happens here
      });

    verify(mockedMessageClass.reply("pong!")).never();
  });
});
