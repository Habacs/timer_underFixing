const app = Vue.createApp({
  data() {
    return {
      newTimerName: "",
      newTimerMinutes: 0,
      newTimerSeconds: 0,
      timers: [],
    };
  },
  methods: {
    addTimer() {
      const totalSeconds = this.newTimerMinutes * 60 + this.newTimerSeconds;
      if (this.newTimerName.trim() && totalSeconds > 0) {
        const newTimer = {
          id: Date.now(),
          name: this.newTimerName,
          duration: totalSeconds,
          remaining: totalSeconds,
          active: false,
          intervalId: null,
        };
        this.timers.push(newTimer);
        this.newTimerName = "";
        this.newTimerMinutes = 0;
        this.newTimerSeconds = 0;
      }
    },
    deleteTimer(index) {
      this.pauseTimer(index);
      this.timers.splice(index, 1);
    },
    pauseTimer(index) {
      const timer = this.timers[index];
      if (timer.active) {
        clearInterval(timer.intervalId);
        timer.active = false;
        timer.intervalId = null;
      }
    },
    resetInterval(index) {
      const timer = this.timers[index];
      timer.remaining = timer.duration;
      this.pauseTimer(index);
    },
    startTimer(index) {
      const timer = this.timers[index];
      if (!timer.active) {
        timer.active = true;
        timer.intervalId = setInterval(() => {
          if (timer.remaining > 0) {
            timer.remaining--;
          } else {
            this.pauseTimer(index);
            alert(`Időzítő lejárt: ${timer.name}`);
          }
        }, 1000);
      }
    },
  },
});

app.mount("#app");
