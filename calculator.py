class Calculator:
    def __init__(self):
        self.history = []

    def calculate(self, expression: str, original_expression: str = None):
        try:
            # Use original expression for display
            # in history, converted for calculation
            if original_expression:
                display_expression = original_expression
            else:
                display_expression = expression

            # Convert visual symbols to Python operators for calculation
            expression = expression.replace('×', '*')  # Multiply
            expression = expression.replace('÷', '/')  # Divide
            expression = expression.replace('−', '-')  # Minus
            expression = expression.replace('%', '/100')  # Percentage

            result = eval(expression)
            result = round(result, 10)

            self.history.append(f"{display_expression} = {result}")
            return result
        except Exception:
            return "Error"

    def clear_history(self):
        """Clear all history"""
        self.history = []
