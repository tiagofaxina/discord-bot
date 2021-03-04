import { expect } from "chai";
import { PingFinder } from "./ping-finder";

describe("PingFinder", () => {
  let service: PingFinder;

  beforeEach(() => {
    service = new PingFinder();
  });

  it('should find "ping" in the string', () => {
    expect(service.isPing("ping")).to.be.true;
  });

  it('should not find "ping" in the string', () => {
    expect(service.isPing("diferent string")).to.be.false;
  });
});
