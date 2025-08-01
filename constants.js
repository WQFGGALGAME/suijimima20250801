export const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
export const NUMBER_CHARS = "0123456789";
export const DEFAULT_SPECIAL_CHARS = "!@#$%^&*_-+=~?/";

export const PROBLEM_CHARS = `"' \`\`/\\;%<>[]{}()`;

export const CRACK_ATTEMPTS_PER_SECOND = 1_000_000_000_000; // 10^12

export const TIME_UNITS = [
    { unit: "年", seconds: 31536000 },
    { unit: "天", seconds: 86400 },
    { unit: "小时", seconds: 3600 },
    { unit: "分钟", seconds: 60 },
    { unit: "秒", seconds: 1 },
];
