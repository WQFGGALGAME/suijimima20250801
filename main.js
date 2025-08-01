import * as CONST from './constants.js';
import { generatePassword, buildCharacterPool } from './password_generator.js';
import { analyzeStrength } from './strength_analyzer.js';
import * as UIManager from './ui_manager.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const controls = {
        lengthSlider: document.getElementById('length-slider'),
        lengthInput: document.getElementById('length-input'),
        lengthDisplay: document.getElementById('length-display'),
        includeUppercase: document.getElementById('include-uppercase'),
        includeLowercase: document.getElementById('include-lowercase'),
        includeNumbers: document.getElementById('include-numbers'),
        includeSpecial: document.getElementById('include-special'),
        excludeChars: document.getElementById('exclude-chars'),
        excludeProblemChars: document.getElementById('exclude-problem-chars'),
        copyButton: document.getElementById('copy-button'),
        passwordOutput: document.getElementById('password-output'),
        entropyDisplay: document.getElementById('entropy-display'),
        crackTimeDisplay: document.getElementById('crack-time-display'),
        errorDisplay: document.getElementById('strength-error'),
        firstCharAny: document.getElementById('first-char-any'),
        firstCharLetter: document.getElementById('first-char-letter'),
        firstCharNumber: document.getElementById('first-char-number'),
        generateButton: document.getElementById('generate-button'),
    };

    function collectOptions() {
        const firstCharType = document.querySelector('input[name="first-char-type"]:checked').value;
        return {
            length: parseInt(controls.lengthSlider.value, 10),
            includeUppercase: controls.includeUppercase.checked,
            includeLowercase: controls.includeLowercase.checked,
            includeNumbers: controls.includeNumbers.checked,
            includeSpecial: controls.includeSpecial.checked,
            excludeChars: controls.excludeChars.value,
            excludeProblemChars: controls.excludeProblemChars.checked,
            firstCharType: firstCharType,
        };
    }

    function updateFirstCharOptions() {
        const lettersEnabled = controls.includeUppercase.checked || controls.includeLowercase.checked;
        const numbersEnabled = controls.includeNumbers.checked;

        controls.firstCharLetter.disabled = !lettersEnabled;
        controls.firstCharNumber.disabled = !numbersEnabled;
        
        controls.firstCharLetter.parentElement.classList.toggle('opacity-50', !lettersEnabled);
        controls.firstCharNumber.parentElement.classList.toggle('opacity-50', !numbersEnabled);

        const currentFirstChar = document.querySelector('input[name="first-char-type"]:checked');

        if (currentFirstChar && currentFirstChar.disabled) {
            controls.firstCharAny.checked = true;
        }
    }
    
    function runGenerator() {
        const options = collectOptions();
        const { characterPool, error } = buildCharacterPool(options);

        if (error) {
            UIManager.displayError(error, controls);
            return;
        }

        UIManager.clearError(controls);

        const password = generatePassword(options, characterPool);
        const strength = analyzeStrength(password.length, characterPool);

        UIManager.updatePasswordDisplay(password, controls.passwordOutput);
        UIManager.updateStrengthDisplay(strength, controls);
    }

    function setupEventListeners() {
        UIManager.syncSliderAndInput(controls.lengthSlider, controls.lengthInput, controls.lengthDisplay, 8);
        
        const charTypeCheckboxes = [
            controls.includeUppercase,
            controls.includeLowercase,
            controls.includeNumbers,
            controls.includeSpecial,
        ];

        charTypeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateFirstCharOptions);
        });

        controls.generateButton.addEventListener('click', runGenerator);

        controls.copyButton.addEventListener('click', () => {
            UIManager.handleCopy(controls.passwordOutput.value, controls.copyButton);
        });
    }

    setupEventListeners();
    updateFirstCharOptions();
    runGenerator(); 
});
