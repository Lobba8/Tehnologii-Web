/**
 * VIEW
 * Responsabil exclusiv cu afisarea si structura vizuala.
 * Nu contine logica de business — primeste date si le afiseaza.
 */
const CalculatorView = (() => {

    // Referinte catre elementele DOM
    const expressionEl  = document.getElementById('expression');
    const displayEl     = document.getElementById('display');
    const clearBtn      = document.getElementById('btn-clear');

    /**
     * Actualizeaza ecranul cu starea curenta din Model.
     * @param {object} state - starea returnata de CalculatorModel.getState()
     */
    function render(state) {
        // Afisaj principal
        displayEl.textContent = state.displayValue;

        // Expresia curenta (randul de deasupra)
        expressionEl.textContent = state.expression;

        // Ajusteaza dimensiunea fontului pentru numere lungi
        adjustFontSize(state.displayValue.length);

        // Schimba eticheta butonului: AC daca ecranul e '0', altfel C
        clearBtn.textContent = (state.displayValue === '0' && !state.expression) ? 'AC' : 'C';

        // Clasa de eroare pe display
        if (state.hasError) {
            displayEl.classList.add('error');
        } else {
            displayEl.classList.remove('error');
        }

        // Animatie la update
        displayEl.classList.remove('pop');
        void displayEl.offsetWidth; // reflow pentru restart animatie
        displayEl.classList.add('pop');
    }

    /**
     * Micsoreaza fontul cand numarul e lung pentru a nu depasi ecranul.
     */
    function adjustFontSize(length) {
        if (length > 14) {
            displayEl.style.fontSize = '1.4rem';
        } else if (length > 10) {
            displayEl.style.fontSize = '1.8rem';
        } else if (length > 7) {
            displayEl.style.fontSize = '2.2rem';
        } else {
            displayEl.style.fontSize = '';
        }
    }

    /**
     * Adauga efect vizual la apasarea unui buton.
     * @param {HTMLElement} btn
     */
    function animateButton(btn) {
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 120);
    }

    /**
     * Inregistreaza handler-ul pentru click pe butoane.
     * @param {Function} handler - functia din Controller
     */
    function bindButtons(handler) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => {
                animateButton(btn);
                handler(btn.dataset.value, btn.dataset.type);
            });
        });
    }

    /**
     * Inregistreaza handler pentru tastatura.
     * @param {Function} handler
     */
    function bindKeyboard(handler) {
        document.addEventListener('keydown', (e) => {
            const keyMap = {
                '0': ['0', 'digit'], '1': ['1', 'digit'], '2': ['2', 'digit'],
                '3': ['3', 'digit'], '4': ['4', 'digit'], '5': ['5', 'digit'],
                '6': ['6', 'digit'], '7': ['7', 'digit'], '8': ['8', 'digit'],
                '9': ['9', 'digit'], '.': ['.', 'digit'],
                '+': ['+', 'operator'], '-': ['-', 'operator'],
                '*': ['*', 'operator'], '/': ['/', 'operator'],
                'Enter': ['=', 'equals'], '=': ['=', 'equals'],
                'Escape': ['clear', 'clear'], 'Backspace': ['clear', 'clear'],
            };
            const mapped = keyMap[e.key];
            if (mapped) {
                e.preventDefault();
                // Evidentiaza butonul corespunzator
                const btn = document.querySelector(`[data-value="${mapped[0]}"]`);
                if (btn) animateButton(btn);
                handler(mapped[0], mapped[1]);
            }
        });
    }

    // API public
    return { render, bindButtons, bindKeyboard };

})();
