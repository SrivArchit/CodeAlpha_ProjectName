const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let input = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      input = '';
    } else if (value === '←') {
      input = input.slice(0, -1);
    } else if (value === '=') {
      try {
        input = eval(input).toString();
      } catch {
        input = 'Error';
      }
    } else {
      input += value;
    }

    display.value = input;
  });
});

document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.'].includes(e.key)) {
    input += e.key;
  } else if (e.key === 'Enter') {
    try {
      input = eval(input).toString();
    } catch {
      input = 'Error';
    }
  } else if (e.key === 'Backspace') {
    input = input.slice(0, -1);
  } else if (e.key === 'Escape') {
    input = '';
  }
  display.value = input;
});
