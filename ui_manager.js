export function syncSliderAndInput(slider, input, display, minVal) {
    function updateValues(source) {
        const value = source.value;
        if (source === slider && parseInt(value) < minVal) {
            slider.value = minVal;
        }
        display.textContent = value;
        if(source === slider) input.value = value;
        if(source === input) slider.value = value;
    }

    slider.addEventListener('input', () => updateValues(slider));
    input.addEventListener('input', () => updateValues(input));

    input.addEventListener('change', () => {
        let value = parseInt(input.value, 10);
        if (isNaN(value) || value < minVal) {
            value = minVal;
        }
        if (value > parseInt(input.max, 10)) {
            value = parseInt(input.max, 10);
        }
        input.value = value;
        slider.value = value;
        display.textContent = value;
    });
}

export function updatePasswordDisplay(password, outputElement) {
    outputElement.value = password;
}

export function updateStrengthDisplay(strength, controls) {
    controls.entropyDisplay.textContent = `${strength.entropy} bits`;
    controls.crackTimeDisplay.textContent = strength.timeToCrack;

    const entropy = strength.entropy;
    const crackTimeDisplay = controls.crackTimeDisplay;
    crackTimeDisplay.classList.remove('text-red-500', 'text-amber-400', 'text-emerald-400');

    if (entropy < 50) {
        crackTimeDisplay.classList.add('text-red-500');
    } else if (entropy < 80) {
        crackTimeDisplay.classList.add('text-amber-400');
    } else {
        crackTimeDisplay.classList.add('text-emerald-400');
    }
}

export function handleCopy(text, buttonElement) {
    if (text === '错误' || text === '正在生成...') return;
    navigator.clipboard.writeText(text).then(() => {
        const icon = buttonElement.querySelector('i');
        const originalIcon = icon.dataset.lucide;
        icon.setAttribute('data-lucide', 'check');
        lucide.createIcons();
        buttonElement.classList.add('text-emerald-400');

        setTimeout(() => {
            icon.setAttribute('data-lucide', originalIcon);
            lucide.createIcons();
            buttonElement.classList.remove('text-emerald-400');
        }, 2000);
    }).catch(err => {
        console.error('无法复制: ', err);
    });
}

export function displayError(errorMessage, controls) {
    controls.passwordOutput.value = '错误';
    controls.entropyDisplay.textContent = '-- bits';
    controls.crackTimeDisplay.textContent = '--';
    controls.errorDisplay.textContent = errorMessage;
}

export function clearError(controls) {
    controls.errorDisplay.textContent = '';
}
