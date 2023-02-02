const q = (sel) => [...document.querySelectorAll(sel)];
q.id = (id) => document.getElementById(id);

const ev = (el, name, cb, opts = {}) => {
  el.addEventListener(name, cb, {
    passive: true,
    ...opts
  });
};

ev(document, "DOMContentLoaded", registerEvents);

const thisYear = new Date().getFullYear();

const monthsInYear = 12;

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (y) => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);

const getDaysInMonth = (year, month) => {
  if (!year || !month) {
    return 0;
  }
  const shouldAddDay = month == 2 && isLeapYear(year);
  return daysInMonth[month - 1] + (shouldAddDay ? 1 : 0);
};

function registerEvents(_) {
  const y = q.id("year");
  const m = q.id("month");
  const d = q.id("day");

  y.setAttribute("max", thisYear);

  const updateDay = (_) => {
    const year = y.value;
    const month = m.value;
    const days = getDaysInMonth(year, month);

    [...d.children].forEach((option, i) => {
      if (i === 0) return;
      if (i <= days) {
        option.removeAttribute("hidden");
      } else {
        option.setAttribute("hidden", "");
      }
    });

    const selectedDay = d.querySelector(":checked")?.value ?? 0;
    if (selectedDay > days) {
      d.value = d.children[0].value;
    }
  };

  ev(y, "input", updateDay);
  ev(m, "input", updateDay);

  q('[data-msg]').forEach((input) => {
    ev(input, 'invalid', (_) => {
      input.setCustomValidity(input.dataset.msg);
    })
    ev(input, 'input', (_) => {
      input.setCustomValidity('');
    })
  })

  console.log(globalThis['ev'])
}
