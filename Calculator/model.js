/**
 * MODEL
 * Gestioneaza starea calculatorului si logica de calcul.
 * Nu stie nimic despre UI — doar date si reguli.
 */
const CalculatorModel = (() => {

    // Starea interna
    let state = {
        operand1:     null,   // primul operand (numar)
        operand2:     null,   // al doilea operand (numar)
        operator:     null,   // operatorul curent: '+' | '-' | '*' | '/'
        displayValue: '0',    // valoarea afisata pe ecran
        expression:   '',     // expresia completa (ex: "12 + 3 =")
        waitingForOperand2: false,  // true dupa ce s-a apasata un operator
        hasError:     false,  // true daca exista o eroare (ex: impartire la 0)
    };

    // --- Metode publice ---

    /**
     * Apasa o cifra sau punctul zecimal.
     * @param {string} digit - '0'..'9' sau '.'
     */
    function inputDigit(digit) {
        if (state.hasError) return;

        // Dupa apasarea unui operator, incepe un nou operand
        if (state.waitingForOperand2) {
            state.displayValue = digit === '.' ? '0.' : digit;
            state.waitingForOperand2 = false;
            return;
        }

        // Evita zerouri multiple la inceput
        if (state.displayValue === '0' && digit !== '.') {
            state.displayValue = digit;
            return;
        }

        // Permite un singur punct zecimal
        if (digit === '.' && state.displayValue.includes('.')) return;

        state.displayValue += digit;
    }

    /**
     * Seteaza operatorul (+, -, *, /).
     * Daca exista deja un calcul in curs, il evalueaza mai intai (chaining).
     * @param {string} op - operatorul
     */
    function inputOperator(op) {
        if (state.hasError) return;

        const currentValue = parseFloat(state.displayValue);

        if (state.operator && !state.waitingForOperand2) {
            // Calcul in lant: evalueaza operatia anterioara
            const result = compute(state.operand1, currentValue, state.operator);
            if (result === null) {
                setError('Eroare: impartire la 0');
                return;
            }
            state.operand1 = result;
            state.displayValue = formatResult(result);
        } else {
            state.operand1 = currentValue;
        }

        state.operator = op;
        state.expression = `${formatResult(state.operand1)} ${op}`;
        state.waitingForOperand2 = true;
    }

    /**
     * Calculeaza rezultatul final (buton =).
     */
    function calculate() {
        if (state.hasError) return;
        if (state.operator === null || state.waitingForOperand2) return;

        state.operand2 = parseFloat(state.displayValue);
        const result = compute(state.operand1, state.operand2, state.operator);

        if (result === null) {
            setError('Eroare: impartire la 0');
            return;
        }

        state.expression = `${formatResult(state.operand1)} ${state.operator} ${formatResult(state.operand2)} =`;
        state.displayValue = formatResult(result);

        // Dupa calcul, resetam pentru un nou calcul pornind de la rezultat
        state.operand1 = result;
        state.operand2 = null;
        state.operator = null;
        state.waitingForOperand2 = false;
    }

    /**
     * Reseteaza calculatorul complet (AC).
     */
    function reset() {
        state.operand1 = null;
        state.operand2 = null;
        state.operator = null;
        state.displayValue = '0';
        state.expression = '';
        state.waitingForOperand2 = false;
        state.hasError = false;
    }

    /**
     * Returneaza o copie a starii curente (immutable pentru exterior).
     */
    function getState() {
        return { ...state };
    }

    // --- Metode private ---

    /**
     * Efectueaza calculul dintre doua numere.
     * Returneaza null daca operatia este invalida (ex: impartire la 0).
     */
    function compute(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b === 0) return null; // Validare: impartire la 0
                return a / b;
            default:  return null;
        }
    }

    /**
     * Formateaza un numar pentru afisare:
     * - limiteaza la 10 zecimale pentru a evita floating point noise
     * - elimina zerourile inutile de la sfarsit
     */
    function formatResult(value) {
        if (Number.isInteger(value)) return String(value);
        const fixed = parseFloat(value.toFixed(10));
        return String(fixed);
    }

    /**
     * Seteaza starea de eroare.
     */
    function setError(message) {
        state.hasError = true;
        state.displayValue = message;
        state.expression = '';
    }

    // API public
    return { inputDigit, inputOperator, calculate, reset, getState };

})();
