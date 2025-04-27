import { GrowthJob } from "./growth-job";
import { Slot } from "./slot";


export class Tower {
  constructor(public number: number, public slots: Slot[]) {
  }

  public getGrowthJobs(): GrowthJob[] {
    const allGrowthJobs: GrowthJob[] = [];

    for (const slot of this.slots) {
      if (slot.growthTray?.growthJob != null) {
        allGrowthJobs.push(slot.growthTray.growthJob);
      }
    }

    return allGrowthJobs;
  }
}
