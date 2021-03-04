import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { MessageResponder } from "./services/message-responder";
import { TYPES } from "./types";

@injectable()
export class Bot {
  constructor(
    @inject(TYPES.Client) private readonly client: Client,
    @inject(TYPES.Token) private readonly token: string,
    @inject(TYPES.MessageResponder)
    private readonly messageResponder: MessageResponder
  ) {}

  public listen(): Promise<string> {
    this.client.on("message", (message: Message) => {
      if (message.author.bot) {
        console.log("Ignoring bot message!");
        return;
      }

      this.messageResponder
        .execute(message)
        .then(() => {
          console.log("Response sent");
        })
        .catch(() => {
          console.log("Response not sent");
        });
      console.log("Message received! Contents: ", message.content);
    });
    return this.client.login(this.token);
  }
}
