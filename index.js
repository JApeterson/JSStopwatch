class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.reset();
    this.print(this.times);
  }
  //showing es6 feature for binding
  start = () => {
    if (!this.running && this.display.innerText !== "00:00:00") return;
    if (this.running) return;
    document.getElementById("stopwatch").style.color = "indianred";
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step);
    }
  };

  pause() {
    if (!this.running) return;
    document.getElementById("stopwatch").style.color = "#336799";
    this.running = false;
    this.time = null;
  }
  // showing non es6 way to bind
  resume() {
    if (!this.running && this.display.innerText === "00:00:00") return;
    if (this.running) return;
    document.getElementById("stopwatch").style.color = "#79C942";
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }
  reset() {
    if (this.running) return;
    document.getElementById("stopwatch").style.color = "#d81ca4";
    this.running = false;
    this.time = null;
    this.times = [0, 0, 0];
    this.print();
  }
  //showing es6 feature for binding
  step = (timestamp) => {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step);
  };

  calculate(timestamp) {
    var diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[2] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }
    // Minutes are 60 seconds
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  //the format function takes each value from array and the number 2 and passes to pad0 function.
  format(times) {
    return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
  }
}
//named this pad0 because in computer science, the pad0 adds a 0.
//this takes what was passed, stringifies it, and displays that number plus a 0 in front of it
function pad0(value, count) {
  let result = value.toString();
  for (result; result.length < count; --count) {
    result = "0" + result;
  }
  return result;
}

let stopwatch = new Stopwatch(document.querySelector(".stopwatch"));
