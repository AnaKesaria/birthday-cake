document.addEventListener("DOMContentLoaded", function() {
  const birthdayMonth = 9; // october (0 = Jan)
  const birthdayDay = 6;

  const message = document.querySelector(".message");
  const cake = document.querySelector(".cake");
  const text = document.querySelector(".text");

  function updateCountdown() {
    const now = new Date(); /* new Date() is the actual function call 
    that creates a Date object representing the current date and time. */
    const month = now.getMonth();
    const day = now.getDate();

    if (month === birthdayMonth && day === birthdayDay) {
      // Birthday today → show cake all day
      message.style.display = "none";
      cake.style.display = "block";
      text.style.display = "block";
    } else {
      // Countdown until birthday
      const thisYear = now.getFullYear();
      let birthday = new Date(thisYear, birthdayMonth, birthdayDay, 0, 0, 0);/* 
      new Date() is not only for today. ✅

      It’s a general way to create a Date object. How it behaves depends on what arguments you give it.
      If no arguments are provided, it will default to the current date and time. */

      // If birthday already passed, use next year
      if (now > birthday) {
        birthday = new Date(thisYear + 1, birthdayMonth, birthdayDay, 0, 0, 0);
      }

      let diff = birthday - now;/* Subtracting two Date objects gives milliseconds difference. */

      /* Math.floor() is a JavaScript function that takes a number and rounds it down to the nearest integer. */

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));/* round down to get full days remaining 
      (3 days, ignoring the 0.7 fraction). 
      (1000 * 60 * 60 * 24)  milliseconds in a day */
      diff -= days * (1000 * 60 * 60 * 24);/* diff -= X is short for:
        diff = diff - X;
        It subtracts X from the current value of diff and updates diff.
        -= is just shorthand for subtract and assign.
        diff -= days * (1000 * 60 * 60 * 24);
        is the same as:
        diff = diff - (days * 1000 * 60 * 60 * 24);
        2️⃣ Why do we subtract here?
        diff initially = total milliseconds until birthday.

        days * (1000*60*60*24) = the milliseconds that are already counted as full days.

        We subtract this so that diff now only contains the remaining milliseconds for hours, minutes, and seconds.*/

      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);

      const seconds = Math.floor(diff / 1000);

      message.style.display = "block";
      cake.style.display = "none";
      text.style.display = "none";

      message.textContent = `🎁 My birthday is in ${days}d ${hours}h ${minutes}m ${seconds}s!`;
    }
  }

  // Initial call
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);
});
