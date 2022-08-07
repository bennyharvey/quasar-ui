import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    t: 0,
    timestamps: {},
    flipflop: false,
  }),
  actions: {
    setTimestamp(timestamp: number) {
      // this.timestamps = timestamp;
      this.t = timestamp;
    },
    triggerFlipflop() {
      this.flipflop = this.flipflop ? false : true;
    },
  },
});
