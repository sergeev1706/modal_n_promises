let cssPromise = null;

function loadModalCSS() {
  if (cssPromise) return cssPromise
  cssPromise = new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './modal.css';
    link.addEventListener('load', () => {
      resolve();
    })
    document.head.append(link);
    cssLoaded = true;
  })
  return cssPromise;
}

async function askConfirmation(text = 'Вы уверены') {
  await loadModalCSS()

  return new Promise(resolve => {
    const root = document.createElement('div');
    const win = document.createElement('div');
    const paragraf = document.createElement('p');
    const btnYes = document.createElement('button');
    const btnNo = document.createElement('button');

    root.classList.add('modal-root');
    win.classList.add('modal-win');

    root.append(win);
    win.append(paragraf);
    win.append(btnYes);
    win.append(btnNo);

    btnYes.addEventListener('click', () => {
      root.remove()
      resolve(true)
    })

    btnNo.addEventListener('click', () => {
      root.remove()
      resolve(false)
    })

    paragraf.textContent = text;
    btnYes.textContent = 'Да';
    btnNo.textContent = 'Нет';

    document.body.append(root)
  })
}

document.querySelector('#open-modal-button').addEventListener('click', async () => {
  let confirmed = await askConfirmation()
  console.log(confirmed);

})