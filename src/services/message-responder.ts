import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { PingFinder } from "./ping-finder";

@injectable()
export class MessageResponder {
  constructor(
    @inject(TYPES.PingFinder) private readonly pingFinder: PingFinder
  ) {}

  execute(message: Message): Promise<Message | Message[]> {
    if (this.pingFinder.isPing(message.content)) {
      return message.reply("pong!");
    }

    return Promise.reject();
  }
}
