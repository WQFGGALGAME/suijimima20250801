import * as CONST from './constants.js';

function getCryptoRandom(max) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % max;
}

export function buildCharacterPool(options) {
    let pool = "";
    if (options.includeUppercase) pool += CONST.UPPERCASE_CHARS;
    if (options.includeLowercase) pool += CONST.LOWERCASE_CHARS;
    if (options.includeNumbers) pool += CONST.NUMBER_CHARS;
    if (options.includeSpecial) pool += CONST.DEFAULT_SPECIAL_CHARS;

    let exclusions = new RegExp(`[${options.excludeChars.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}]`, 'g');
    pool = pool.replace(exclusions, '');

    if (options.excludeProblemChars) {
        let problemExclusions = new RegExp(`[${CONST.PROBLEM_CHARS.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}]`, 'g');
        pool = pool.replace(problemExclusions, '');
    }

    if (!options.includeUppercase && !options.includeLowercase && !options.includeNumbers && !options.includeSpecial) {
        return { characterPool: "", error: "请至少选择一种字符类型。" };
    }

    if (pool.length === 0) {
        return { characterPool: "", error: "字符池为空，无法生成密码。请检查排除选项或包含更多字符类型。" };
    }

    return { characterPool: pool, error: null };
}

function generateRandomString(length, pool) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += pool.charAt(getCryptoRandom(pool.length));
    }
    return result;
}

function buildFirstCharPool(type, mainPool) {
    let firstPool = '';
    const letterRegex = new RegExp('[a-zA-Z]');
    const numberRegex = new RegExp('[0-9]');
    
    for (const char of mainPool) {
        if (type === 'letter' && letterRegex.test(char)) {
            firstPool += char;
        } else if (type === 'number' && numberRegex.test(char)) {
            firstPool += char;
        }
    }
    return firstPool;
}

export function generatePassword(options, characterPool) {
    if (!characterPool || characterPool.length === 0) {
        return "错误";
    }

    if (options.firstCharType === 'any') {
        return generateRandomString(options.length, characterPool);
    }

    const firstCharPool = buildFirstCharPool(options.firstCharType, characterPool);
    
    if (firstCharPool.length === 0) {


        return generateRandomString(options.length, characterPool);
    }
    
    const firstChar = firstCharPool.charAt(getCryptoRandom(firstCharPool.length));
    const restOfPassword = generateRandomString(options.length - 1, characterPool);

    return firstChar + restOfPassword;
}
