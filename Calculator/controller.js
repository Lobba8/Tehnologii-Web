/**
 * CONTROLLER
 * Face legatura dintre Model si View.
 * Asculta evenimentele din View, decide ce metoda din Model se apeleaza,
 * apoi cere View-ului sa se actualizeze cu noua stare.
 */
const CalculatorController = (() => {

    /**
     * Handler principal apelat de View la orice interactiune
     * (click pe buton sau tasta apasata).
     *
     * @param {string} value - valoarea butonului (ex: '7', '+', '=', 'clear')
     * @param {string} type  - tipul butonului: 'digit' | 'operator' | 'equals' | 'clear'
     */
    function handleInput(value, type) {
        switch (type) {
            case 'digit':
                CalculatorModel.inputDigit(value);
                break;

            case 'operator':
                CalculatorModel.inputOperator(value);
                break;

            case 'equals':
                CalculatorModel.calculate();
                break;

            case 'clear':
                CalculatorModel.reset();
                break;

            default:
                console.warn('Tip necunoscut de input:', type, value);
                return;
        }

        // Dupa orice actiune, cere View-ului sa se actualizeze
        CalculatorView.render(CalculatorModel.getState());
    }

    /**
     * Initializeaza aplicatia:
     * - inregistreaza handler-ii in View
     * - face primul render cu starea initiala
     */
    function init() {
        CalculatorView.bindButtons(handleInput);
        CalculatorView.bindKeyboard(handleInput);
        CalculatorView.render(CalculatorModel.getState());
    }

    return { init };

})();

// Porneste aplicatia dupa incarcarea DOM-ului
document.addEventListener('DOMContentLoaded', CalculatorController.init);
