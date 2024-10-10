const primes = calculatePrimes(5_000_000n);
const numberInput = document.getElementById("number-input")! as HTMLInputElement;
const output = document.getElementById("output")! as HTMLParagraphElement;
const errorDisplay = document.getElementById("error-display")! as HTMLParagraphElement;

function onNumberInput(): void {
    console.log(primes);
    numberInput.value = numberInput.value.replace(/\D/g, "");
    calculateAndPutPrimeFactorsString();
}

function calculateAndPutPrimeFactorsString(): void {
    if (numberInput.value.length == 0) {
        output.textContent = "";
        errorDisplay.textContent = "";
        return;
    }
    let num: bigint;
    try {
        num = BigInt(numberInput.value);
    } catch (e) {
        output.textContent = "";
        errorDisplay.textContent = "";
        return;
    }
    const [primeFactorsString, errorMessage] = calculatePrimeFactorsString(num);
    output.innerHTML = primeFactorsString;
    if (errorMessage) {
        errorDisplay.textContent = errorMessage;
    } else {
        errorDisplay.textContent = "";
    }
}

function calculatePrimeFactorsString(num: bigint): [string, string | null] {
    if (num < 1n) {
        return ["Please enter a positive integer.", null];
    }
    if (num == 1n) {
        return ["The number 1 is neither a prime nor a composite number.", null];
    }
    const [primeFactors, error] = calculatePrimeFactors(num);
    let errorMessage: string;
    if (error) {
        if (primeFactors.length == 1) {
            errorMessage = "Error: The prime factors could not be found.";
        } else {
            errorMessage = "Error: Not all prime factors could be found.";
        }
    } else {
        errorMessage = null;
    }
    const primeFactorsMap = toPrimeFactorsMap(primeFactors);
    return [Array.from(primeFactorsMap.entries()).map(([b, x]) => x === 1 ? b.toString() : `${b}<sup>${x}</sup>`)
            .join(" &times; "), errorMessage];
}

function calculatePrimeFactors(num: bigint): [bigint[], boolean] {
    const primeFactors: bigint[] = [];
    const greatestPrime = primes[primes.length - 1];
    let error = false;
    for (const prime of primes) {
        if (prime * prime > num) break;
        while (num % prime === 0n) {
            primeFactors.push(prime);
            num /= prime;
        }
    }
    if (num > 1n) {
        if (num > greatestPrime)
            error = true;
        primeFactors.push(num);
    }
    return [primeFactors, error];
}

function toPrimeFactorsMap(primeFactors: bigint[]): Map<bigint, number> {
    const factorCount = primeFactors.reduce((countMap: Map<bigint, number>, factor: bigint) => {
        const currentCount = countMap.get(factor) || 0;
        countMap.set(factor, currentCount + 1);
        return countMap;
    }, new Map<bigint, number>());
    return factorCount;
}


function calculatePrimes(limit: bigint): bigint[] {
    const primes = [2n];
    for (let i = 3n; i <= limit; i += 2n) {
        if (isPrime(i, primes)) {
            primes.push(i);
        }
    }
    return primes;
}

function isPrime(num: bigint, primes: bigint[]): boolean {
    if (num < 2n) return false;
    for (const prime of primes) {
        if (prime * prime > num) break;
        if (num % prime === 0n) return false;
    }
    return true;
}