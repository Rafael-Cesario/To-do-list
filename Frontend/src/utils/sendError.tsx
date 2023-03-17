export const sendError = (errors: { [elementId: string]: string }) => {
  const keys = Object.keys(errors);

  keys.forEach((key) => {
    const div = document.querySelector(`#${key}`) as HTMLDivElement;
    const label = div.firstChild as HTMLLabelElement;
    label.textContent = errors[key];
    label.classList.add('error');
  });
};
