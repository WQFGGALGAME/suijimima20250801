import * as CONST from './constants.js';

function formatTimeToCrack(seconds) {
    if (seconds < 1) return "瞬时";

    for (const unitInfo of CONST.TIME_UNITS) {
        if (seconds >= unitInfo.seconds) {
            const value = Math.floor(seconds / unitInfo.seconds);
            if (value > 1000000) return `数百万${unitInfo.unit}`;
            if (value > 100) return `数百年`; // Simplified for "centuries"
            return `${value} ${unitInfo.unit}`;
        }
    }
    return "瞬时";
}

export function analyzeStrength(passwordLength, characterPool) {
    const poolSize = characterPool.length;
    if (poolSize <= 1 || passwordLength === 0) {
        return {
            entropy: 0,
            timeToCrack: "瞬时"
        };
    }
    

    const entropy = passwordLength * Math.log2(poolSize);
    


    const combinations = BigInt(2) ** BigInt(Math.floor(entropy));
    const crackTimeSeconds = Number(combinations / BigInt(CONST.CRACK_ATTEMPTS_PER_SECOND));

    return {
        entropy: parseFloat(entropy.toFixed(2)),
        timeToCrack: formatTimeToCrack(crackTimeSeconds)
    };
}
