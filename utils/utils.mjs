// utils/utils.mjs
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Экспортируем rl по умолчанию
export default rl;