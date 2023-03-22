export const resetTextFromLabels = (divIds: string[]) => {
  divIds.forEach((id) => {
    const div = document.querySelector('#' + id) as HTMLDivElement;
    const label = div.firstChild as HTMLLabelElement;
    label.classList.remove('error');
    label.textContent = label.getAttribute('data-text');
  });
};

// todo > Tests
