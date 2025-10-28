class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    // Проверяем, переданы ли оба аргумента (не undefined и не null)
    // Тест проверяет clock.addClock(null, f => f), значит, null также считается отсутствием аргумента
    if (time === undefined || time === null || callback === undefined || callback === null) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
    if (existingAlarm) {
      console.warn('Уже присутствует звонок на это же время');
    }

    this.alarmCollection.push({
      callback: callback,
      time: time,
      canCall: true
    });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
  }

  getCurrentFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString("ru-Ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  start() {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}