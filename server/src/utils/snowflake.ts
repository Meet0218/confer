export class Snowflake {
  private epoch = 1704067200000n; // 2024-01-01
  private machineId = 1n;
  private sequence = 0n;
  private lastTimestamp = -1n;

  public generate(): string {
    let timestamp = BigInt(Date.now());

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & 4095n;
      if (this.sequence === 0n) {
        // Wait for next millisecond
        while (timestamp <= this.lastTimestamp) {
          timestamp = BigInt(Date.now());
        }
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    const id = ((timestamp - this.epoch) << 22n) | (this.machineId << 12n) | this.sequence;
    return id.toString();
  }
}

export const snowflake = new Snowflake();
