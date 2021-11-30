import { EK } from '@/eventKeys';
import { ipcRenderer } from 'electron';

document.addEventListener('DOMContentLoaded', () => {
  const popover = document.createElement('div');
  popover.classList.add('pia-player-popover');

  window.addEventListener('mouseup', async () => {
    const selection = getSelection();
    if (selection && selection.toString().length > 0) {
      const pinyin: string[][] = await ipcRenderer.invoke(
        EK.pinyin,
        selection.toString()
      );
      popover.innerText = pinyin.map((p) => p.join('/')).join(' ');
      document.body.appendChild(popover);

      const range = selection.getRangeAt(0);
      const { x, y, width } = range.getBoundingClientRect();
      const { width: popoverWidth, height: popoverHeight } =
        popover.getBoundingClientRect();
      popover.style.top = `${y - popoverHeight - 8}px`;
      popover.style.left = `${x - (popoverWidth - width) / 2}px`;
    } else {
      popover.remove();
    }
  });

  document.getElementById('app')?.addEventListener('scroll', () => {
    popover.remove();
  });
});
