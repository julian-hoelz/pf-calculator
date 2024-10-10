var primes = calculatePrimes(5000000n);
var numberInput = document.getElementById("number-input");
var output = document.getElementById("output");
var errorDisplay = document.getElementById("error-display");
function onNumberInput() {
    console.log(primes);
    numberInput.value = numberInput.value.replace(/\D/g, "");
    calculateAndPutPrimeFactorsString();
}
function calculateAndPutPrimeFactorsString() {
    if (numberInput.value.length == 0) {
        output.textContent = "";
        errorDisplay.textContent = "";
        return;
    }
    var num;
    try {
        num = BigInt(numberInput.value);
    }
    catch (e) {
        output.textContent = "";
        errorDisplay.textContent = "";
        return;
    }
    var _a = calculatePrimeFactorsString(num), primeFactorsString = _a[0], errorMessage = _a[1];
    output.innerHTML = primeFactorsString;
    if (errorMessage) {
        errorDisplay.textContent = errorMessage;
    }
    else {
        errorDisplay.textContent = "";
    }
}
function calculatePrimeFactorsString(num) {
    if (num < 1n) {
        return ["Please enter a positive integer.", null];
    }
    if (num == 1n) {
        return ["The number 1 is neither a prime nor a composite number.", null];
    }
    var _a = calculatePrimeFactors(num), primeFactors = _a[0], error = _a[1];
    var errorMessage;
    if (error) {
        if (primeFactors.length == 1) {
            errorMessage = "Error: The prime factors could not be found.";
        }
        else {
            errorMessage = "Error: Not all prime factors could be found.";
        }
    }
    else {
        errorMessage = null;
    }
    var primeFactorsMap = toPrimeFactorsMap(primeFactors);
    return [Array.from(primeFactorsMap.entries()).map(function (_a) {
            var b = _a[0], x = _a[1];
            return x === 1 ? b.toString() : "".concat(b, "<sup>").concat(x, "</sup>");
        })
            .join(" &times; "), errorMessage];
}
function calculatePrimeFactors(num) {
    var primeFactors = [];
    var greatestPrime = primes[primes.length - 1];
    var error = false;
    for (var _i = 0, primes_1 = primes; _i < primes_1.length; _i++) {
        var prime = primes_1[_i];
        if (prime * prime > num)
            break;
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
function toPrimeFactorsMap(primeFactors) {
    var factorCount = primeFactors.reduce(function (countMap, factor) {
        var currentCount = countMap.get(factor) || 0;
        countMap.set(factor, currentCount + 1);
        return countMap;
    }, new Map());
    return factorCount;
}
function calculatePrimes(limit) {
    var primes = [2n];
    for (var i = 3n; i <= limit; i += 2n) {
        if (isPrime(i, primes)) {
            primes.push(i);
        }
    }
    return primes;
}
function isPrime(num, primes) {
    if (num < 2n)
        return false;
    for (var _i = 0, primes_2 = primes; _i < primes_2.length; _i++) {
        var prime = primes_2[_i];
        if (prime * prime > num)
            break;
        if (num % prime === 0n)
            return false;
    }
    return true;
}
// function isPrime(num: bigint): boolean {
//     if (num <= 1n) return false;
//     if (num <= 3n) return true;
//     if (num % 2n === 0n || num % 3n === 0n) return false;
//     for (let i = 5n; i * i <= num; i += 6n) {
//         if (num % i === 0n || num % (i + 2n) === 0n) return false;
//     }
//     return true;
// }
